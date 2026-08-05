import { Router } from "express";
import { publishWebsite } from "../platform/publish/publish.controller";

const router = Router();

router.post("/:websiteId", publishWebsite);

export default router;