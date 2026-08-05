import { Router } from "express";
import userRoutes from "./user/user.routes";
import adminRoutes from "./admin/admin.routes";
import { createModuleAuthRouter } from "../shared/auth/moduleAuth";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio module health",
    module: "portfolio",
    user: [
      "/api/modules/portfolio/user/:websiteId/:websiteSlug/projects",
    ],
    admin: [
      "/api/modules/portfolio/admin/:websiteId/:websiteSlug/projects",
    ],
  });
});

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", createModuleAuthRouter({ moduleName: "portfolio", templateSlug: "portfolio" }));

export default router;
