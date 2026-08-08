import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import env from "./config/env";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import templateRoutes from "./routes/template.routes";
import websiteRoutes from "./platform/website/website.routes";
import publishRoutes from "./platform/publish/publish.routes";
import pageRoutes from "./routes/page.routes";
import websiteServerRoutes from "./website-server/website.routes";
import superAdminRoutes from "./super-admin/super-admin.routes";
import domainRoutes from "./platform/domain/domain.routes";
import Domain from "./domain/domain.model";
import Website from "./models/Website";
import ecommerceRoutes from "./modules/ecommerce/ecommerce.routes";
import restaurantRoutes from "./modules/restaurant/restaurant.routes";
import hospitalRoutes from "./modules/hospital/hospital.routes";
import portfolioRoutes from "./modules/portfolio/portfolio.routes";


const app = express();

app.set("trust proxy", 1);

/* ===========================
   Security
=========================== */

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server or same-origin)
      if (!origin) {
        callback(null, true);
        return;
      }

      // Allow configured origins
      if (env.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // In development allow localhost or local network origins
      const localOriginRegex = /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/;

      if (env.nodeEnv === "development" && localOriginRegex.test(origin)) {
        callback(null, true);
        return;
      }

      let originHost: string;
      try {
        originHost = new URL(origin).host
          .toLowerCase()
          .replace(/\.$/, "");
      } catch (error) {
        callback(new Error("CORS origin denied"));
        return;
      }

      const hostnamesToTry = [originHost];
      if (originHost.startsWith("www.")) {
        hostnamesToTry.push(originHost.replace(/^www\./, ""));
      } else {
        hostnamesToTry.push(`www.${originHost}`);
      }

      Domain.findOne({
        $or: [
          ...hostnamesToTry.map((host) => ({ hostname: host })),
          { domain: originHost },
        ],
      })
        .then((domain) => {
          if (domain) {
            callback(null, true);
          } else {
            callback(new Error("CORS origin denied"));
          }
        })
        .catch((error) => {
          console.error("CORS origin lookup failed:", error);
          callback(new Error("CORS origin denied"));
        });
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

/* ===========================
   Middlewares
=========================== */

app.use(compression());

app.use(cookieParser());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.use((req, res, next) => {
  const startedAt = Date.now();
  console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);

  if (req.body && typeof req.body === "object" && Object.keys(req.body).length > 0) {
    const bodyPreview = JSON.stringify(req.body).slice(0, 800);
    console.log(`[BODY] ${bodyPreview}`);
  }

  const originalEnd = res.end.bind(res);
  res.end = ((chunk?: any, encoding?: any, cb?: any) => {
    const duration = Date.now() - startedAt;
    console.log(`[RESPONSE] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    return originalEnd(chunk, encoding, cb);
  }) as typeof res.end;

  next();
});

app.use(
  "/api/super-admin",
  superAdminRoutes
);

app.get("/api/super-admin/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Super Admin health OK",
    endpoints: {
      login: "/api/super-admin/login",
      dashboard: "/api/super-admin/dashboard",
      profile: "/api/super-admin/profile",
      websites: "/api/super-admin/websites",
    },
  });
});

/* ===========================
   Rate Limit
=========================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/* ===========================
   API Routes
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api/publish", publishRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/modules/ecommerce", ecommerceRoutes);
app.use("/api/modules/restaurant", restaurantRoutes);
app.use("/api/modules/hospital", hospitalRoutes);
app.use("/api/modules/portfolio", portfolioRoutes);

/* ===========================
   Custom domain routing
========================== */

const normalizeHostname = (host?: string) => {
  const rawHost = Array.isArray(host) ? host[0] : host;
  return rawHost
    ? rawHost.split(":")[0].toLowerCase().replace(/\.$/, "")
    : undefined;
};

app.use(async (req, res, next) => {
  const path = req.path;

  if (
    path.startsWith("/api") ||
    path.startsWith("/sites") ||
    path.startsWith("/favicon")
  ) {
    return next();
  }

  const hostname = normalizeHostname(req.headers.host) ||
    normalizeHostname(req.hostname);

  if (!hostname) {
    return next();
  }

  const hostnamesToTry = [hostname];

  if (hostname.startsWith("www.")) {
    hostnamesToTry.push(hostname.replace(/^www\./, ""));
  } else {
    hostnamesToTry.push(`www.${hostname}`);
  }

  const domainRecord = await Domain.findOne({
    $or: [
      ...hostnamesToTry.map((host) => ({ hostname: host })),
      { domain: hostname },
    ],
  });

  let website = null;

  if (domainRecord) {
    website = await Website.findById(domainRecord.websiteId);
  }

  if (!website) {
    website = await Website.findOne({
      customDomain: hostname,
      isPublished: true,
    });
  }

  if (!website || !website.isPublished) {
    return next();
  }

  const originalUrl = req.originalUrl || req.url;
  req.url = `/sites/${website.slug}${originalUrl}`;
  next();
});

app.use("/sites", websiteServerRoutes);

app.get("/api/modules/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Module health overview",
    superAdmin: {
      health: "/api/super-admin/health",
      login: "/api/super-admin/login",
      dashboard: "/api/super-admin/dashboard",
      profile: "/api/super-admin/profile",
      websites: "/api/super-admin/websites",
    },
    modules: [
      {
        name: "ecommerce",
        health: "/api/modules/ecommerce/health",
        user: "/api/modules/ecommerce/user/:websiteId/:websiteSlug/products",
        admin: "/api/modules/ecommerce/admin/:websiteId/:websiteSlug/products",
      },
      {
        name: "restaurant",
        health: "/api/modules/restaurant/health",
        user: "/api/modules/restaurant/user/:websiteId/:websiteSlug/menu",
        admin: "/api/modules/restaurant/admin/:websiteId/:websiteSlug/menu",
      },
      {
        name: "hospital",
        health: "/api/modules/hospital/health",
        user: "/api/modules/hospital/user/:websiteId/:websiteSlug/doctors",
        admin: "/api/modules/hospital/admin/:websiteId/:websiteSlug/doctors",
      },
      {
        name: "portfolio",
        health: "/api/modules/portfolio/health",
        user: "/api/modules/portfolio/user/:websiteId/:websiteSlug/projects",
        admin: "/api/modules/portfolio/admin/:websiteId/:websiteSlug/projects",
      },
    ],
  });
});

/* ===========================
   Health Check
=========================== */

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "BuildHub Backend Running 🚀",
    version: "1.0.0",
  });
});

/* ===========================
   404
=========================== */

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===========================
   Global Error Handler
=========================== */

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(err.status || 500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
      stack:
        env.nodeEnv === "development"
          ? err.stack
          : undefined,
    });
  }
);

export default app;