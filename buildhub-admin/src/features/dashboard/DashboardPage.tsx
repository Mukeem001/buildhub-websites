import { useEffect, useState } from "react";
import { toast } from "sonner";
import WelcomeHero from "./components/WelcomeHero";
import StatsCards from "./components/StatsCards";
import RevenueChart from "./components/RevenueChart";
import TrafficChart from "./components/TrafficChart";
import SystemStatus from "./components/SystemStatus";
import RecentUsers from "./components/RecentUsers";
import RecentOrders from "./components/RecentOrders";
import LatestActivity from "./components/LatestActivity";
import TopTemplates from "./components/TopTemplates";
import QuickActions from "./components/QuickActions";
import CreateWebsiteModal, {
  type WebsiteFormValues,
} from "@/features/websites/components/CreateWebsiteModal";
import type { Website } from "@/utils/websiteActions";
import {
  getDashboard,
  type DashboardPayload,
} from "@/services/dashboard";

const DashboardPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [dashboardData, setDashboardData] =
    useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    void fetchDashboard();
  }, []);

  const handleCreateWebsite = (data: WebsiteFormValues) => {
    const nextWebsite: Website = {
      id: Date.now(),
      name: data.name,
      domain: data.domain,
      owner: data.owner,
      template: data.template,
      status: data.status,
      plan: data.plan,
      visitors: Number(data.visitors) || 0,
      storage: data.storage || "0 GB",
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const existing = window.localStorage.getItem("dashboard-created-websites");
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(nextWebsite);
    window.localStorage.setItem("dashboard-created-websites", JSON.stringify(list));

    setOpenCreateModal(false);
    toast.success(`Website "${data.name}" created successfully`);
  };

  return (
    <div className="space-y-8">
      <WelcomeHero onCreateWebsite={() => setOpenCreateModal(true)} />

      <StatsCards
        stats={dashboardData?.stats}
        loading={loading}
      />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart
            revenue={dashboardData?.stats?.revenue}
            revenueSeries={dashboardData?.revenueSeries}
            loading={loading}
          />
        </div>

        <TrafficChart
          trafficSources={dashboardData?.trafficSources}
          loading={loading}
        />
      </div>




      <div className="grid gap-8 xl:grid-cols-2">
        <RecentUsers
          users={dashboardData?.recentUsers}
          loading={loading}
        />

        <SystemStatus
          systems={dashboardData?.systemStatus}
          loading={loading}
        />
      </div>
      <RecentOrders
        orders={dashboardData?.recentOrders}
        loading={loading}
      />
     

      <div className="grid gap-8 xl:grid-cols-2">
        <TopTemplates
          templates={dashboardData?.topTemplates}
          loading={loading}
        />

        <LatestActivity
          activity={dashboardData?.latestActivity}
          loading={loading}
        />
      </div>

<QuickActions onCreateWebsite={() => setOpenCreateModal(true)} />

      <CreateWebsiteModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        mode="create"
        onCreateWebsite={handleCreateWebsite}
      />
    </div>
  );
};

export default DashboardPage;