import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe2,
  MoreHorizontal,
  Search,
  Settings2,
  Users,
} from "lucide-react";

import { fetchProjects } from "../../../services/project.service";
import type { Project } from "../../../types/project";

type WebsiteStatus = "Live" | "Building" | "Draft";

// will be populated from API
const initialProjects: Project[] = [];

interface Website {
  id: number;
  name: string;
  slug?: string;
  category?: string;
  status: WebsiteStatus;
  url?: string;
  updated?: string;
  visitors?: string;
  performance?: number;
  image?: string;
  description?: string;
}

const Websites: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | WebsiteStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const itemsPerPage = 6;

  const filteredWebsites = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return projects.filter((website) => {
      const matchesSearch =
        website.name.toLowerCase().includes(searchValue) ||
        (website.templateName || "").toLowerCase().includes(searchValue) ||
        (website.url || "").toLowerCase().includes(searchValue);

      const statusLabel = website.status === "live" ? "Live" : website.status === "building" ? "Building" : "Draft";

      const matchesFilter = filter === "All" || statusLabel === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, projects]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: "All" | WebsiteStatus) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const liveCount = projects.filter((p) => p.status === "live").length;
  const buildingCount = projects.filter((p) => p.status !== "live").length;
  const pagedWebsites = filteredWebsites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredWebsites.length / itemsPerPage));

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[18%] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-[-100px] top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-180px] left-[40%] h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <main className="relative w-full">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* =========================
              HEADER
          ========================= */}
          <section className="mb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20">
                    <Globe2 size={23} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      Website Manager
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                      My Websites
                    </h1>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Manage your published websites, monitor their activity and
                  keep everything under control from one place.
                </p>
              </div>

              {/* SMALL SUMMARY */}
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />

                    <span className="text-sm font-semibold">
                      {liveCount} Live
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={16}
                      className="text-amber-400"
                    />

                    <span className="text-sm font-semibold">
                      {buildingCount} Building
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================
              MANAGEMENT BAR
          ========================= */}
          <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Published Websites
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredWebsites.length} websites available in your
                  workspace
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                {/* SEARCH */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search websites..."
                    className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 sm:w-64"
                  />
                </div>

                {/* FILTER */}
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) =>
                      handleFilter(
                        e.target.value as "All" | WebsiteStatus
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 pr-10 text-sm text-slate-300 outline-none focus:border-blue-500/60 sm:w-40"
                  >
                    <option value="All">All Websites</option>
                    <option value="Live">Live</option>
                    <option value="Building">Building</option>
                    <option value="Draft">Draft</option>
                  </select>

                  <ChevronRight
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =========================
              WEBSITE LIST
          ========================= */}
          <section>
            <div className="space-y-5">
              {loading ? (
                <div className="text-white text-center">Loading...</div>
              ) : filteredWebsites.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-20 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
                    <Search
                      size={24}
                      className="text-slate-500"
                    />
                  </div>

                  <h3 className="text-lg font-bold">No websites found</h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    We couldn't find any website matching your search or selected status.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setFilter("All");
                    }}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                pagedWebsites.map((website) => (
                  <WebsiteCard
                    key={website.id}
                    website={{
                      id: Number(website.id),
                      name: website.name,
                      category: website.templateName || "",
                      status: website.status === "live" ? "Live" : website.status === "building" ? "Building" : "Draft",
                      url: website.url,
                      updated: website.createdAt || "",
                      visitors: String(website.visits || 0),
                      performance: 90,
                      image: website.image || "",
                      description: website.templateName || "",
                    }}
                  />
                ))
              )}
            </div>
          </section>

          {/* =========================
              PAGINATION
          ========================= */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* =========================
              BOTTOM INFO
          ========================= */}
          <section className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-blue-950/20 to-cyan-950/20 p-5 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Activity
                    size={17}
                    className="text-blue-400"
                  />

                  <span className="text-sm font-semibold text-blue-400">
                    Website health
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                  Your websites are being monitored for performance and
                  availability.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                All systems operational
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   WEBSITE CARD
========================================================= */

