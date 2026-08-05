import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaEye,
  FaHeart,
  FaStar,
  FaCrown,
} from "react-icons/fa";

export interface TemplateCardProps {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  premium: boolean;
  rating: number;
  downloads: number;

  onFavorite?: () => void;
  onPreview?: () => void;
  onUse?: () => void;
}

const TemplateCard = ({
  title,
  category,
  image,
  premium,
  rating,
  downloads,
  onFavorite,
  onPreview,
  onUse,
}: TemplateCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
    >
      {/* ================= Image ================= */}

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* Favorite */}

        <button
          onClick={onFavorite}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-red-500"
        >
          <FaHeart />
        </button>

        {/* Premium */}

        {premium && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
            <FaCrown />
            Premium
          </div>
        )}

        {/* Hover Buttons */}

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3 opacity-0 transition duration-300 group-hover:opacity-100">

          <button
            onClick={onPreview}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-105"
          >
            <FaEye />
            Preview
          </button>

          <button
            onClick={onUse}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Use
            <FaArrowRight />
          </button>

        </div>

      </div>

      {/* ================= Content ================= */}

      <div className="p-6">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {category}
          </span>

          <div className="flex items-center gap-2 text-yellow-400">
            <FaStar />
            <span className="text-sm font-semibold text-white">
              {rating}
            </span>
          </div>

        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          Modern responsive template with admin panel,
          SEO optimization, analytics dashboard,
          custom domain support and blazing fast performance.
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Downloads
            </p>

            <h3 className="text-lg font-bold text-white">
              {downloads.toLocaleString()}
            </h3>

          </div>

          <button
            onClick={onUse}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Use Template
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default TemplateCard;