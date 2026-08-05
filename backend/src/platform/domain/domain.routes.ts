import { Router } from "express";
import { connectDomain, verifyDomain } from "./domain.controller";

const router = Router();

router.post("/connect", connectDomain);
router.post("/verify/:websiteId", verifyDomain);

export default router;
