import { useState } from "react";

import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsStats from "./components/AnalyticsStats";
import RevenueChart from "./components/RevenueChart";
import UserGrowthChart from "./components/UserGrowthChart";
import VisitorsChart from "./components/VisitorsChart";
import DeviceChart from "./components/DeviceChart";
import TrafficSources from "./components/TrafficSources";
import TopWebsitesTable from "./components/TopWebsitesTable";

import { exportAnalyticsCSV } from "@/utils/export";

const AnalyticsPage = () => {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("30days");

  const handleExport = () => {
    exportAnalyticsCSV();
  };

  const handleRefresh = () => {
    console.log("Refreshing analytics...");
  };

  return (
    <div className="space-y-8">

      <AnalyticsHeader
        search={search}
        period={period}
        onSearchChange={setSearch}
        onPeriodChange={setPeriod}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />

      <AnalyticsStats />

      {/* Charts Row 1 */}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      {/* Charts Row 2 */}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <VisitorsChart />
        <DeviceChart />
      </div>

      {/* Charts Row 3 */}

      <TrafficSources />

      {/* Table */}

      <TopWebsitesTable
        onView={(id) => console.log("View:", id)}
        onEdit={(id) => console.log("Edit:", id)}
        onDelete={(id) => console.log("Delete:", id)}
      />

    </div>
  );
};

export default AnalyticsPage;