import { Router } from "express";

import {
  addSection,
  updateSection,
  deleteSection,
  reorderSections,
  getPage,
} from "../platform/pages/page.controller";

const router = Router();

/* =========================
   SECTION ROUTES
========================= */

// Add section to page
router.post("/:pageId/section", addSection);

// Update section
router.put("/:pageId/section/:sectionId", updateSection);

// Delete section
router.delete("/:pageId/section/:sectionId", deleteSection);

// Reorder sections
router.put("/:pageId/reorder", reorderSections);

router.get("/:pageId", getPage);

export default router;