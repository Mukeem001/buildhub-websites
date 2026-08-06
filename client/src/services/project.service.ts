import type { Project } from "../types/project";
import { getCurrentUser, invalidateSession } from "./auth.service";
import { API_URL } from "./api.config";

const STORAGE_KEY = "buildhub_projects";

const formatTemplateName = (templateSlug?: string) => {
  if (!templateSlug) return "Custom Website";

  return templateSlug
    .split("-")
    .map(
      (chunk) =>
        chunk.charAt(0).toUpperCase() + chunk.slice(1)
    )
    .join(" ");
};

const mapWebsiteToProject = (
  website: any
): Project => {
  const apiOrigin =
    import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
      : "http://2.28.13.238:5000";

  const websiteUrl = website.customDomain
    ? `https://${website.customDomain}`
    : website.domain
    ? `https://${website.domain}`
    : `${apiOrigin}/sites/${website.slug}`;

  const project: Project = {
    id: website._id || website.id,
    slug: website.slug,
    name: website.name || "Untitled Website",
    templateName: formatTemplateName(
      website.templateSlug
    ),
    templateSlug: website.templateSlug,

    url: websiteUrl,

    domain:
      website.customDomain ||
      website.domain ||
      `${apiOrigin}/sites/${website.slug}`,

    status:
      website.status === "published" ||
      website.status === "live"
        ? "live"
        : "building",

    createdAt:
      website.createdAt ||
      new Date().toISOString(),

    visits: website.visits || 0,

    orders: website.orders || 0,

    image:
      website.image ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  };

  console.log("Mapped Project:", project);

  return project;
};

// GET all projects from local storage fallback
export const getProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const fetchProjects = async (): Promise<
  Project[]
> => {
  const user = getCurrentUser();

  if (!user?.id) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/websites/user/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const data = await response
    .json()
    .catch(() => null);

  console.log("Fetched projects:", data);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(data?.message || "Session expired");
    }

    throw new Error(
      data?.message || "Failed to fetch projects"
    );
  }

  const projects = (data?.data || []).map(
    mapWebsiteToProject
  );

  console.log("Final Projects:", projects);

  return projects;
};

// CREATE project
export const createProject = (
  project: Project
) => {
  const projects = getProjects();

  const updated = [project, ...projects];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return project;
};

export const deleteWebsite = async (id: string) => {
  const user = getCurrentUser();

  if (!user?.id) {
    throw new Error("Please log in before deleting a website.");
  }

  const response = await fetch(
    `${API_URL}/websites/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token || ""}`,
      },
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 403) {
      invalidateSession(data?.message || "Session expired");
    }

    throw new Error(
      data?.message || "Failed to delete website."
    );
  }
};

// DELETE project
export const deleteProject = (id: string) => {
  const projects = getProjects();

  const updated = projects.filter(
    (p) => p.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
};