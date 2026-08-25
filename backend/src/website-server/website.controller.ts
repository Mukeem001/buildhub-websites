import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import { PUBLISHED_DIR } from "../config/paths";

interface WebsiteParams {
  slug: string;
}

/* ==========================
   Render Published Website
========================== */

export const renderWebsite = (
  req: Request<WebsiteParams>,
  res: Response
) => {
  try {
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

    const distRoot = fs.existsSync(path.join(websiteRoot, "dist"))
      ? path.join(websiteRoot, "dist")
      : websiteRoot;
    const filePath = path.join(distRoot, requestPath);

    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }

    return res.sendFile(path.join(distRoot, "index.html"));
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};