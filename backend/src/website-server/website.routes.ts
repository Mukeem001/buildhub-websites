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
    slug
  );

  if (!fs.existsSync(websiteRoot)) {
    return res.status(404).json({
      success: false,
      message: "Website not found",
    });
  }

  const slugPrefix = `/${slug}`;
  let requestPath = req.path.startsWith(slugPrefix)
    ? req.path.slice(slugPrefix.length)
    : req.path;

  if (!requestPath.startsWith("/")) {
    requestPath = `/${requestPath}`;
  }

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

  const distRoot = fs.existsSync(path.join(websiteRoot, "dist"))
    ? path.join(websiteRoot, "dist")
    : websiteRoot;
  const filePath = path.join(distRoot, requestPath);
  const resolvedRoot = path.resolve(distRoot);
  const resolvedFile = path.resolve(filePath);

  if (resolvedFile !== resolvedRoot && !resolvedFile.startsWith(`${resolvedRoot}${path.sep}`)) {
    return res.status(400).json({
      success: false,
      message: "Invalid published asset path",
    });
  }

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  if (path.extname(requestPath)) {
    return res.status(404).json({
      success: false,
      message: "Published asset not found",
    });
  }

  return res.sendFile(path.join(distRoot, "index.html"));
});

export default router;