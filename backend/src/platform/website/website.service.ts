import { Types } from "mongoose";
import fs from "fs-extra";
import path from "path";

import Website from "../../models/Website";
import WebsiteSettings from "../../models/WebsiteSettings";
import WebsiteTheme from "../../models/WebsiteTheme";
import WebsitePage from "../../models/WebsitePage";

import { getTemplateById } from "../../templates";
import { copyTemplateToProject } from "../../publish/file.service";
import { publishWebsite as publishWebsiteService } from "../../publish/publish.service";

interface CreateWebsiteData {
  userId: string;
  templateSlug: string;
  name: string;
  subdomain?: string;
  customDomain?: string;
}

const resolveTemplateSlug = (templateSlug: string) => {
  const normalized = templateSlug?.toLowerCase().trim() || "";

  const aliases: Record<string, string> = {
    "1": "ecommerce",
    "2": "restaurant",
    "3": "portfolio",
    "4": "hospital",
    "5": "school",
    "6": "gym",
    "7": "agency",
    "8": "blog",
    "modern-ecommerce": "ecommerce",
    "restaurant-pro": "restaurant",
    "business": "agency",
    "portfolio-x": "portfolio",
  };

  return aliases[normalized] || normalized;
};

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const buildModuleBindings = (website: any) => {
  const normalized = website?.toObject ? website.toObject() : website || {};
  const templateSlug = normalized.templateSlug || "";
  const websiteId = normalized._id?.toString() || "";
  const websiteSlug = normalized.slug || "";

  const moduleBindings = {
    moduleBasePath: templateSlug ? `/api/modules/${templateSlug}` : "",
    moduleRoutes: {
      adminBase: templateSlug ? `/api/modules/${templateSlug}/admin/${websiteId}/${websiteSlug}` : "",
      userBase: templateSlug ? `/api/modules/${templateSlug}/user/${websiteId}/${websiteSlug}` : "",
      authAdminLogin: templateSlug ? `/api/modules/${templateSlug}/auth/admin/${websiteId}/${websiteSlug}/login` : "",
      authUserLogin: templateSlug ? `/api/modules/${templateSlug}/auth/user/${websiteId}/${websiteSlug}/login` : "",
    },
  };

  const registry = (global as any).__websiteModuleBindings || {};
  registry[websiteId] = {
    websiteId,
    websiteSlug,
    templateSlug,
    ...moduleBindings,
  };
  (global as any).__websiteModuleBindings = registry;

  return {
    ...normalized,
    ...moduleBindings,
  };
};

export const createWebsite = async ({
  userId,
  templateSlug,
  name,
  subdomain,
  customDomain,
}: CreateWebsiteData) => {
  const resolvedTemplateSlug = resolveTemplateSlug(templateSlug);
  const template = getTemplateById(resolvedTemplateSlug);

  console.log(`[CREATE-SERVICE] resolved template`, {
    input: templateSlug,
    resolved: resolvedTemplateSlug,
    found: Boolean(template),
  });

  if (!template) {
    throw new Error("Template not found");
  }

  const slug = `${createSlug(name)}-${Date.now()}`;

  const website = await Website.create({
    userId: new Types.ObjectId(userId),
    templateSlug: resolvedTemplateSlug,
    name,
    slug,
    status: "draft",
    isPublished: false,
    visitors: 0,
    storage: "0 GB",
    subdomain: subdomain || "",
    customDomain: customDomain || "",
    templateVersion: template.version,
    sourceProjectPath: "pending",
    draftVersion: "draft-1",
    publishedVersion: "",
    draftStatus: "clean",
  });

  const websiteId = website._id as Types.ObjectId;

  await WebsiteSettings.create({
    websiteId,
  });

  await WebsiteTheme.create({
    websiteId,
  });

  let sortOrder = 1;

  for (const page of template.pages) {
    await WebsitePage.create({
      websiteId,

      title: page.title,

      slug: page.slug,

      type: "system",

      isHomePage: page.isHomePage,

      sortOrder,

      sections: page.sections,
    });

    sortOrder++;
  }

  website.sourceProjectPath = await copyTemplateToProject(
    resolvedTemplateSlug,
    userId,
    String(websiteId)
  );
  await website.save();

  const moduleBindings = buildModuleBindings(website);

  try {
    const publishResult = await publishWebsiteService(String(website._id));
    return {
      ...moduleBindings,
      published: publishResult?.success === true,
      publishSlug: publishResult?.website?.slug,
    };
  } catch (error: any) {
    return {
      ...moduleBindings,
      published: false,
      publishError: error.message,
    };
  }
};

export const getUserWebsites = async (userId: string) => {
  const websites = await Website.find({
    userId: new Types.ObjectId(userId),
  }).sort({
    createdAt: -1,
  });

  return websites.map((website: any) => buildModuleBindings(website));
};

