export interface RevenueData {
  month: string;
  revenue: number;
}

export interface UserGrowthData {
  month: string;
  users: number;
}

export interface VisitorData {
  day: string;
  visitors: number;
}

export interface DeviceData {
  device: string;
  users: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
}

export interface TopWebsite {
  id: number;
  name: string;
  owner: string;
  visitors: number;
  revenue: number;
}

export interface AnalyticsStats {
  revenue: number;
  users: number;
  websites: number;
  orders: number;
  conversion: number;
  bounceRate: number;
}