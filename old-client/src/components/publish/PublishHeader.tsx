import { motion } from "framer-motion";
import { FaGlobe, FaTimes, FaRocket } from "react-icons/fa";

interface PublishHeaderProps {
  templateName: string;
  onClose: () => void;
}

const PublishHeader = ({
  templateName,
  onClose,
}: PublishHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-t-3xl border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950"
    >
      {/* Background Blur */}

      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Close Button */}

      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-300 backdrop-blur transition hover:border-red-500 hover:bg-red-600 hover:text-white"
      >
        <FaTimes size={16} />
      </button>

      {/* Content */}

      <div className="relative z-10 flex flex-col gap-6 px-6 py-8 sm:px-8">
        {/* Icon */}

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
          <FaRocket className="text-2xl text-white" />
        </div>

        {/* Title */}

        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Publish Your Website
          </h2>

          <p className="mt-3 max-w-2xl text-slate-300">
            Launch your website instantly using the{" "}
            <span className="font-semibold text-white">
              {templateName}
            </span>{" "}
            template. You can use a free BuildHub subdomain or connect your own
            custom domain.
          </p>
        </div>

        {/* Template Card */}

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
              <FaGlobe className="text-xl text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                {templateName}
              </h3>

              <p className="text-sm text-slate-400">
                Ready to deploy with Admin Panel
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">
            Ready to Publish
          </span>
        </div>

        {/* Steps */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Step 1
            </p>

            <h4 className="mt-2 font-semibold text-white">
              Website Details
            </h4>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Step 2
            </p>

            <h4 className="mt-2 font-semibold text-white">
              Publish Website
            </h4>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Step 3
            </p>

            <h4 className="mt-2 font-semibold text-white">
              Go Live
            </h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PublishHeader;