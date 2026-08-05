import { Types } from "mongoose";

import Website from "../models/Website";
import { validateDomain } from "./domain.service";
import { slugify } from "../utils/slug";

export interface PublishPayload {
  owner?: string;
  title: string;
  templateId: string;
  domain?: string;
  slug?: string;
}

export const publishWebsite = async (payload: PublishPayload) => {
  const domain = payload.domain ? validateDomain(payload.domain) : undefined;

  if (payload.domain && !domain) {
    throw new Error("Invalid domain format.");
  }

  const website = await Website.create({
    userId: payload.owner
      ? new Types.ObjectId(payload.owner)
      : new Types.ObjectId(),
    templateSlug: payload.templateId,
    name: payload.title,
    title: payload.title,
    templateId: payload.templateId,
    ...(domain ? { domain } : {}),
    slug: payload.slug || slugify(payload.title),
    status: "published",
    isPublished: true,
    isPublic: true,
  });

  return website;
};
