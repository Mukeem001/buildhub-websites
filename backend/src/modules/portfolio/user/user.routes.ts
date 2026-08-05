import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getProjects } from "./user.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/projects", requireWebsiteScope, getProjects);

export default router;
