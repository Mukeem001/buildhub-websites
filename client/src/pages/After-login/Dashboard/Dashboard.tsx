import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe2,
  Heart,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { fetchProjects } from "../../../services/project.service";
import type { Project } from "../../../types/project";

type ProjectStatus = "Live" | "Building" | "Draft";

// local UI shape
interface UIProject {
  id: number;
  name: string;
  category?: string;
  status: ProjectStatus;
  url?: string;
  updated: string;
  visitors?: string;
  image?: string;
}

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | ProjectStatus>("All");
  const [showCreate, setShowCreate] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Same style as Template page
  const totalPages = 12;

  const filteredProjects = useMemo(() => {
    const uiProjects: UIProject[] = projects.map((p) => ({
      id: Number(p.id),
      name: p.name,
      category: p.templateName || "",
      status: p.status === "live" ? "Live" : p.status === "building" ? "Building" : "Draft",
      url: p.url,
      updated: p.createdAt || "",
      visitors: String(p.visits || 0),
      image: p.image || "",
    }));

    const q = search.toLowerCase().trim();

    return uiProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(q) ||
        (project.category || "").toLowerCase().includes(q) ||
        (project.url || "").toLowerCase().includes(q);

      const matchesFilter = filter === "All" || project.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, projects]);

  const totalWebsites = projects.length;
  const liveWebsites = projects.filter((p) => p.status === "live").length;
  const buildingWebsites = projects.filter((p) => p.status !== "live").length;
  const totalVisitors = projects.reduce((sum, p) => sum + (p.visits || 0), 0);

  const formatVisitors = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  };


  /*
   * Search/filter change hone par page 1 par wapas.
   */
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <main className="w-full">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[25%] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />

          <div className="absolute right-[-120px] top-[35%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* HEADER */}
          <section className="mb-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                    <Globe2 size={24} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      Workspace
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                      My Projects
                    </h1>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Manage your websites, monitor performance and keep all your
                  projects in one place.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setShowCreate(true)}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
                >
                  <Plus size={18} />

                  New Website

                  <ArrowUpRight
                    size={16}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500/50 hover:bg-slate-800">
                  <Sparkles size={17} className="text-blue-400" />
                  Upgrade Plan
                </button>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Globe2 size={19} />}
              label="Total Websites"
              value={String(totalWebsites)}
              description="All projects"
              trend="+2 this month"
            />

            <StatCard
              icon={<CheckCircle2 size={19} />}
              label="Live Websites"
              value={String(liveWebsites)}
              description="Currently published"
              trend="+1 this month"
            />

            <StatCard
              icon={<Clock3 size={19} />}
              label="Building"
              value={String(buildingWebsites)}
              description="In progress"
              trend="Keep going"
            />

            <StatCard
              icon={<TrendingUp size={19} />}
              label="Total Visitors"
              value={formatVisitors(totalVisitors)}
              description="Across your websites"
              trend="+18.4%"
            />
          </section>

          {/* QUICK INSIGHTS */}
          <section className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <InsightCard
              icon={<BarChart3 size={20} />}
              title="Website Performance"
              value="94%"
              subtitle="Overall performance score"
              progress={94}
            />

            <InsightCard
              icon={<Activity size={20} />}
              title="Recent Activity"
              value="12"
              subtitle="Actions completed this week"
              progress={72}
            />

            <InsightCard
              icon={<Users size={20} />}
              title="Audience Growth"
              value="+18.4%"
              subtitle="Compared with last month"
              progress={82}
            />
          </section>

          {/* PROJECTS HEADER */}
          <section>
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Your Websites
                  </h2>

                  <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-400">
                    {filteredProjects.length} Projects
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Manage and monitor all your published websites.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search websites..."
                    className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/70 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 sm:w-64"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) =>
                      setFilter(e.target.value as "All" | ProjectStatus)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/70 px-4 pr-10 text-sm text-slate-300 outline-none focus:border-blue-500/60 sm:w-36"
                  >
                    <option value="All">All Status</option>
                    <option value="Live">Live</option>
                    <option value="Building">Building</option>
                    <option value="Draft">Draft</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* PROJECT CARDS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {loading ? (
                <div className="text-white">Loading projects...</div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project as any} />
                ))
              )}
            </div>

            {/* EMPTY STATE */}
            {filteredProjects.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
                  <Search
                    size={22}
                    className="text-slate-500"
                  />
                </div>

                <h3 className="text-lg font-semibold">
                  No websites found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filter.
                </p>
              </div>
            )}

            {/* =========================
                PAGINATION
            ========================= */}

            <div className="mt-12 flex items-center justify-center gap-2">
              {/* PREVIOUS */}
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                  currentPage === 1
                    ? "cursor-not-allowed border-slate-800 bg-slate-800 text-slate-600"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:border-blue-500/40 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <ChevronLeft size={20} />
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
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`hidden h-12 min-w-12 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition sm:flex ${
                      isActive
                        ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "border-transparent bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* MOBILE CURRENT PAGE */}
              <div className="flex h-12 min-w-12 items-center justify-center rounded-xl border border-blue-500 bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 sm:hidden">
                {currentPage}
              </div>

              {/* NEXT */}
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                  currentPage === totalPages
                    ? "cursor-not-allowed border-slate-800 bg-slate-800 text-slate-600"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-blue-500/40 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </section>

          {/* BOTTOM CTA */}
          <section className="mt-10 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900/80 to-cyan-500/10 p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles
                    size={18}
                    className="text-blue-400"
                  />

                  <span className="text-sm font-semibold text-blue-400">
                    Build something amazing
                  </span>
                </div>

                <h3 className="text-xl font-bold sm:text-2xl">
                  Ready to launch your next website?
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Choose a professional template and customize it in minutes.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(true)}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
              >
                <Plus size={18} />
                Create Website
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* CREATE WEBSITE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0b1224] p-6 shadow-2xl shadow-black/50">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Create New Website
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Start with a template and make it yours.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                "Start from Template",
                "Build from Scratch",
              ].map((option, index) => (
                <button
                  key={option}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-blue-500/50 hover:bg-blue-500/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      {index === 0 ? (
                        <Sparkles size={18} />
                      ) : (
                        <Settings2 size={18} />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {option}
                      </p>

                      <p className="text-xs text-slate-500">
                        {index === 0
                          ? "Choose from premium templates"
                          : "Create your website manually"}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-slate-600"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================
   STAT CARD
========================= */

const StatCard = ({
  icon,
  label,
  value,
  description,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  trend: string;
}) => {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-slate-900">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </div>

        <span className="text-xs font-medium text-emerald-400">
          {trend}
        </span>
      </div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <h3 className="text-3xl font-bold tracking-tight">
          {value}
        </h3>
      </div>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>
    </div>
  );
};

/* =========================
   INSIGHT CARD
========================= */

const InsightCard = ({
  icon,
  title,
  value,
  subtitle,
  progress,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  progress: number;
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
            {icon}
          </div>

          <span className="text-sm font-medium text-slate-400">
            {title}
          </span>
        </div>

        <ArrowUpRight
          size={16}
          className="text-emerald-400"
        />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {subtitle}
          </p>
        </div>

        <span className="text-xs font-semibold text-blue-400">
          {progress}%
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

/* =========================
   PROJECT CARD
========================= */

const ProjectCard = ({
  project,
}: {
  project: UIProject;
}) => {
  const navigate = useNavigate();

  const openWebsite = (url?: string) => {
    if (!url) return;
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      // fallback
      window.location.href = url;
    }
  };

  const handleManage = () => {
    // navigate to websites page with site query param
    navigate(`/websites?site=${project.id}`);
  };

  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-slate-800 bg-[#0f172a] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-950/20">
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-black/5 to-transparent" />

        {/* Status */}
        <StatusBadge status={project.status} />

        {/* Favorite */}
        <button
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/70"
          aria-label="Favorite website"
        >
          <Heart
            size={19}
            fill="currentColor"
          />
        </button>

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-4 flex translate-y-3 items-center justify-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={() => openWebsite(project.url)} className="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur transition hover:bg-white">
            <ExternalLink size={15} />
            Open
          </button>

          <button onClick={handleManage} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500">
            Manage
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* Category + status */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-blue-300">
            {project.category}
          </span>

          <StatusText status={project.status} />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold tracking-tight text-white">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
          {project.category} website with a modern responsive design,
          professional layout and powerful website management tools.
        </p>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-800 pt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Globe2 size={14} />
            {project.url}
          </span>

          <span className="flex items-center gap-1.5">
            <Users size={14} />
            {project.visitors} visitors
          </span>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-600">
              Last Updated
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400">
                  {project.updated.replace(
                    "Updated ",
                    ""
                  )}
            </p>
          </div>

          <button onClick={() => openWebsite(project.url)} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
            Open Website
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* More */}
        <button
          className="absolute hidden"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </article>
  );
};

/* =========================
   STATUS BADGE
========================= */

const StatusBadge = ({
  status,
}: {
  status: ProjectStatus;
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

/* =========================
   STATUS TEXT
========================= */

const StatusText = ({
  status,
}: {
  status: ProjectStatus;
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

export default Dashboard;