import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getAdminDoctors } from "./admin.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/doctors", requireWebsiteScope, getAdminDoctors);

export default router;
