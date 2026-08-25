import { Router } from "express";
import * as websiteController from "./website.controller";

const router = Router();

router.post("/create", websiteController.createWebsite);
router.get("/user/:userId", websiteController.getUserWebsites);
router.get("/:id/editor", websiteController.getWebsiteEditor);
router.put("/:id/editor/draft", websiteController.saveWebsiteDraft);
router.get("/:id", websiteController.getWebsite);
router.put("/:id", websiteController.updateWebsite);
router.delete("/:id", websiteController.deleteWebsite);
router.get("/dashboard/:id", websiteController.getWebsiteDashboard);
router.put("/settings/:id", websiteController.updateWebsiteSettings);

export default router;
