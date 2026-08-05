import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaGlobe,
  FaUserShield,
  FaCopy,
  FaExternalLinkAlt,
  FaRocket,
} from "react-icons/fa";

interface PublishSuccessProps {
  websiteUrl: string;
  adminUrl: string;

  onClose: () => void;
}

const PublishSuccess = ({
  websiteUrl,
  adminUrl,
  onClose,
}: PublishSuccessProps) => {
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
    >
      {/* Success */}

      <div className="text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-600">

          <FaCheckCircle className="text-5xl text-white" />

        </div>

        <h2 className="mt-6 text-4xl font-black text-white">
          Website Published
        </h2>

        <p className="mt-3 text-slate-400">
          Congratulations 🎉
          <br />
          Your website is now live.
        </p>

      </div>

      {/* Website URL */}

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-5">

        <div className="flex items-center gap-3">

          <FaGlobe className="text-blue-500" />

          <h3 className="font-bold text-white">
            Website URL
          </h3>

        </div>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row">

          <input
            readOnly
            value={websiteUrl}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
          />

          <button
            onClick={() => copy(websiteUrl)}
            className="rounded-xl bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            <FaCopy />
          </button>

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            <FaExternalLinkAlt />
          </a>

        </div>

      </div>

      {/* Admin */}

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">

        <div className="flex items-center gap-3">

          <FaUserShield className="text-green-500" />

          <h3 className="font-bold text-white">
            Admin Panel
          </h3>

        </div>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row">

          <input
            readOnly
            value={adminUrl}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
          />

          <button
            onClick={() => copy(adminUrl)}
            className="rounded-xl bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            <FaCopy />
          </button>

          <a
            href={adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
          >
            <FaExternalLinkAlt />
          </a>

        </div>

      </div>

      {/* Info */}

      <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

        <div className="flex items-start gap-4">

          <div className="mt-1">

            <FaRocket className="text-blue-400" />

          </div>

          <div>

            <h3 className="font-bold text-white">
              What's Next?
            </h3>

            <ul className="mt-3 space-y-2 text-slate-300">

              <li>
                • Open your Admin Panel
              </li>

              <li>
                • Upload your logo
              </li>

              <li>
                • Add products or services
              </li>

              <li>
                • Connect payment gateway
              </li>

              <li>
                • Publish your content
              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-2xl bg-blue-600 py-4 text-center font-bold text-white transition hover:bg-blue-700"
        >
          Visit Website
        </a>

        <a
          href={adminUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-2xl bg-green-600 py-4 text-center font-bold text-white transition hover:bg-green-700"
        >
          Open Admin Panel
        </a>

      </div>

      <button
        onClick={onClose}
        className="mt-5 w-full rounded-2xl border border-slate-700 py-4 font-semibold text-white transition hover:border-slate-500"
      >
        Close
      </button>

    </motion.div>
  );
};

export default PublishSuccess;