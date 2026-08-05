import { Router } from "express";
import userRoutes from "./user/user.routes";
import adminRoutes from "./admin/admin.routes";
import { createModuleAuthRouter } from "../shared/auth/moduleAuth";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant module health",
    module: "restaurant",
    user: [
      "/api/modules/restaurant/user/:websiteId/:websiteSlug/menu",
    ],
    admin: [
      "/api/modules/restaurant/admin/:websiteId/:websiteSlug/menu",
    ],
  });
});

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", createModuleAuthRouter({ moduleName: "restaurant", templateSlug: "restaurant" }));

export default router;
