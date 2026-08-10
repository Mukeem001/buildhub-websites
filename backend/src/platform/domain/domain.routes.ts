import { Router } from "express";
import {
  connectDomain,
  listDomains,
  getDomain,
  verifyDomain,
  issueSsl,
  removeDomain,
} from "./domain.controller";

const router = Router();

router.get("/", listDomains);
router.post("/connect", connectDomain);
router.post("/verify/:websiteId", verifyDomain);
router.post("/ssl/:websiteId", issueSsl);
router.get("/:websiteId", getDomain);
router.delete("/:websiteId", removeDomain);

export default router;
