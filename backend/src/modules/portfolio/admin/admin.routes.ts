import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getAdminProjects } from "./admin.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/projects", requireWebsiteScope, getAdminProjects);

export default router;
