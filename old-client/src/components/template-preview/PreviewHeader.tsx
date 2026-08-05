import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaHeart,
  FaShareAlt,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface PreviewHeaderProps {
  title: string;
  category: string;
  premium: boolean;
  rating: number;
  downloads: number;

  onUseTemplate?: () => void;
}

const PreviewHeader = ({
  title,
  category,
  premium,
  rating,
  downloads,
  onUseTemplate,
}: PreviewHeaderProps) => {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-start gap-4">

          <Link
            to="/templates"
            className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-blue-600"
          >
            <FaArrowLeft />
          </Link>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-3xl font-black text-white">
                {title}
              </h1>

              {premium && (
                <span className="flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-bold text-black">
                  <FaCrown />
                  Premium
                </span>
              )}

            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">

              <span className="rounded-full bg-slate-800 px-4 py-2 text-slate-300">
                {category}
              </span>

              <span className="flex items-center gap-2 text-yellow-400">
                <FaStar />
                {rating}
              </span>

              <span className="text-slate-400">
                {downloads.toLocaleString()} Downloads
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-4"
        >

          <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-white transition hover:border-red-500 hover:text-red-400">
            <FaHeart />
            Favorite
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-white transition hover:border-blue-500">
            <FaShareAlt />
            Share
          </button>

          <button
            onClick={onUseTemplate}
            className="rounded-xl bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Use Template
          </button>

        </motion.div>

      </div>
    </section>
  );
};

export default PreviewHeader;