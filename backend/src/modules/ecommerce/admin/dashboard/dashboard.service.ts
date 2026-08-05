const getStoreKey = (websiteId?: string) => websiteId || "default";

const getDemoStore = (websiteId?: string) => {
  const key = getStoreKey(websiteId);
  const store = (global as any).__ecommerceAdminDashboardStore || {};
  if (!store[key]) {
    store[key] = {
      overview: {
        orders: 128,
        revenue: 15420,
        customers: 340,
        products: 87,
        lowStock: 6,
        pendingReviews: 14,
      },
      stats: {
        todayOrders: 12,
        todayRevenue: 982,
        conversionRate: 4.8,
        activeVisitors: 86,
      },
      revenueSeries: [1200, 1480, 1660, 1320, 1890, 2140, 2560],
      orderStatus: [{ label: "Completed", value: 78 }, { label: "Pending", value: 24 }, { label: "Cancelled", value: 8 }],
      recentActivity: [
        { id: "act-1", title: "New order placed", time: "5m ago" },
        { id: "act-2", title: "Stock updated", time: "23m ago" },
        { id: "act-3", title: "Review approved", time: "1h ago" },
      ],
    };
    (global as any).__ecommerceAdminDashboardStore = store;
  }
  return store[key];
};

export const getDashboardOverview = async (websiteId?: string) => getDemoStore(websiteId).overview;
export const getDashboardStats = async (websiteId?: string) => getDemoStore(websiteId).stats;
export const getDashboardRevenue = async (websiteId?: string) => ({ revenue: getDemoStore(websiteId).revenueSeries, currency: "USD" });
export const getDashboardOrders = async (websiteId?: string) => getDemoStore(websiteId).orderStatus;
export const getDashboardCustomers = async (websiteId?: string) => ({ total: getDemoStore(websiteId).overview.customers, newCustomers: 18 });
export const getDashboardProducts = async (websiteId?: string) => ({ total: getDemoStore(websiteId).overview.products, lowStock: getDemoStore(websiteId).overview.lowStock });
export const getDashboardAnalytics = async (websiteId?: string) => ({
  visitors: 1250,
  conversionRate: 4.8,
  revenue: getDemoStore(websiteId).overview.revenue,
  recentActivity: getDemoStore(websiteId).recentActivity,
});
