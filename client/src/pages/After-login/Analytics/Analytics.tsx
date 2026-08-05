import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Clock3,
  Globe2,
  Monitor,
  MousePointerClick,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { fetchProjects } from "../../../services/project.service";
import { getWebsiteDashboard } from "../../../services/website.service";
import type { Project } from "../../../types/project";

type Range = "7 Days" | "30 Days" | "90 Days" | "1 Year";

const Analytics: React.FC = () => {
  const [range, setRange] = useState<Range>("30 Days");
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const siteId = searchParams.get("site") || undefined;

  const selectedProject = useMemo(() => {
    if (!projects.length) return null;
    if (siteId) {
      return projects.find((project) => project.id === siteId) || projects[0];
    }
    return projects[0];
  }, [projects, siteId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const data = await fetchProjects();
        setProjects(data);

        const project = siteId
          ? data.find((project) => project.id === siteId)
          : data[0];

        if (project) {
          const dashboardData = await getWebsiteDashboard(project.id);
          setDashboard(dashboardData);
        }
      } catch (error) {
        console.error("Unable to load analytics data", error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [siteId]);

  const selectedWebsiteName = selectedProject?.name || "your website";
  const totalVisitors = selectedProject?.visits || 0;
  const totalPages = dashboard?.pages?.length || 0;
  const publishedState = selectedProject?.status === "live" ? "Published" : "Draft";
  const companyName = dashboard?.settings?.companyName || selectedProject?.name || "Website";
  const formattedVisitors = totalVisitors >= 1000 ? `${(totalVisitors / 1000).toFixed(1)}K` : String(totalVisitors);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-[-100px] top-[35%] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <main className="relative w-full">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">

          {/* =================================================
              HEADER
          ================================================== */}

          <section className="mb-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                    <BarChart3 size={24} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      Insights
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                      Analytics
                    </h1>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Understand your audience, track traffic trends and
                  measure how your websites are performing.
                </p>
              </div>

              {/* Date Selector */}

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <select
                  value={range}
                  onChange={(e) =>
                    setRange(e.target.value as Range)
                  }
                  className="
                    h-11
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-900/80
                    pl-10
                    pr-10
                    text-sm
                    font-medium
                    text-slate-300
                    outline-none
                    transition
                    hover:border-slate-700
                    focus:border-blue-500/60
                    sm:w-40
                  "
                >
                  <option>7 Days</option>
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              OVERVIEW STATS
          ================================================== */}

          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <AnalyticsStat
              icon={<Users size={19} />}
              label="Total Visitors"
              value={formattedVisitors}
              change="+18.4%"
              positive
              description="Compared with previous period"
            />

            <AnalyticsStat
              icon={<MousePointerClick size={19} />}
              label="Pages"
              value={`${totalPages}`}
              change="+12%"
              positive
              description="Pages tracked in website dashboard"
            />

            <AnalyticsStat
              icon={<Clock3 size={19} />}
              label="Status"
              value={publishedState}
              change=""
              positive={publishedState === "Published"}
              description="Website publication state"
            />

            <AnalyticsStat
              icon={<TrendingUp size={19} />}
              label="Conversion Rate"
              value="6.84%"
              change="+1.6%"
              positive
              description="Visitors completing actions"
            />

          </section>

          {/* =================================================
              MAIN TRAFFIC CHART
          ================================================== */}

          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">

            {/* Traffic Chart */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">

              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <Activity
                      size={18}
                      className="text-blue-400"
                    />

                    <h2 className="text-lg font-bold sm:text-xl">
                      Traffic Overview
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Traffic and performance for {selectedWebsiteName}.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Visitors
                  </span>

                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Page Views
                  </span>
                </div>

              </div>

              {/* Chart */}

              <TrafficChart range={range} />

            </div>

            {/* Performance */}

            <PerformanceCard />

          </section>

          {/* =================================================
              TRAFFIC SOURCES + DEVICES
          ================================================== */}

          <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

            <TrafficSources />

            <DeviceBreakdown />

          </section>

          {/* =================================================
              TOP PAGES
          ================================================== */}

          <section className="mb-8">

            <div className="mb-5">
              <div className="flex items-center gap-2">
                <Globe2
                  size={18}
                  className="text-blue-400"
                />

                <h2 className="text-xl font-bold">
                  Top Performing Pages
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Pages receiving the most traffic during this period.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">

              {/* Desktop Header */}

              <div className="hidden border-b border-slate-800 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:grid sm:grid-cols-[1fr_140px_140px_120px]">
                <span>Page</span>
                <span>Views</span>
                <span>Visitors</span>
                <span>Growth</span>
              </div>

              <TopPage
                page="/"
                title="Homepage"
                views="8,942"
                visitors="4,820"
                growth="+22.4%"
              />

              <TopPage
                page="/about"
                title="About Us"
                views="4,286"
                visitors="2,146"
                growth="+14.8%"
              />

              <TopPage
                page="/services"
                title="Services"
                views="3,842"
                visitors="1,928"
                growth="+18.2%"
              />

              <TopPage
                page="/contact"
                title="Contact"
                views="2,916"
                visitors="1,582"
                growth="+9.6%"
              />

              <TopPage
                page="/pricing"
                title="Pricing"
                views="2,408"
                visitors="1,204"
                growth="+12.1%"
                last
              />

            </div>

          </section>

          {/* =================================================
              BOTTOM INSIGHT
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900/80 to-cyan-500/10 p-6 sm:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Zap
                    size={17}
                    className="text-cyan-400"
                  />

                  <span className="text-sm font-semibold text-blue-400">
                    Performance insight
                  </span>
                </div>

                <h3 className="text-xl font-bold sm:text-2xl">
                  Your audience is growing consistently.
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Visitor traffic increased by 18.4% compared with
                  the previous period. Keep publishing useful content
                  and optimizing your top pages.
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <TrendingUp size={25} />
              </div>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
};

/* =========================================================
   ANALYTICS STAT
========================================================= */

const AnalyticsStat = ({
  icon,
  label,
  value,
  change,
  positive,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  description: string;
}) => {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-slate-900">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </div>

        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {change}
        </span>

      </div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="mt-1 text-3xl font-bold tracking-tight">
        {value}
      </h3>

      <p className="mt-2 text-xs text-slate-600">
        {description}
      </p>

    </div>
  );
};

/* =========================================================
   TRAFFIC CHART
========================================================= */

const TrafficChart = ({
  range,
}: {
  range: Range;
}) => {

  const bars = [
    38,
    52,
    45,
    62,
    57,
    71,
    64,
    78,
    69,
    84,
    76,
    91,
    82,
    96,
  ];

  return (
    <div className="w-full">

      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold">
            28,942
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Total page views · {range}
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          +24.8%
        </span>
      </div>

      {/* Chart */}

      <div className="relative mt-8 h-64">

        {/* Horizontal lines */}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">

          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border-t border-slate-800/80"
            />
          ))}

        </div>

        {/* Bars */}

        <div className="absolute inset-0 flex items-end gap-2 px-1 sm:gap-3">

          {bars.map((height, index) => (
            <div
              key={index}
              className="group relative flex h-full flex-1 items-end"
            >

              <div
                className="
                  relative
                  w-full
                  rounded-t-lg
                  bg-gradient-to-t
                  from-blue-700/80
                  to-cyan-400
                  opacity-80
                  transition
                  duration-300
                  group-hover:opacity-100
                "
                style={{
                  height: `${height}%`,
                }}
              >

                {/* Hover indicator */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-0
                    hidden
                    -translate-x-1/2
                    -translate-y-10
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-950
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    text-white
                    shadow-xl
                    group-hover:block
                  "
                >
                  {Math.round(height * 120)}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Labels */}

      <div className="mt-3 flex justify-between text-[10px] text-slate-600 sm:text-xs">
        <span>Jun 01</span>
        <span>Jun 07</span>
        <span>Jun 14</span>
        <span>Jun 21</span>
        <span>Jun 30</span>
      </div>

    </div>
  );
};

/* =========================================================
   PERFORMANCE CARD
========================================================= */

const PerformanceCard = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap
              size={18}
              className="text-cyan-400"
            />

            <h2 className="text-lg font-bold">
              Site Performance
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Overall website health score.
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          Excellent
        </span>
      </div>

      {/* Score */}

      <div className="my-8 flex justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-slate-800">

          <div className="absolute inset-[-10px] rounded-full border-[10px] border-blue-500 border-b-transparent border-l-transparent rotate-[-40deg]" />

          <div className="text-center">
            <p className="text-4xl font-extrabold">
              94
            </p>

            <p className="text-xs text-slate-500">
              out of 100
            </p>
          </div>

        </div>
      </div>

      {/* Metrics */}

      <div className="space-y-4">

        <PerformanceRow
          label="Performance"
          value="96"
        />

        <PerformanceRow
          label="Accessibility"
          value="92"
        />

        <PerformanceRow
          label="SEO"
          value="95"
        />

        <PerformanceRow
          label="Best Practices"
          value="94"
        />

      </div>

    </div>
  );
};

/* =========================================================
   PERFORMANCE ROW
========================================================= */

const PerformanceRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>

      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {label}
        </span>

        <span className="font-semibold text-white">
          {value}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
          style={{
            width: `${value}%`,
          }}
        />
      </div>

    </div>
  );
};

