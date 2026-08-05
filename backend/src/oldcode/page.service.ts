import { Types } from "mongoose";
import WebsitePage from "../models/WebsitePage";

/* =========================
   GET PAGE
========================= */
export const getPage = async (
  pageId: string
) => {
  return WebsitePage.findById(
    new Types.ObjectId(pageId)
  );
};

/* =========================
   ADD SECTION
========================= */
export const addSection = async (
  pageId: string,
  section: {
    id: string;
    type: string;
    props?: any;
  }
) => {
  const page = await WebsitePage.findById(
    new Types.ObjectId(pageId)
  );

  if (!page) {
    throw new Error("Page not found");
  }

  const newSection = {
    id: section.id,
    type: section.type,
    visible: true,
    order: page.sections.length + 1,
    props: section.props || {},
  };

  page.sections.push(newSection as any);

  await page.save();

  return page;
};

/* =========================
   UPDATE SECTION
========================= */
export const updateSection = async (
  pageId: string,
  sectionId: string,
  data: any
) => {
  const page = await WebsitePage.findById(
    new Types.ObjectId(pageId)
  );

  if (!page) {
    throw new Error("Page not found");
  }

  const section = page.sections.find(
    (s: any) => s.id === sectionId
  );

  if (!section) {
    throw new Error("Section not found");
  }

  Object.assign(section, data);

  await page.save();

  return page;
};

/* =========================
   DELETE SECTION
========================= */
export const deleteSection = async (
  pageId: string,
  sectionId: string
) => {
  const page = await WebsitePage.findById(
    new Types.ObjectId(pageId)
  );

  if (!page) {
    throw new Error("Page not found");
  }

  page.sections = page.sections.filter(
    (s: any) => s.id !== sectionId
  ) as any;

  await page.save();

  return page;
};

/* =========================
   REORDER SECTIONS
========================= */
export const reorderSections = async (
  pageId: string,
  sectionOrder: string[]
) => {
  const page = await WebsitePage.findById(
    new Types.ObjectId(pageId)
  );

  if (!page) {
    throw new Error("Page not found");
  }

  const newSections: any[] = [];

  sectionOrder.forEach((id, index) => {
    const section = page.sections.find(
      (s: any) => s.id === id
    );

    if (section) {
      section.order = index + 1;
      newSections.push(section);
    }
  });

  page.sections = newSections as any;

  await page.save();

  return page;
};