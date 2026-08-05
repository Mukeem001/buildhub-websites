import { motion } from "framer-motion";
import {
  FaStar,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaCode,
  FaUserTie,
} from "react-icons/fa";

interface TemplateInfoProps {
  title: string;
  description: string;
  rating: number;
  downloads: number;
  version: string;
  author: string;
  updatedAt: string;
  technologies: string[];
  pages: string[];
  colors: string[];
  features: string[];
}

const TemplateInfo = ({
  title,
  description,
  rating,
  downloads,
  version,
  author,
  updatedAt,

  // ✅ SAFE DEFAULTS
  technologies = [],
  pages = [],
  colors = [],
  features = [],
}: TemplateInfoProps) => {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-5">

        <div className="grid gap-10 lg:grid-cols-3">

          {/* LEFT */}
          <div className="space-y-8 lg:col-span-2">

            {/* DESCRIPTION */}
            <motion.div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-3xl font-black text-white">
                {title}
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                {description}
              </p>
            </motion.div>

            {/* FEATURES */}
            <motion.div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="mb-8 text-2xl font-bold text-white">
                Features
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl bg-slate-800 p-4"
                  >
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* PAGES */}
            <motion.div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="mb-8 text-2xl font-bold text-white">
                Included Pages
              </h3>

              <div className="flex flex-wrap gap-3">
                {pages.map((page) => (
                  <span
                    key={page}
                    className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300"
                  >
                    {page}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* INFO */}
            <motion.div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="mb-8 text-2xl font-bold text-white">
                Information
              </h3>

              <div className="space-y-6">

                <InfoRow icon={<FaStar />} label="Rating" value={rating.toString()} />
                <InfoRow icon={<FaDownload />} label="Downloads" value={downloads.toLocaleString()} />
                <InfoRow icon={<FaCode />} label="Version" value={version} />
                <InfoRow icon={<FaUserTie />} label="Author" value={author} />
                <InfoRow icon={<FaClock />} label="Updated" value={updatedAt} />

              </div>
            </motion.div>

            {/* TECHNOLOGIES */}
            <motion.div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* COLORS */}
            <motion.div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Color Palette
              </h3>

              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                  <div key={color} className="text-center">
                    <div
                      className="h-14 w-14 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
    <div className="flex items-center gap-3 text-slate-300">
      {icon}
      {label}
    </div>
    <span className="font-semibold text-white">
      {value}
    </span>
  </div>
);

export default TemplateInfo;