/* =========================================================
   TRAFFIC SOURCES
========================================================= */

const TrafficSources = () => {
  const sources = [
    {
      name: "Direct",
      value: "42.8%",
      width: "43%",
    },
    {
      name: "Google Search",
      value: "28.4%",
      width: "28%",
    },
    {
      name: "Social Media",
      value: "16.7%",
      width: "17%",
    },
    {
      name: "Referral",
      value: "8.9%",
      width: "9%",
    },
    {
      name: "Other",
      value: "3.2%",
      width: "3%",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Globe2
            size={18}
            className="text-blue-400"
          />

          <h2 className="text-lg font-bold">
            Traffic Sources
          </h2>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Where your visitors are coming from.
        </p>
      </div>

      <div className="space-y-5">

        {sources.map((source) => (
          <div key={source.name}>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                {source.name}
              </span>

              <span className="text-sm font-semibold text-white">
                {source.value}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                style={{
                  width: source.width,
                }}
              />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

/* =========================================================
   DEVICE BREAKDOWN
========================================================= */

const DeviceBreakdown = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Monitor
            size={18}
            className="text-blue-400"
          />

          <h2 className="text-lg font-bold">
            Devices
          </h2>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Devices visitors use to access your websites.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">

        <DeviceCard
          icon={<Monitor size={20} />}
          name="Desktop"
          percentage="54%"
        />

        <DeviceCard
          icon={<Smartphone size={20} />}
          name="Mobile"
          percentage="38%"
        />

        <DeviceCard
          icon={<Tablet size={20} />}
          name="Tablet"
          percentage="8%"
        />

      </div>

      {/* Device visual */}

      <div className="mt-7 flex h-3 overflow-hidden rounded-full bg-slate-800">

        <div
          className="bg-blue-600"
          style={{ width: "54%" }}
        />

        <div
          className="bg-cyan-400"
          style={{ width: "38%" }}
        />

        <div
          className="bg-slate-500"
          style={{ width: "8%" }}
        />

      </div>

      <div className="mt-3 flex justify-between text-[11px] text-slate-500">
        <span>Desktop 54%</span>
        <span>Mobile 38%</span>
        <span>Tablet 8%</span>
      </div>

    </div>
  );
};

/* =========================================================
   DEVICE CARD
========================================================= */

const DeviceCard = ({
  icon,
  name,
  percentage,
}: {
  icon: React.ReactNode;
  name: string;
  percentage: string;
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-center transition hover:border-blue-500/30">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {name}
      </p>

      <p className="mt-1 text-lg font-bold">
        {percentage}
      </p>

    </div>
  );
};

/* =========================================================
   TOP PAGE
========================================================= */

const TopPage = ({
  page,
  title,
  views,
  visitors,
  growth,
  last = false,
}: {
  page: string;
  title: string;
  views: string;
  visitors: string;
  growth: string;
  last?: boolean;
}) => {
  return (
    <div
      className={`
        px-5
        py-4
        transition
        hover:bg-slate-800/30
        sm:grid
        sm:grid-cols-[1fr_140px_140px_120px]
        sm:items-center
        sm:gap-0
        ${!last ? "border-b border-slate-800" : ""}
      `}
    >

      {/* Page */}

      <div>
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-600">
          {page}
        </p>
      </div>

      {/* Mobile separator data */}

      <div className="mt-3 grid grid-cols-3 gap-3 sm:mt-0 sm:block">

        <div>
          <p className="text-[10px] uppercase text-slate-600 sm:hidden">
            Views
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300 sm:mt-0">
            {views}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase text-slate-600 sm:hidden">
            Visitors
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300 sm:mt-0">
            {visitors}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase text-slate-600 sm:hidden">
            Growth
          </p>

          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 sm:mt-0">
            <ArrowUpRight size={13} />
            {growth}
          </span>
        </div>

      </div>

      {/* Desktop values */}

      <span className="hidden text-sm font-medium text-slate-300 sm:block">
        {views}
      </span>

      <span className="hidden text-sm font-medium text-slate-300 sm:block">
        {visitors}
      </span>

      <span className="hidden items-center gap-1 text-xs font-semibold text-emerald-400 sm:flex">
        <ArrowUpRight size={13} />
        {growth}
      </span>

    </div>
  );
};

export default Analytics;