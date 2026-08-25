import fs from "fs-extra";
import path from "path";

import {
  TEMPLATES_DIR,
  PROJECTS_DIR,
  PUBLISHED_DIR,
} from "../config/paths";

const resolveTemplateSlug = (templateSlug: string) => {
  const normalized = (templateSlug || "").toLowerCase();

  const aliases: Record<string, string> = {
    "modern-ecommerce": "ecommerce",
  };

  return aliases[normalized] || normalized;
};

/* ==========================
   Template Path
========================== */

export const getTemplatePath = (
  templateSlug: string
) => {
  const resolvedSlug = resolveTemplateSlug(templateSlug);

  return path.join(
    TEMPLATES_DIR,
    resolvedSlug
  );
};

/* ==========================
   Published Path
========================== */

export const getPublishedPath = (
  websiteSlug: string
) => {
  return path.join(
    PUBLISHED_DIR,
    websiteSlug
  );
};

export const getProjectPath = (
  userId: string,
  websiteId: string
) => path.join(PROJECTS_DIR, userId, websiteId);

/* ==========================
   Check Template Exists
========================== */

export const templateExists = async (
  templateSlug: string
) => {
  return fs.pathExists(
    getTemplatePath(templateSlug)
  );
};

/* ==========================
   Delete Published Website
========================== */

export const deletePublishedWebsite =
  async (websiteSlug: string) => {
    const publishPath =
      getPublishedPath(websiteSlug);

    if (await fs.pathExists(publishPath)) {
      await fs.remove(publishPath);
    }
  };

/* ==========================
   Copy Template
========================== */

export const copyTemplate = async (
  templateSlug: string,
  websiteSlug: string
) => {
  const source =
    getTemplatePath(templateSlug);

  const destination =
    getPublishedPath(websiteSlug);

  await fs.copy(source, destination);

  return destination;
};

export const copyTemplateToProject = async (
  templateSlug: string,
  userId: string,
  websiteId: string
) => {
  const source = getTemplatePath(templateSlug);
  const destination = getProjectPath(userId, websiteId);

  await fs.ensureDir(path.dirname(destination));
  await fs.copy(source, destination, {
    overwrite: false,
    errorOnExist: false,
    filter: (entry) => {
      const relative = path.relative(source, entry);
      return !relative.split(path.sep).some((part) => ["node_modules", "dist", ".git"].includes(part));
    },
  });

  return destination;
};

/* ==========================
   Write JSON File
========================== */

export const writeJson = async (
  websiteSlug: string,
  fileName: string,
  data: any
) => {
  const filePath = path.join(
    getPublishedPath(websiteSlug),
    fileName
  );

  await fs.writeJson(filePath, data, {
    spaces: 2,
  });

  return filePath;
};

/* ==========================
   Read JSON File
========================== */

export const readJson = async (
  websiteSlug: string,
  fileName: string
) => {
  const filePath = path.join(
    getPublishedPath(websiteSlug),
    fileName
  );

  return fs.readJson(filePath);
};

/* ==========================
   Ensure Directory
========================== */

export const ensureDirectory =
  async (websiteSlug: string) => {
    await fs.ensureDir(
      getPublishedPath(websiteSlug)
    );
  };