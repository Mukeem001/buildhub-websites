import { Router } from "express";

import {
  createWebsite,
  getUserWebsites,
  getWebsite,
  deleteWebsite,
  updateWebsite,
  getWebsiteDashboard,
  updateWebsiteSettings,
} from "../platform/website/website.controller";

const router = Router();

/*
=========================================
Website Routes
=========================================
*/

router.post("/create", createWebsite);

router.get("/user/:userId", getUserWebsites);

router.get("/:id", getWebsite);

router.delete("/:id", deleteWebsite);

router.put("/:id", updateWebsite);
router.get("/:id/dashboard", getWebsiteDashboard);
router.put("/:id/settings", updateWebsiteSettings);

export default router;