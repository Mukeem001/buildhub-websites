import { Router } from "express";
import {
  getSystemTemplates,
  getSystemTemplateById,
  getTemplateFile,
} from "../controllers/system-templates.controller";

const router = Router();

router.get("/", getSystemTemplates);
router.get("/:id", getSystemTemplateById);
router.get("/:id/file/:filePath", getTemplateFile);

export default router;
