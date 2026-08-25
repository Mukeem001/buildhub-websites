import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
import { successResponse, errorResponse } from "../utils/response";

const TEMPLATES_DIR = path.join(__dirname, "../../../templates");

interface TemplateInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  thumbnail?: string;
  path: string;
  hasPackageJson: boolean;
  hasIndexHtml: boolean;
}

export const getSystemTemplates = async (
  _req: Request,
  res: Response
) => {
  try {
    const templates: TemplateInfo[] = [];
    
    // Read all folders in templates directory
    const folders = await fs.readdir(TEMPLATES_DIR);
    
    for (const folder of folders) {
      const templatePath = path.join(TEMPLATES_DIR, folder);
      const stat = await fs.stat(templatePath);
      
      if (!stat.isDirectory()) continue;
      
      const packageJsonPath = path.join(templatePath, "package.json");
      const indexHtmlPath = path.join(templatePath, "index.html");
      const readmePath = path.join(templatePath, "README.md");
      
      const hasPackageJson = await fs.pathExists(packageJsonPath);
      const hasIndexHtml = await fs.pathExists(indexHtmlPath);
      
      let description = `${folder} template`;
      let category = "Custom";
      
      // Read description from README if available
      if (await fs.pathExists(readmePath)) {
        const readmeContent = await fs.readFile(readmePath, "utf-8");
        const descMatch = readmeContent.split("\n").find(line => !line.startsWith("#"));
        if (descMatch) {
          description = descMatch.trim();
        }
      }
      
      // Categorize templates
      if (folder.toLowerCase() === "ecommerce") category = "E-Commerce";
      if (folder.toLowerCase() === "hospital") category = "Healthcare";
      if (folder.toLowerCase() === "restaurant") category = "Restaurant";
      if (folder.toLowerCase() === "portfolio") category = "Portfolio";
      
      // Try to get thumbnail from public folder
      const thumbnailPath = path.join(templatePath, "public", "thumbnail.png");
      const hasThumbnail = await fs.pathExists(thumbnailPath);
      
      templates.push({
        id: folder,
        name: folder.charAt(0).toUpperCase() + folder.slice(1),
        slug: folder,
        description,
        category,
        thumbnail: hasThumbnail ? `/templates/${folder}/public/thumbnail.png` : undefined,
        path: templatePath,
        hasPackageJson,
        hasIndexHtml,
      });
    }
    
    return successResponse(
      res,
      "System templates fetched successfully.",
      templates
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const getSystemTemplateById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const templatePath = path.join(TEMPLATES_DIR, id);
    
    const stat = await fs.stat(templatePath);
    if (!stat.isDirectory()) {
      return errorResponse(res, "Template not found.", 404);
    }
    
    const packageJsonPath = path.join(templatePath, "package.json");
    const indexHtmlPath = path.join(templatePath, "index.html");
    const readmePath = path.join(templatePath, "README.md");
    
    let packageJson: any = null;
    let readmeContent = "";
    
    if (await fs.pathExists(packageJsonPath)) {
      packageJson = await fs.readJson(packageJsonPath);
    }
    
    if (await fs.pathExists(readmePath)) {
      readmeContent = await fs.readFile(readmePath, "utf-8");
    }
    
    const files = await fs.readdir(templatePath);
    
    let category = "Custom";
    if (id.toLowerCase() === "ecommerce") category = "E-Commerce";
    if (id.toLowerCase() === "hospital") category = "Healthcare";
    
    return successResponse(res, "Template details fetched.", {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      slug: id,
      category,
      path: templatePath,
      packageJson,
      readmeContent,
      files,
      structure: {
        hasPackageJson: await fs.pathExists(packageJsonPath),
        hasIndexHtml: await fs.pathExists(indexHtmlPath),
        hasReadme: await fs.pathExists(readmePath),
      }
    });
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};

export const getTemplateFile = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const filePathParam = Array.isArray(req.params.filePath) ? req.params.filePath[0] : req.params.filePath;
    const templatePath = path.join(TEMPLATES_DIR, id);
    
    // Security: prevent directory traversal
    const normalizedPath = path.normalize(filePathParam).replace(/\.\./g, '');
    const fullPath = path.join(templatePath, normalizedPath);
    
    if (!fullPath.startsWith(templatePath)) {
      return errorResponse(res, "Invalid file path.", 400);
    }
    
    const exists = await fs.pathExists(fullPath);
    if (!exists) {
      return errorResponse(res, "File not found.", 404);
    }
    
    const content = await fs.readFile(fullPath, "utf-8");
    return successResponse(res, "File content fetched.", { content, path: filePathParam });
  } catch (error: any) {
    return errorResponse(res, error.message, 500);
  }
};
