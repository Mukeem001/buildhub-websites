import api from "./api";

export interface DashboardStats {
  totalUsers: number;
  totalWebsites: number;
  orders: number;
  revenue: number;
  publishedWebsites: number;
  draftWebsites: number;
  totalTemplates: number;
}

export interface DashboardRevenuePoint {
  month: string;
  revenue: number;
}

export interface DashboardTrafficSource {
  name: string;
  value: number;
}

export interface DashboardUser {
  name: string;
  email: string;
  plan: string;
  status: string;
  joined: string;
  lastLogin: string;
}

export interface DashboardOrder {
  id: string;
  customer: string;
  website: string;
  amount: string;
  status: string;
}

export interface DashboardTemplate {
  name: string;
  category: string;
  downloads: string;
  rating: string;
  premium: boolean;
}

export interface DashboardActivity {
  title: string;
  description: string;
  time: string;
  color: string;
}

export interface DashboardSystemStatus {
  title: string;
  value: string;
  color: string;
  bg: string;
}

export interface DashboardPayload {
  stats: DashboardStats;
  revenueSeries: DashboardRevenuePoint[];
  trafficSources: DashboardTrafficSource[];
  recentUsers: DashboardUser[];
  recentOrders: DashboardOrder[];
  topTemplates: DashboardTemplate[];
  latestActivity: DashboardActivity[];
  systemStatus: DashboardSystemStatus[];
}

export const getDashboard = async () => {
  const response = await api.get("/api/super-admin/dashboard");
  return response.data.data as DashboardPayload;
};
