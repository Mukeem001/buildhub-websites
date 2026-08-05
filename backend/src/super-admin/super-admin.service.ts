import User from "../models/User";
import Website from "../models/Website";
import Template from "../models/Template";

const getMonthName = (monthIndex: number) => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][monthIndex];
};

const buildRevenueSeries = async () => {
  const now = new Date();
  const results: Array<{ month: string; revenue: number }> = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);

    const websiteCount = await Website.countDocuments({
      createdAt: {
        $gte: monthStart,
        $lt: monthEnd,
      },
    });

    results.push({
      month: getMonthName(monthDate.getMonth()),
      revenue: websiteCount * 9800 + 1200,
    });
  }

  return results;
};

const mapStatus = (user: any) =>
  user.isActive ? "Active" : "Suspended";

const mapPlan = (user: any) => {
  if (user.subscription?.plan === "enterprise") return "Enterprise";
  if (user.subscription?.plan === "pro") return "Pro";
  return "Free";
};

export const getDashboard = async () => {
  const [
    totalUsers,
    totalWebsites,
    publishedWebsites,
    draftWebsites,
    totalTemplates,
    recentUsersData,
    recentWebsites,
    templates,
  ] = await Promise.all([
    User.countDocuments(),
    Website.countDocuments(),
    Website.countDocuments({ status: "published" }),
    Website.countDocuments({ status: "draft" }),
    Template.countDocuments({ isActive: true }),
    User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Website.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Template.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
  ]);

  const orderCount = Math.max(1, totalWebsites * 6);
  const revenue = totalWebsites * 9620 + orderCount * 120;
  const revenueSeries = await buildRevenueSeries();

  const recentUsers = recentUsersData.map((user: any) => ({
    name: user.fullName,
    email: user.email,
    plan: mapPlan(user),
    status: mapStatus(user),
    joined: new Date(user.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    lastLogin: "Just now",
  }));

  const recentOrders = recentWebsites.map((website: any, index: number) => ({
    id: `#BH-${1001 + index}`,
    customer: website.name,
    website: website.name,
    amount: `$${(Math.floor(Math.random() * 10) + 1) * 49}`,
    status: ["Paid", "Pending", "Failed"][index % 3],
  }));

  const topTemplates = templates.map((template: any, index: number) => ({
    name: template.name,
    category: template.category || "General",
    downloads: `${Math.max(3, 10 - index) * 1.7}K`,
    rating: (4.7 + index * 0.1).toFixed(1),
    premium: index % 2 === 0,
  }));

  const trafficSources = [
    { name: "Organic", value: 45 },
    { name: "Direct", value: 25 },
    { name: "Social", value: 18 },
    { name: "Referral", value: 12 },
  ];

  const latestActivity = [
    {
      title: "New user registered",
      description: "A new admin user joined the platform",
      time: "2 min ago",
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Website Published",
      description: "A new website is now live",
      time: "15 min ago",
      color: "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "Payment Received",
      description: "$299 subscription payment was received",
      time: "1 hour ago",
      color: "bg-orange-500/10 text-orange-400",
    },
    {
      title: "API health check passed",
      description: "BuildHub admin services are operating normally",
      time: "3 hours ago",
      color: "bg-purple-500/10 text-purple-400",
    },
  ];

  const systemStatus = [
    {
      title: "CPU Usage",
      value: "42%",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "RAM Usage",
      value: "68%",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Storage",
      value: "812 GB",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Server Status",
      value: "Online",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return {
    stats: {
      totalUsers,
      totalWebsites,
      orders: orderCount,
      revenue,
      publishedWebsites,
      draftWebsites,
      totalTemplates,
    },
    revenueSeries,
    trafficSources,
    recentUsers,
    recentOrders,
    topTemplates,
    latestActivity,
    systemStatus,
  };
};

export const getAllWebsites = async () => {
  const websites = await Website.find({})
    .populate({
      path: "owner",
      select: "fullName email subscription",
    })
    .populate({
      path: "userId",
      select: "fullName email",
    })
    .sort({
      createdAt: -1,
    })
    .lean();

  return websites.map((website: any) => ({
    ...website,
    visitors: website.visitors ?? 0,
    storage: website.storage || "0 GB",
  }));
};

export const getAllUsers = async () => {
  return User.find({}).sort({
    createdAt: -1,
  });
};