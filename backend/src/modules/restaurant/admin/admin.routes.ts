import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getAdminMenu } from "./admin.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/menu", requireWebsiteScope, getAdminMenu);

export default router;
