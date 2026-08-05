import { motion } from "framer-motion";
import {
  FaGlobe,
  FaPlus,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import type { Project } from "../../types/project";

interface DashboardHeaderProps {
  projects: Project[];
}

const DashboardHeader = ({ projects }: DashboardHeaderProps) => {
  const liveCount = projects.filter((project) => project.status === "live").length;
  const buildingCount = projects.filter((project) => project.status === "building").length;
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
              <FaGlobe />
            </div>

            <div>

              <h1 className="text-4xl font-black text-white">
                My Projects
              </h1>

              <p className="mt-1 text-slate-400">
                Manage all your published websites from one place.
              </p>

            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3">
              <p className="text-sm text-slate-400">
                Total Websites
              </p>

              <h3 className="mt-1 text-2xl font-bold text-white">
                {projects.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3">
              <p className="text-sm text-slate-400">
                Live Websites
              </p>

              <h3 className="mt-1 text-2xl font-bold text-green-400">
                {liveCount}
              </h3>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3">
              <p className="text-sm text-slate-400">
                Building
              </p>

              <h3 className="mt-1 text-2xl font-bold text-yellow-400">
                {buildingCount}
              </h3>
            </div>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap gap-4"
        >

          <Link
            to="/templates"
            className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 font-semibold text-white transition hover:border-blue-500"
          >
            <FaPlus />
            New Website
          </Link>

          <button
            className="flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700"
          >
            <FaRocket />
            Upgrade Plan
          </button>

        </motion.div>

      </div>
    </section>
  );
};

export default DashboardHeader;