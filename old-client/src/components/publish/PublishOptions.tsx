import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUserShield,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

interface PublishOptionsProps {
  createAdminPanel: boolean;
  setCreateAdminPanel: (value: boolean) => void;

  enableSSL: boolean;
  setEnableSSL: (value: boolean) => void;
}

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-14 rounded-full transition ${
        checked
          ? "bg-blue-600"
          : "bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-8" : "left-1"
        }`}
      />
    </button>
  );
};

const PublishOptions = ({
  createAdminPanel,
  setCreateAdminPanel,
  enableSSL,
  setEnableSSL,
}: PublishOptionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="text-2xl font-bold text-white">
        Publish Options
      </h2>

      <p className="mt-2 text-slate-400">
        Configure your website before publishing.
      </p>

      <div className="mt-8 space-y-5">

        {/* Admin Panel */}

        <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <FaUserShield className="text-white" />
            </div>

            <div>

              <h3 className="font-bold text-white">
                Create Admin Panel
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Generate a complete admin dashboard
                for managing products, orders,
                users and settings.
              </p>

            </div>

          </div>

          <Toggle
            checked={createAdminPanel}
            onChange={setCreateAdminPanel}
          />

        </div>

        {/* SSL */}

        <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
              <FaLock className="text-white" />
            </div>

            <div>

              <h3 className="font-bold text-white">
                Free SSL Certificate
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Secure your website with HTTPS.
                Recommended for every project.
              </p>

            </div>

          </div>

          <Toggle
            checked={enableSSL}
            onChange={setEnableSSL}
          />

        </div>

        {/* Security */}

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <div className="flex items-center gap-3">

            <FaShieldAlt className="text-blue-400 text-xl" />

            <h3 className="font-bold text-white">
              Included By Default
            </h3>

          </div>

          <div className="mt-5 space-y-3">

            {[
              "Automatic Deployment",
              "Responsive Website",
              "Fast Performance",
              "Basic SEO Ready",
              "Image Optimization",
              "Free Updates",
              "Daily Monitoring",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <FaCheckCircle className="text-green-500" />

                <span className="text-slate-300">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default PublishOptions;