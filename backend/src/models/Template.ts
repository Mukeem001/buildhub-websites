import mongoose, { Document, Schema } from "mongoose";

export interface ITemplate extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  author?: string;
  price?: number;
  downloads?: number;
  thumbnail?: string;
  previewUrl?: string;
  premium?: boolean;
  rating?: number;
  isActive: boolean;
  tags: string[];
}

const TemplateSchema = new Schema<ITemplate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "general",
    },
    author: {
      type: String,
      default: "BuildHub",
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    previewUrl: {
      type: String,
      default: "",
    },
    premium: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