const WebsiteCard = ({
  website,
}: {
  website: Website;
}) => {
  const navigate = useNavigate();

  const openWebsite = (url?: string) => {
    if (!url) return;
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      window.location.href = url;
    }
  };

  const handleManage = () => {
    navigate(`/settings?site=${website.id}&slug=${encodeURIComponent(website.slug || "")}`);
  };

  const handleAnalytics = () => {
    navigate(`/analytics?site=${website.id}&slug=${encodeURIComponent(website.slug || "")}`);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/10 transition duration-300 hover:border-blue-500/30 hover:bg-slate-900/80 hover:shadow-blue-950/20">
      <div className="flex flex-col lg:flex-row">
        {/* =========================
            IMAGE
        ========================= */}
        <div className="relative h-56 shrink-0 overflow-hidden sm:h-64 lg:h-auto lg:w-[340px] xl:w-[390px]">
          <img
            src={website.image}
            alt={website.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Status */}
          <StatusBadge status={website.status} />

          {/* Website preview label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
            <Globe2 size={14} />
            Website Preview
          </div>

          {/* More */}
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          {/* Top */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-500/10 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  {website.category}
                </span>

                <StatusText status={website.status} />
              </div>

              <h2 className="truncate text-2xl font-bold tracking-tight text-white">
                {website.name}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {website.description}
              </p>
            </div>

            {/* Performance */}
            <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/50 p-3 sm:min-w-[125px]">
              <div className="flex items-center justify-between gap-5">
                <span className="text-[11px] uppercase tracking-wider text-slate-600">
                  Performance
                </span>

                <BarChart3
                  size={15}
                  className="text-blue-400"
                />
              </div>

              <div className="mt-1 text-xl font-bold">
                {website.performance}%
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  style={{
                    width: `${website.performance}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* =========================
              WEBSITE META
          ========================= */}
          <div className="mt-6 grid grid-cols-1 gap-3 border-y border-slate-800 py-4 sm:grid-cols-3">
            {/* URL */}
            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Website URL
              </p>

              <div className="flex items-center gap-2">
                <Globe2
                  size={14}
                  className="shrink-0 text-slate-500"
                />

                <span className="truncate text-xs font-medium text-slate-400">
                  {website.url}
                </span>
              </div>
            </div>

            {/* VISITORS */}
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Visitors
              </p>

              <div className="flex items-center gap-2">
                <Users
                  size={14}
                  className="text-slate-500"
                />

                <span className="text-xs font-medium text-slate-400">
                  {website.visitors}
                </span>
              </div>
            </div>

            {/* UPDATED */}
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Last Updated
              </p>

              <div className="flex items-center gap-2">
                <Clock3
                  size={14}
                  className="text-slate-500"
                />

                <span className="text-xs font-medium text-slate-400">
                  {website.updated}
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              ACTIONS
          ========================= */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button onClick={handleAnalytics} className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-slate-800 hover:text-white">
              <BarChart3 size={16} />
              Analytics
            </button>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button onClick={handleManage} className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:text-white">
                <Settings2 size={16} />
                Manage
              </button>

              <button onClick={() => openWebsite(website.url)} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
                Open Website
                <ExternalLink size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}: {
  status: WebsiteStatus;
}) => {
  const styles = {
    Live: "bg-emerald-500 text-white",
    Building: "bg-amber-500 text-white",
    Draft: "bg-slate-700 text-slate-200",
  };

  return (
    <span
      className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-lg backdrop-blur-sm ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

/* =========================================================
   STATUS TEXT
========================================================= */

const StatusText = ({
  status,
}: {
  status: WebsiteStatus;
}) => {
  const styles = {
    Live: "text-emerald-400",
    Building: "text-amber-400",
    Draft: "text-slate-400",
  };

  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

/* =========================================================
   PAGINATION
========================================================= */

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {/* PREVIOUS */}
      <button
        onClick={() =>
          onPageChange(Math.max(1, currentPage - 1))
        }
        disabled={currentPage === 1}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          currentPage === 1
            ? "cursor-not-allowed border-slate-800 bg-slate-900 text-slate-700"
            : "border-slate-800 bg-slate-900 text-slate-400 hover:border-blue-500/40 hover:bg-slate-800 hover:text-white"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {/* PAGE NUMBERS */}
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => {
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-11 min-w-[42px] items-center justify-center rounded-xl border px-3 text-sm font-semibold transition ${
              isActive
                ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "border-transparent bg-slate-900 text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* NEXT */}
      <button
        onClick={() =>
          onPageChange(
            Math.min(totalPages, currentPage + 1)
          )
        }
        disabled={currentPage === totalPages}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          currentPage === totalPages
            ? "cursor-not-allowed border-slate-800 bg-slate-900 text-slate-700"
            : "border-slate-800 bg-slate-900 text-slate-400 hover:border-blue-500/40 hover:bg-slate-800 hover:text-white"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Websites;