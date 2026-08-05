import {
  RevenueData,
  UserGrowthData,
  VisitorData,
  DeviceData,
  TrafficSource,
  TopWebsite,
  AnalyticsStats,
} from "../types/analytics";

export const analyticsStats: AnalyticsStats = {
  revenue: 248950,
  users: 12480,
  websites: 3560,
  orders: 924,
  conversion: 6.4,
  bounceRate: 28.1,
};

export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 22000 },
  { month: "Mar", revenue: 26500 },
  { month: "Apr", revenue: 31200 },
  { month: "May", revenue: 38400 },
  { month: "Jun", revenue: 44700 },
];

export const userGrowthData: UserGrowthData[] = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1800 },
  { month: "Mar", users: 2500 },
  { month: "Apr", users: 3400 },
  { month: "May", users: 4600 },
  { month: "Jun", users: 5800 },
];

export const visitorsData: VisitorData[] = [
  { day: "Mon", visitors: 850 },
  { day: "Tue", visitors: 940 },
  { day: "Wed", visitors: 1120 },
  { day: "Thu", visitors: 980 },
  { day: "Fri", visitors: 1260 },
  { day: "Sat", visitors: 1410 },
  { day: "Sun", visitors: 1180 },
];

export const deviceData: DeviceData[] = [
  { device: "Desktop", users: 58 },
  { device: "Mobile", users: 34 },
  { device: "Tablet", users: 8 },
];

export const trafficSources: TrafficSource[] = [
  { source: "Google", visitors: 8400 },
  { source: "Direct", visitors: 4200 },
  { source: "Facebook", visitors: 2800 },
  { source: "Instagram", visitors: 1800 },
  { source: "YouTube", visitors: 950 },
];

export const topWebsites: TopWebsite[] = [
  {
    id: 1,
    name: "BuildHub Store",
    owner: "Ahmad Sheikh",
    visitors: 24500,
    revenue: 48200,
  },
  {
    id: 2,
    name: "Fashion Pro",
    owner: "John Doe",
    visitors: 19800,
    revenue: 37100,
  },
  {
    id: 3,
    name: "Food Express",
    owner: "Sarah Lee",
    visitors: 15400,
    revenue: 29800,
  },
];