import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;

  role: UserRole;
  websiteId?: string;
  websiteSlug?: string;
  templateSlug?: string;

  isEmailVerified: boolean;
  isActive: boolean;

  subscription: {
    plan: "free" | "pro" | "enterprise";
    expiresAt?: Date;
  };

  comparePassword(
    password: string
  ): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: [
        validator.isEmail,
        "Invalid email",
      ],
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    websiteId: {
      type: String,
      default: "",
      trim: true,
    },

    websiteSlug: {
      type: String,
      default: "",
      trim: true,
    },

    templateSlug: {
      type: String,
      default: "",
      trim: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    subscription: {
      plan: {
        type: String,
        enum: [
          "free",
          "pro",
          "enterprise",
        ],
        default: "free",
      },

      expiresAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index(
  { email: 1, websiteId: 1 },
  {
    unique: true,
    sparse: true,
    name: "user_email_website_unique",
  }
);

/* ===========================
   Hash Password
=========================== */

UserSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    12
  );
});

/* ===========================
   Compare Password
=========================== */

UserSchema.methods.comparePassword =
  async function (
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(
      password,
      this.password
    );
  };

const User = mongoose.model<IUser>(
  "User",
  UserSchema
);

export default User;