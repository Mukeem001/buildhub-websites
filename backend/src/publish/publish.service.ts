import fs from "fs-extra";
import path from "path";

import Website from "../models/Website";
import WebsiteSettings from "../models/WebsiteSettings";
import WebsiteTheme from "../models/WebsiteTheme";
import WebsitePage from "../models/WebsitePage";

import {
  templateExists,
  deletePublishedWebsite,
  copyTemplate,
  writeJson,
} from "./file.service";

import { installAndBuild } from "./vite-builder";

const buildModuleBindings = (website: any) => {
  const websiteId = website?._id?.toString() || "";
  const websiteSlug = website?.slug || "";
  const templateSlug = website?.templateSlug || "";

  return {
    websiteId,
    websiteSlug,
    templateSlug,
    moduleBasePath: templateSlug ? `/api/modules/${templateSlug}` : "",
    moduleRoutes: {
      adminBase: templateSlug ? `/api/modules/${templateSlug}/admin/${websiteId}/${websiteSlug}` : "",
      userBase: templateSlug ? `/api/modules/${templateSlug}/user/${websiteId}/${websiteSlug}` : "",
      authAdminLogin: templateSlug ? `/api/modules/${templateSlug}/auth/admin/${websiteId}/${websiteSlug}/login` : "",
      authUserLogin: templateSlug ? `/api/modules/${templateSlug}/auth/user/${websiteId}/${websiteSlug}/login` : "",
    },
    siteUrl: `/sites/${websiteSlug}`,
  };
};

const writeRuntimeConfig = async (projectPath: string, website: any) => {
  const distDir = path.join(projectPath, "dist");
  const configPath = path.join(distDir, "website-config.js");
  const indexPath = path.join(distDir, "index.html");

  const bindings = buildModuleBindings(website);

  await fs.ensureDir(distDir);
  await fs.writeFile(
    configPath,
    `window.__BUILDHUB_SITE__ = ${JSON.stringify(bindings, null, 2)};\nwindow.__BUILDHUB_MODULE_ROUTES__ = window.__BUILDHUB_SITE__.moduleRoutes;\n`,
    "utf8"
  );

  if (await fs.pathExists(indexPath)) {
    let indexHtml = await fs.readFile(indexPath, "utf8");

    if (!indexHtml.includes("website-config.js")) {
      indexHtml = indexHtml.replace(
        "</body>",
        `  <script src="${bindings.siteUrl}/website-config.js"></script>\n</body>`
      );
      await fs.writeFile(indexPath, indexHtml, "utf8");
    }
  }
};

const cleanupPublishedBuild = async (projectPath: string) => {
  const pathsToRemove = [
    "dist",
    "src",
    "public",
    "node_modules",
    "package.json",
    "package-lock.json",
    "vite.config.ts",
    "vite.config.js",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "README.md",
  ];

  for (const relativePath of pathsToRemove) {
    const absolutePath = path.join(projectPath, relativePath);

    if (await fs.pathExists(absolutePath)) {
      await fs.remove(absolutePath);
    }
  }
};

export const publishWebsite = async (
  websiteId: string
) => {
  /* =========================
     Load Website
  ========================= */

  const website = await Website.findById(websiteId);

  if (!website) {
    throw new Error("Website not found");
  }

  /* =========================
     Check Template
  ========================= */

  const exists = await templateExists(
    website.templateSlug
  );

  if (!exists) {
    throw new Error("Template not found");
  }

  /* =========================
     Load Website Data
  ========================= */

  const settings = await WebsiteSettings.findOne({
    websiteId: website._id,
  });

  const theme = await WebsiteTheme.findOne({
    websiteId: website._id,
  });

  const pages = await WebsitePage.find({
    websiteId: website._id,
  }).sort({
    sortOrder: 1,
  });

  /* =========================
     Clean Previous Publish
  ========================= */

  await deletePublishedWebsite(
    website.slug
  );

  /* =========================
     Copy Template
  ========================= */

  const projectPath =
    await copyTemplate(
      website.templateSlug,
      website.slug
    );

  /* =========================
     Generate Website Data
  ========================= */

  const moduleBindings = buildModuleBindings(website);

  const websiteData = {
    website,
    settings,
    theme,
    pages,
    moduleBindings,
  };

  await writeJson(
    website.slug,
    "website-data.json",
    websiteData
  );

  /* =========================
     Build Project
  ========================= */

  await installAndBuild(
    projectPath,
    website.slug
  );

  await writeRuntimeConfig(projectPath, website);

  const distDir = path.join(projectPath, "dist");
  const builtIndex = path.join(distDir, "index.html");

  if (!(await fs.pathExists(builtIndex))) {
    throw new Error(
      "Publish failed: built site output not found."
    );
  }

  await fs.copy(distDir, projectPath, {
    overwrite: true,
  });

  await cleanupPublishedBuild(projectPath);

  const publishedIndex = path.join(projectPath, "index.html");

  if (!(await fs.pathExists(publishedIndex))) {
    throw new Error(
      "Publish failed: built site output not found."
    );
  }

  /* =========================
     Update Database
  ========================= */

  website.isPublished = true;

  website.status = "published";

  await website.save();

  return {
    success: true,
    website,
  };
};