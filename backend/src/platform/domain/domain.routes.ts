import { Router } from "express";
import { connectDomain, getDomain, verifyDomain, removeDomain } from "./domain.controller";

const router = Router();

router.post("/connect", connectDomain);
router.get("/:websiteId", getDomain);
router.post("/verify/:websiteId", verifyDomain);
router.delete("/:websiteId", removeDomain);

export default router;
