import {
  LayoutDashboard,
  Users,
  Globe,
  LayoutTemplate,
  ShoppingCart,
  CreditCard,
  Globe2,
  Image,
  Sparkles,
  BarChart3,
  Bell,
  FileText,
  LifeBuoy,
  ScrollText,
  ShieldCheck,
  Settings,
  User,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  path: string;
  icon: typeof LayoutDashboard;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Websites",
    path: "/websites",
    icon: Globe,
  },
  {
    title: "Templates",
    path: "/templates",
    icon: LayoutTemplate,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Payments",
    path: "/payments",
    icon: CreditCard,
  },
  {
    title: "Domains",
    path: "/domains",
    icon: Globe2,
  },
  {
    title: "Media",
    path: "/media",
    icon: Image,
  },
  
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  
  {
    title: "Support",
    path: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Logs",
    path: "/logs",
    icon: ScrollText,
  },
  {
    title: "Roles",
    path: "/roles",
    icon: ShieldCheck,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
 
];