import path from "path";

export const ROOT_DIR = path.resolve(__dirname, "../../..");

export const TEMPLATES_DIR = path.join(
  ROOT_DIR,
  "templates"
); // root-level templates folder under websites-builder

const configuredPublishRoot = process.env.PUBLISH_ROOT?.trim();

export const PUBLISHED_DIR = configuredPublishRoot
  ? path.isAbsolute(configuredPublishRoot)
    ? path.resolve(configuredPublishRoot)
    : path.resolve(ROOT_DIR, configuredPublishRoot)
  : path.join(ROOT_DIR, "published");

export const UPLOADS_DIR = path.join(
  ROOT_DIR,
  "uploads"
);