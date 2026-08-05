import { Types } from "mongoose";

import Website from "../models/Website";
import WebsiteSettings from "../models/WebsiteSettings";
import WebsiteTheme from "../models/WebsiteTheme";
import WebsitePage from "../models/WebsitePage";

import { getTemplateById } from "../templates";

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

export const createWebsite = async ({
  userId,
  templateSlug,
  name,
  subdomain,
  customDomain,
}: CreateWebsiteData) => {
  const resolvedTemplateSlug = resolveTemplateSlug(templateSlug);
  const template = getTemplateById(resolvedTemplateSlug);

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
    subdomain: subdomain || "",
    customDomain: customDomain || "",
    templateVersion: template.version,
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

  return website;
};

export const getUserWebsites = async (
  userId: string
) => {
  return Website.find({
    userId: new Types.ObjectId(userId),
  }).sort({
    createdAt: -1,
  });
};

export const getWebsiteById = async (
  websiteId: string
) => {
  return Website.findById(
    new Types.ObjectId(websiteId)
  );
};

export const deleteWebsite = async (
  websiteId: string
) => {
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
  return Website.findByIdAndUpdate(
    new Types.ObjectId(websiteId),
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const getWebsiteDashboard = async (
  websiteId: string
) => {
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
    website,
    settings,
    theme,
    pages,
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