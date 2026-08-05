import { Request, Response } from "express";

import * as PageService from "./page.service";

import {
  ParamsWithPageId,
  ParamsWithSectionId,
} from "../types/express";

/* =========================
   ADD SECTION
========================= */
export const addSection = async (
  req: Request<ParamsWithPageId>,
  res: Response
) => {
  try {
    const { pageId } = req.params;
    const { id, type, props } = req.body;

    const page = await PageService.addSection(pageId, {
      id,
      type,
      props,
    });

    return res.status(200).json({
      success: true,
      message: "Section added successfully",
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/* =========================
   UPDATE SECTION
========================= */
export const updateSection = async (
  req: Request<ParamsWithSectionId>,
  res: Response
) => {
  try {
    const { pageId, sectionId } = req.params;

    const page = await PageService.updateSection(
      pageId,
      sectionId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/* =========================
   DELETE SECTION
========================= */
export const deleteSection = async (
  req: Request<ParamsWithSectionId>,
  res: Response
) => {
  try {
    const { pageId, sectionId } = req.params;

    const page = await PageService.deleteSection(
      pageId,
      sectionId
    );

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/* =========================
   REORDER SECTIONS
========================= */

export const reorderSections = async (
  req: Request<ParamsWithPageId>,
  res: Response
) => {
  try {
    const { pageId } = req.params;
    const { sectionOrder } = req.body;

    const page = await PageService.reorderSections(
      pageId,
      sectionOrder
    );

    return res.status(200).json({
      success: true,
      message: "Sections reordered successfully",
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/* =========================
   GET PAGE
========================= */
export const getPage = async (
  req: Request<ParamsWithPageId>,
  res: Response
) => {
  try {
    const { pageId } = req.params;

    const page = await PageService.getPage(pageId);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};