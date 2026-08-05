import mongoose, { Schema, Document } from "mongoose";

export interface IDomain extends Document {
  websiteId: mongoose.Types.ObjectId;

  domain: string;

  hostname: string;

  type: "subdomain" | "custom";

  cnameHost: string;

  cnameTarget: string;

  verificationStatus:
    | "pending"
    | "verified"
    | "failed";

  sslStatus:
    | "pending"
    | "generating"
    | "active";
}

const DomainSchema = new Schema(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
    },

    domain: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    hostname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: ["subdomain", "custom"],
      default: "custom",
    },

    cnameHost: {
      type: String,
      default: "www",
    },

    cnameTarget: {
      type: String,
      default:
        process.env.CUSTOM_DOMAIN_TARGET ||
        "builder.buildhub.app",
    },

    verificationStatus: {
      type: String,
      enum: [
        "pending",
        "verified",
        "failed",
      ],
      default: "pending",
    },

    sslStatus: {
      type: String,
      enum: [
        "pending",
        "generating",
        "active",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDomain>(
  "Domain",
  DomainSchema
);