import dotenv from "dotenv";
import * as path from "path";

const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });
dotenv.config();

const requiredEnv = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "FRONTEND_URL",
  "BACKEND_URL",
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(
      `Missing environment variable: ${key}`
    );
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV!,

  port: Number(process.env.PORT),

  frontendUrl:
    process.env.FRONTEND_URL!,

  backendUrl:
    process.env.BACKEND_URL!,

  mongoUri:
    process.env.MONGODB_URI!,

  allowedOrigins:
    (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL!)
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),

  jwtSecret:
    process.env.JWT_SECRET!,

  jwtExpiresIn:
    process.env.JWT_EXPIRES_IN!,

  mail: {
    host: process.env.MAIL_HOST,

    port: Number(
      process.env.MAIL_PORT
    ),

    secure:
      process.env.MAIL_SECURE ===
      "true",

    user: process.env.MAIL_USER,

    pass: process.env.MAIL_PASS,

    from: process.env.MAIL_FROM,
  },

  cloudflare: {
    token:
      process.env
        .CLOUDFLARE_API_TOKEN,

    zoneId:
      process.env
        .CLOUDFLARE_ZONE_ID,
  },

  upload: {
    maxFileSize: Number(
      process.env.MAX_FILE_SIZE
    ),
  },

  publish: {
    defaultSubdomain:
      process.env.DEFAULT_SUBDOMAIN,

    root:
      process.env.PUBLISH_ROOT,
  },

  customDomainTarget:
    process.env.CUSTOM_DOMAIN_TARGET ||
    (() => {
      const raw =
        process.env.BACKEND_URL ||
        "http://localhost:5000";
      try {
        return new URL(raw).host;
      } catch {
        return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
      }
    })(),

  certbotEnabled:
    process.env.CERTBOT_ENABLED === "true",

  certbotEmail:
    process.env.CERTBOT_EMAIL || "",

  certbotWebrootPath:
    process.env.CERTBOT_WEBROOT_PATH ||
    "/var/www/buildhub-websites/certbot",

  certbotCommand:
    process.env.CERTBOT_COMMAND || "certbot",

  certbotUseStaging:
    process.env.CERTBOT_USE_STAGING === "true",

  certbotUseNginx:
    process.env.CERTBOT_USE_NGINX !== "false",

  certbotFallbackToWebroot:
    process.env.CERTBOT_FALLBACK_TO_WEBROOT !== "false",

  nginxReloadCommand:
    process.env.NGINX_RELOAD_COMMAND ||
    "sudo systemctl reload nginx",

  admin: {
    email:
      process.env.ADMIN_EMAIL,
  },
};

export default env;