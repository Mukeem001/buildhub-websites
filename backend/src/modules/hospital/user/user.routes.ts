import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { getDoctors } from "./user.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug/doctors", requireWebsiteScope, getDoctors);

export default router;
