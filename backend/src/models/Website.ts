import { Schema, model, Document, Types } from "mongoose";

export interface IWebsite extends Document {
  userId: Types.ObjectId;

  templateSlug: string;

  name: string;

  slug: string;

  status: "draft" | "published" | "archived";

  subdomain: string;

  customDomain?: string;

  templateVersion: string;

  sourceProjectPath: string;

  draftVersion: string;

  publishedVersion: string;

  draftStatus: "clean" | "modified" | "building" | "failed";

  lastBuildError?: string;

  isPublished: boolean;

  visitors: number;

  storage: string;

  owner?: Types.ObjectId;

  title?: string;

  templateId?: string;

  domain?: string;

  isPublic?: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const WebsiteSchema = new Schema<IWebsite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    templateSlug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "archived",
      ],
      default: "draft",
    },

    subdomain: {
      type: String,
      default: "",
      trim: true,
    },

    customDomain: {
      type: String,
      default: "",
      trim: true,
    },

    templateVersion: {
      type: String,
      default: "1.0.0",
    },

    sourceProjectPath: {
      type: String,
      required: true,
      trim: true,
    },

    draftVersion: {
      type: String,
      default: "draft-1",
    },

    publishedVersion: {
      type: String,
      default: "",
    },

    draftStatus: {
      type: String,
      enum: ["clean", "modified", "building", "failed"],
      default: "clean",
    },

    lastBuildError: {
      type: String,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    visitors: {
      type: Number,
      default: 0,
    },

    storage: {
      type: String,
      default: "0 GB",
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    templateId: {
      type: String,
      default: "",
      trim: true,
    },

    domain: {
      type: String,
      default: "",
      trim: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IWebsite>(
  "Website",
  WebsiteSchema
);