export const getWebsiteById = async (websiteId: string) => {
  const website = await Website.findById(new Types.ObjectId(websiteId));
  return website ? buildModuleBindings(website) : null;
};

export const deleteWebsite = async (websiteId: string) => {
  const objectId = new Types.ObjectId(websiteId);

  await Website.findByIdAndDelete(objectId);

  await WebsiteSettings.deleteOne({
    websiteId: objectId,
  });

  await WebsiteTheme.deleteOne({
    websiteId: objectId,
  });

  await WebsitePage.deleteMany({
    websiteId: objectId,
  });

  return true;
};

export const updateWebsite = async (
  websiteId: string,
  data: {
    name?: string;
    status?: "draft" | "published" | "archived";
  }
) => {
  return Website.findByIdAndUpdate(new Types.ObjectId(websiteId), data, {
    new: true,
    runValidators: true,
  });
};

export const getWebsiteDashboard = async (websiteId: string) => {
  const objectId = new Types.ObjectId(websiteId);

  const website = await Website.findById(objectId);

  if (!website) {
    return null;
  }

  const settings = await WebsiteSettings.findOne({
    websiteId: objectId,
  });

  const theme = await WebsiteTheme.findOne({
    websiteId: objectId,
  });

  const pages = await WebsitePage.find({
    websiteId: objectId,
  }).sort({
    sortOrder: 1,
  });

  return {
    website: buildModuleBindings(website),
    settings,
    theme,
    pages,
  };
};

export const getWebsiteEditor = async (websiteId: string) => {
  const objectId = new Types.ObjectId(websiteId);
  const website = await Website.findById(objectId);

  if (!website) return null;

  const pages = await WebsitePage.find({ websiteId: objectId }).sort({ sortOrder: 1 });
  const sourceRoot = website.sourceProjectPath;

  const sourceFiles: string[] = [];
  const scan = async (directory: string, relative = "") => {
    if (!(await fs.pathExists(directory))) return;
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryRelative = path.join(relative, entry.name);
      const absolute = path.join(directory, entry.name);

      if (entry.isDirectory() && !["node_modules", "dist", ".git"].includes(entry.name)) {
        await scan(absolute, entryRelative);
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        sourceFiles.push(entryRelative.replace(/\\/g, "/"));
      }
    }
  };

  await scan(path.join(sourceRoot, "src"));

  return {
    website: buildModuleBindings(website),
    editor: {
      draftVersion: website.draftVersion,
      publishedVersion: website.publishedVersion,
      draftStatus: website.draftStatus,
      lastBuildError: website.lastBuildError || "",
      previewUrl: `/sites/${website.slug}`,
    },
    pages: pages.map((page: any) => ({
      id: String(page._id),
      title: page.title,
      slug: page.slug,
      type: page.type,
      sourceFile: sourceFiles.find((file) => {
        const fileName = path.basename(file).replace(/\.(tsx?|jsx?)$/, "").toLowerCase();
        return fileName === page.title.toLowerCase() || fileName === page.slug.toLowerCase();
      }) || null,
      sections: page.sections || [],
      seo: page.seo,
      isHomePage: page.isHomePage,
      sortOrder: page.sortOrder,
    })),
    sourceFiles,
  };
};

export const saveWebsiteDraft = async (
  websiteId: string,
  payload: {
    pages?: Array<{
      id: string;
      title?: string;
      slug?: string;
      sections?: unknown[];
      seo?: { title?: string; description?: string; keywords?: string[] };
      sortOrder?: number;
    }>;
  }
) => {
  const website = await Website.findById(websiteId);
  if (!website) return null;

  for (const pagePayload of payload.pages || []) {
    const page = await WebsitePage.findOne({
      _id: pagePayload.id,
      websiteId: website._id,
    });

    if (!page) continue;

    if (pagePayload.title !== undefined) page.title = pagePayload.title;
    if (pagePayload.slug !== undefined) page.slug = pagePayload.slug;
    if (pagePayload.sections !== undefined) page.sections = pagePayload.sections;
    if (pagePayload.seo !== undefined) page.seo = pagePayload.seo as any;
    if (pagePayload.sortOrder !== undefined) page.sortOrder = pagePayload.sortOrder;
    await page.save();
  }

  const currentVersion = Number.parseInt(website.draftVersion.replace("draft-", ""), 10) || 1;
  website.draftVersion = `draft-${currentVersion + 1}`;
  website.draftStatus = "modified";
  website.lastBuildError = "";
  await website.save();

  return {
    draftVersion: website.draftVersion,
    draftStatus: website.draftStatus,
  };
};

export const updateWebsiteSettings = async (
  websiteId: string,
  data: {
    companyName?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    logo?: string;
    favicon?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
      linkedin?: string;
    };
  }
) => {
  return WebsiteSettings.findOneAndUpdate(
    {
      websiteId: new Types.ObjectId(websiteId),
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};
