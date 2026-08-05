import { Request, Response } from "express";
import * as SuperAdminService from "./super-admin.service";

export const login = async (
  req: Request,
  res: Response
) => {
  return res.json({
    success: true,
    message: "Login API Ready",
  });
};

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      await SuperAdminService.getDashboard();

    return res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const profile = async (
  req: Request,
  res: Response
) => {
  return res.json({
    success: true,
    data: {
      name: "Super Admin",
      email: "admin@buildhub.com",
    },
  });
};

export const getAllWebsites = async (
  _req: Request,
  res: Response
) => {
  try {
    const data =
      await SuperAdminService.getAllWebsites();

    return res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};