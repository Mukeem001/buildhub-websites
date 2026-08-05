import { motion } from "framer-motion";
import {
  FaGlobe,
  FaExternalLinkAlt,
  FaCog,
  FaTrash,
  FaEdit,
  FaEye,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard = ({
  project,
  onDelete,
}: ProjectCardProps) => {
  const isLive = project.status === "live";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
    >
      {/* ================= Image ================= */}

      <div className="relative">

        <img
          src={project.image}
          alt={project.name}
          className="h-56 w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-5 top-5">

          {isLive ? (
            <span className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
              <FaCheckCircle />
              Live
            </span>
          ) : (
            <span className="flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
              <FaClock />
              Building
            </span>
          )}

        </div>

      </div>

      {/* ================= Content ================= */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-white">
          {project.name}
        </h2>

        <p className="mt-2 text-slate-400">
          {project.templateName}
        </p>

        {/* URL */}

        <div className="mt-6 rounded-2xl bg-slate-800 p-4">

          <p className="text-sm text-slate-500">
            Website URL
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">

            <span className="truncate text-sm text-blue-400">
              {project.url}
            </span>

            <button
              onClick={() =>
                window.open(project.url, "_blank")
              }
              className="text-blue-400 transition hover:text-blue-300"
            >
              <FaExternalLinkAlt />
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-slate-800 p-4 text-center">

            <FaEye className="mx-auto mb-2 text-xl text-blue-400" />

            <h3 className="text-xl font-bold text-white">
              {project.visits}
            </h3>

            <p className="text-sm text-slate-400">
              Visits
            </p>

          </div>

          <div className="rounded-2xl bg-slate-800 p-4 text-center">

            <FaShoppingCart className="mx-auto mb-2 text-xl text-green-400" />

            <h3 className="text-xl font-bold text-white">
              {project.orders}
            </h3>

            <p className="text-sm text-slate-400">
              Orders
            </p>

          </div>

        </div>

        {/* Domain */}

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-800 p-4">

          <FaGlobe className="text-blue-400" />

          <div>

            <p className="text-sm text-slate-500">
              Domain
            </p>

            <h4 className="text-white">

              {project.domain
                ? project.domain
                : "buildhub.app"}

            </h4>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-8 grid grid-cols-2 gap-3">

          <button
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaCog />
            Admin
          </button>

          <button
            onClick={() =>
              window.open(project.url, "_blank")
            }
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 py-3 font-semibold text-white transition hover:border-blue-500"
          >
            <FaExternalLinkAlt />
            Visit
          </button>

          <button
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 py-3 font-semibold text-white transition hover:border-yellow-500"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(project.id)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-red-500 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </div>

    </motion.div>
  );
};

export default ProjectCard;