import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import {
  generateAccessToken,
} from "../utils/jwt";
import {
  successResponse,
  errorResponse,
} from "../utils/response";

export const signup = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return errorResponse(
        res,
        "All required fields are mandatory."
      );
    }

    const exists =
      await User.findOne({ email });

    if (exists) {
      return errorResponse(
        res,
        "Email already exists."
      );
    }

    const user =
      await User.create({
        fullName,
        email,
        password,
        phone,
      });

    const token =
      generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

    return successResponse(
      res,
      "Account created successfully.",
      {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          plan: user.subscription?.plan || "free",
        },
      },
      201
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return errorResponse(
        res,
        "Email and password are required."
      );
    }

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {
      return errorResponse(
        res,
        "Invalid credentials.",
        401
      );
    }

    const valid =
      await user.comparePassword(
        password
      );

    if (!valid) {
      return errorResponse(
        res,
        "Invalid credentials.",
        401
      );
    }

    if (!user.isActive) {
      return errorResponse(
        res,
        "Your account has been suspended. Please contact support.",
        403
      );
    }

    const token =
      generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

    return successResponse(
      res,
      "Login successful.",
      {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          plan: user.subscription?.plan || "free",
        },
      }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};




export const me = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    return successResponse(
      res,
      "User fetched successfully.",
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        subscription: user.subscription,
        plan: user.subscription?.plan || "free",
        isEmailVerified:
          user.isEmailVerified,
      }
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};

export const logout = async (
  _req: Request,
  res: Response
) => {
  return successResponse(
    res,
    "Logged out successfully."
  );
};

export const sendOtp = async (
  _req: Request,
  res: Response
) => {
  return successResponse(
    res,
    "OTP feature will be connected with email in next step."
  );
};

export const verifyOtp = async (
  _req: Request,
  res: Response
) => {
  return successResponse(
    res,
    "OTP verification feature coming next."
  );
};

export const resetPassword = async (
  _req: Request,
  res: Response
) => {
  return successResponse(
    res,
    "Reset password feature coming next."
  );
};