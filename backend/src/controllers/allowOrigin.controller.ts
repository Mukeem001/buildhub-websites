import { Request, Response } from "express";
import AllowOrigin from "../models/AllowOrigin";

export const listAllowOrigins = async (req: Request, res: Response) => {
  try {
    const items = await AllowOrigin.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createAllowOrigin = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { origin } = req.body;
    if (!origin) {
      return res.status(400).json({ success: false, message: "Missing origin" });
    }

    const normalized = origin.toLowerCase().replace(/\/$/, "");
    const created = await AllowOrigin.findOneAndUpdate(
      { origin: normalized },
      { $setOnInsert: { origin: normalized, createdAt: new Date() } },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAllowOrigin = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Missing id" });
    }

    await AllowOrigin.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
