import { Router } from "express";
import { publishWebsite } from "./publish.controller";

const router = Router();

router.post("/:websiteId", publishWebsite);

export default router;
