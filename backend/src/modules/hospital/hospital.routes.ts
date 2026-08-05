import { Router } from "express";
import userRoutes from "./user/user.routes";
import adminRoutes from "./admin/admin.routes";
import { createModuleAuthRouter } from "../shared/auth/moduleAuth";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital module health",
    module: "hospital",
    user: [
      "/api/modules/hospital/user/:websiteId/:websiteSlug/doctors",
    ],
    admin: [
      "/api/modules/hospital/admin/:websiteId/:websiteSlug/doctors",
    ],
  });
});

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", createModuleAuthRouter({ moduleName: "hospital", templateSlug: "hospital" }));

export default router;
