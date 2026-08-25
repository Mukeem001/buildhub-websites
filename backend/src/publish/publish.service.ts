import fs from "fs-extra";
import path from "path";

import Website from "../models/Website";
import WebsiteSettings from "../models/WebsiteSettings";
import WebsiteTheme from "../models/WebsiteTheme";
import WebsitePage from "../models/WebsitePage";

import {
  templateExists,
  deletePublishedWebsite,
  copyTemplateToProject,
  writeJson,
} from "./file.service";
import { PUBLISHED_DIR } from "../config/paths";

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

    const absoluteScript = `  <script src="${bindings.siteUrl}/website-config.js"></script>`;
    const websiteConfigRegex = /<script\s+src=["'](?:\.\/)?website-config\.js["']><\/script>/i;

    if (websiteConfigRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(
        websiteConfigRegex,
        absoluteScript
      );
    } else if (!indexHtml.includes("website-config.js")) {
      indexHtml = indexHtml.replace(
        "</body>",
        `${absoluteScript}\n</body>`
      );
    }

    await fs.writeFile(indexPath, indexHtml, "utf8");
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

  let sourceProjectPath = website.sourceProjectPath;

  if (!sourceProjectPath || sourceProjectPath === "pending") {
    const templateAvailable = await templateExists(website.templateSlug);

    if (!templateAvailable) {
      throw new Error("Template not found");
    }

    sourceProjectPath = await copyTemplateToProject(
      website.templateSlug,
      String(website.userId),
      String(website._id)
    );
    website.sourceProjectPath = sourceProjectPath;
    await website.save();
  }

  if (!(await fs.pathExists(sourceProjectPath))) {
    throw new Error("Website source project not found");
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

  const projectPath = path.join(PUBLISHED_DIR, website.slug);

  await fs.ensureDir(path.dirname(projectPath));
  await fs.copy(sourceProjectPath, projectPath, { overwrite: true });

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

  const publishedIndex = path.join(distDir, "index.html");

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