import { Response } from "express";

import User from "../models/User";
import Website from "../models/Website";
import { AuthRequest } from "../middleware/auth";
import { errorResponse, successResponse } from "../utils/response";

const ACTIVE_SESSION_TTL_MS = 1000 * 60 * 60 * 24;

const getSessionFingerprint = (req: AuthRequest) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  return `${token}:${ip}`;
};

const normalizeRole = (value?: string) => {
  const normalized = (value || "").toLowerCase().trim();

  if (normalized === "admin" || normalized === "super admin" || normalized === "editor") {
    return "admin";
  }

  return "user";
};

const normalizeUserUpdatePayload = (payload: Record<string, any> = {}) => {
  const normalizedPayload: Record<string, any> = { ...payload };

  if (typeof payload.role !== "undefined") {
    normalizedPayload.role = normalizeRole(payload.role);
  }

  if (typeof payload.status !== "undefined") {
    const statusValue = String(payload.status).toLowerCase();
    normalizedPayload.isActive = !["suspended", "inactive", "false"].includes(statusValue);
    delete normalizedPayload.status;
  }

  if (typeof payload.isActive === "string") {
    const isActiveValue = payload.isActive.toLowerCase();
    normalizedPayload.isActive = !["false", "inactive", "suspended", "0"].includes(isActiveValue);
  }

  return normalizedPayload;
};

export const getCurrentUserProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return errorResponse(res, "Unauthorized.", 401);
    }

    return successResponse(res, "Profile fetched successfully.", {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      plan: user.subscription?.plan || "free",
      isActive: user.isActive,
      status: user.isActive ? "Active" : "Suspended",
    });
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return errorResponse(res, "Unauthorized.", 401);
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      normalizeUserUpdatePayload(req.body),
      { new: true, runValidators: true }
    );

    return successResponse(
      res,
      "Profile updated successfully.",
      updatedUser
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getAllUsers = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const users = await User.find({}).select("-password").lean();

    const websiteCounts = await Website.aggregate([
      {
        $project: {
          userIds: ["$userId", "$owner"],
        },
      },
      {
        $unwind: "$userIds",
      },
      {
        $match: {
          userIds: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$userIds",
          count: { $sum: 1 },
        },
      },
    ]);

    const countsMap = websiteCounts.reduce(
      (acc: Record<string, number>, entry: any) => {
        acc[String(entry._id)] = entry.count;
        return acc;
      },
      {}
    );

    const usersWithCount = users.map((user: any) => ({
      ...user,
      websiteCount: countsMap[String(user._id)] || 0,
    }));

    return successResponse(res, "Users fetched successfully.", usersWithCount);
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteUserById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id) return errorResponse(res, "User id required", 400);

    await User.findByIdAndDelete(id);

    return successResponse(res, "User deleted successfully.");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const getUserById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id) return errorResponse(res, "User id required", 400);

    const user = await User.findById(id).select("-password");

    if (!user) return errorResponse(res, "User not found", 404);

    const websiteCount = await Website.countDocuments({
      $or: [{ userId: user._id }, { owner: user._id }],
    });

    return successResponse(res, "User fetched successfully.", {
      ...user.toObject(),
      websiteCount,
      status: user.isActive ? "Active" : "Suspended",
      plan: user.subscription?.plan || "free",
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: (user as any).createdAt,
      updatedAt: (user as any).updatedAt,
    });
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const bulkDeleteUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { ids } = req.body as { ids?: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse(res, "ids array required", 400);
    }

    await User.deleteMany({ _id: { $in: ids } });

    return successResponse(res, "Users deleted successfully.");
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateUserById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params as { id?: string };

    if (!id) return errorResponse(res, "User id required", 400);

    const payload = normalizeUserUpdatePayload(req.body);

    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).select("-password");

    return successResponse(res, "User updated successfully.", updatedUser);
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};
