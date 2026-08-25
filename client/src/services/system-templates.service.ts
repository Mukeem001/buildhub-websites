import { API_URL } from "./api.config";

export interface SystemTemplate {
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

export interface SystemTemplateDetails {
  id: string;
  name: string;
  slug: string;
  category: string;
  path: string;
  packageJson?: any;
  readmeContent?: string;
  files: string[];
  structure: {
    hasPackageJson: boolean;
    hasIndexHtml: boolean;
    hasReadme: boolean;
  };
}

export const fetchSystemTemplates = async (): Promise<SystemTemplate[]> => {
  const response = await fetch(`${API_URL}/system-templates`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch system templates");
  }
  
  const data = await response.json();
  return data.data || [];
};

export const fetchSystemTemplateById = async (id: string): Promise<SystemTemplateDetails> => {
  const response = await fetch(`${API_URL}/system-templates/${id}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch system template");
  }
  
  const data = await response.json();
  return data.data;
};

export const fetchTemplateFile = async (templateId: string, filePath: string): Promise<string> => {
  const response = await fetch(`${API_URL}/system-templates/${templateId}/file/${filePath}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch template file");
  }
  
  const data = await response.json();
  return data.data.content;
};
