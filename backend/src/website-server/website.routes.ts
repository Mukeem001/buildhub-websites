import { Router } from "express";
import path from "path";
import fs from "fs";

import Website from "../models/Website";
import { PUBLISHED_DIR } from "../config/paths";

const router = Router();

const shouldCountPageView = (requestPath: string) => {
  const extension = path.extname(requestPath).toLowerCase();
  return extension === "" || extension === ".html";
};

/* ==========================
   Website Runtime
========================== */

router.use("/:slug", (req, res) => {
  const { slug } = req.params;

  const websiteRoot = path.join(
    PUBLISHED_DIR,
    slug,
    "dist"
  );

  if (!fs.existsSync(websiteRoot)) {
    return res.status(404).json({
      success: false,
      message: "Website not found",
    });
  }

  let requestPath = req.path.replace(
    `/${slug}`,
    ""
  );

  if (
    requestPath === "" ||
    requestPath === "/"
  ) {
    requestPath = "/index.html";
  }

  if (shouldCountPageView(requestPath)) {
    Website.findOneAndUpdate(
      { slug },
      { $inc: { visitors: 1 } },
      { new: false }
    )
      .exec()
      .catch((error) => {
        console.error(
          "Failed to increment website visitors for",
          slug,
          error
        );
      });
  }

  const filePath = path.join(
    websiteRoot,
    requestPath
  );

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  return res.sendFile(
    path.join(websiteRoot, "index.html")
  );
});

export default router;