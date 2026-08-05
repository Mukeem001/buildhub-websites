import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getMenu } from "./user.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/menu", requireWebsiteScope, getMenu);

export default router;
