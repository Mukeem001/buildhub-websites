import { Permission } from "../types/role";

export const permissions: Permission[] = [
  {
    module: "Dashboard",
    actions: ["view"],
  },
  {
    module: "Users",
    actions: ["view", "create", "update", "delete", "manage"],
  },
  {
    module: "Websites",
    actions: ["view", "create", "update", "delete", "manage"],
  },
  {
    module: "Templates",
    actions: ["view", "create", "update", "delete", "manage"],
  },
  {
    module: "Orders",
    actions: ["view", "update", "manage"],
  },
  {
    module: "Payments",
    actions: ["view", "update", "manage"],
  },
  {
    module: "Domains",
    actions: ["view", "create", "update", "delete", "manage"],
  },
  {
    module: "Media",
    actions: ["view", "create", "update", "delete"],
  },
  {
    module: "Analytics",
    actions: ["view"],
  },
  {
    module: "Notifications",
    actions: ["view", "create", "delete"],
  },
  {
    module: "CMS",
    actions: ["view", "create", "update", "delete"],
  },
  {
    module: "Support",
    actions: ["view", "update", "manage"],
  },
  {
    module: "Logs",
    actions: ["view", "delete"],
  },
  {
    module: "Roles",
    actions: ["view", "create", "update", "delete", "manage"],
  },
  {
    module: "Settings",
    actions: ["view", "update", "manage"],
  },
];