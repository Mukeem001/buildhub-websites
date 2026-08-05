import { Router } from "express";
import { requireWebsiteScope } from "../../websiteScope";
import { ecommerceAdminLogin, ecommerceAdminDemoAuth } from "./admin.controller";

const router = Router();

router.post("/:websiteId/:websiteSlug/login", requireWebsiteScope, ecommerceAdminLogin);
router.get("/demo", ecommerceAdminDemoAuth);

export default router;
