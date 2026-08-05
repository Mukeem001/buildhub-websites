import { Router } from "express";
import { requireWebsiteScope } from "../../shared/websiteScope";
import { ecommerceFullFlowDemo } from "./full.controller";

const router = Router();

router.get("/:websiteId/:websiteSlug", requireWebsiteScope, ecommerceFullFlowDemo);
router.get("/demo", ecommerceFullFlowDemo);

export default router;
