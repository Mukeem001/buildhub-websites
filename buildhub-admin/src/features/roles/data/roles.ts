import { Role } from "../types/role";
import { permissions } from "./permissions";

export const roles: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all BuildHub modules.",
    color: "#ef4444",
    users: 2,
    isSystem: true,
    createdAt: "2026-01-10",
    updatedAt: "2026-06-18",
    permissions,
  },
  {
    id: 2,
    name: "Administrator",
    description: "Manage users, websites and platform settings.",
    color: "#3b82f6",
    users: 6,
    isSystem: true,
    createdAt: "2026-01-12",
    updatedAt: "2026-06-20",
    permissions: permissions.filter(
      (p) => p.module !== "Roles"
    ),
  },
  {
    id: 3,
    name: "Manager",
    description: "Manage daily business operations.",
    color: "#10b981",
    users: 12,
    isSystem: false,
    createdAt: "2026-02-01",
    updatedAt: "2026-06-12",
    permissions: permissions.filter((p) =>
      [
        "Dashboard",
        "Orders",
        "Payments",
        "Support",
        "Analytics",
      ].includes(p.module)
    ),
  },
  {
    id: 4,
    name: "Developer",
    description: "Manage websites, domains and logs.",
    color: "#8b5cf6",
    users: 8,
    isSystem: false,
    createdAt: "2026-02-05",
    updatedAt: "2026-06-22",
    permissions: permissions.filter((p) =>
      [
        "Dashboard",
        "Websites",
        "Domains",
        "Logs",
        "Media",
      ].includes(p.module)
    ),
  },
  {
    id: 5,
    name: "Designer",
    description: "Manage templates and media assets.",
    color: "#ec4899",
    users: 5,
    isSystem: false,
    createdAt: "2026-02-08",
    updatedAt: "2026-06-10",
    permissions: permissions.filter((p) =>
      ["Templates", "Media", "Dashboard"].includes(
        p.module
      )
    ),
  },
  {
    id: 6,
    name: "Content Editor",
    description: "Manage CMS and media content.",
    color: "#f59e0b",
    users: 9,
    isSystem: false,
    createdAt: "2026-02-15",
    updatedAt: "2026-06-25",
    permissions: permissions.filter((p) =>
      ["CMS", "Media", "Dashboard"].includes(
        p.module
      )
    ),
  },
  {
    id: 7,
    name: "Billing Manager",
    description: "Manage payments and orders.",
    color: "#06b6d4",
    users: 4,
    isSystem: false,
    createdAt: "2026-03-01",
    updatedAt: "2026-06-15",
    permissions: permissions.filter((p) =>
      ["Orders", "Payments", "Analytics"].includes(
        p.module
      )
    ),
  },
  {
    id: 8,
    name: "Support Agent",
    description: "Handle customer support tickets.",
    color: "#84cc16",
    users: 14,
    isSystem: false,
    createdAt: "2026-03-12",
    updatedAt: "2026-06-08",
    permissions: permissions.filter((p) =>
      ["Support", "Notifications"].includes(
        p.module
      )
    ),
  },
  {
    id: 9,
    name: "Analyst",
    description: "View analytics and reports.",
    color: "#14b8a6",
    users: 7,
    isSystem: false,
    createdAt: "2026-03-20",
    updatedAt: "2026-06-16",
    permissions: permissions.filter((p) =>
      ["Dashboard", "Analytics"].includes(
        p.module
      )
    ),
  },
  {
    id: 10,
    name: "Viewer",
    description: "Read-only access.",
    color: "#6b7280",
    users: 31,
    isSystem: false,
    createdAt: "2026-04-01",
    updatedAt: "2026-06-01",
    permissions: permissions
      .filter((p) => p.actions.includes("view"))
      .map((p) => ({
        ...p,
        actions: ["view"],
      })),
  },
];