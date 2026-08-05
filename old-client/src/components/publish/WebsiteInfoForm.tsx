import type { ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import type { DomainType } from "../../types/publish";

interface WebsiteInfoFormProps {
  websiteName: string;
  setWebsiteName: (value: string) => void;
  domainType: DomainType;
}

const WebsiteInfoForm = ({
  websiteName,
  setWebsiteName,
  domainType,
}: WebsiteInfoFormProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/\s+/g, "-");

    setWebsiteName(value);
  };

  const isValid =
    websiteName.length >= 3 &&
    websiteName.length <= 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="text-2xl font-bold text-white">
        Website Information
      </h2>

      <p className="mt-2 text-slate-400">
        {domainType === "subdomain"
          ? "Enter your website name. We'll generate a BuildHub subdomain automatically."
          : "Enter your website name. This will be used as your project title while your custom domain is connected."}
      </p>

      {/* Website Name */}

      <div className="mt-8">

        <label className="mb-2 block font-medium text-white">
          Website Name
        </label>

        <input
          value={websiteName}
          onChange={handleChange}
          placeholder="my-awesome-store"
          maxLength={30}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-blue-500"
        />

        <div className="mt-3 flex items-center justify-between">

          <span className="text-sm text-slate-500">
            Use only letters, numbers & "-"
          </span>

          <span className="text-sm text-slate-500">
            {websiteName.length}/30
          </span>

        </div>

      </div>

      {domainType === "subdomain" ? (
        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <FaGlobe className="text-white" />
            </div>

            <div>

              <p className="text-sm text-slate-400">
                Your Website URL
              </p>

              <h3 className="break-all text-lg font-bold text-white">

                {websiteName || "your-name"}
                .buildhub.com

              </h3>

            </div>

          </div>

        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Custom domain selected. Connect your domain details below and click Connect Domain.
          </p>
        </div>
      )}

      {/* Validation */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">

        <h3 className="mb-5 font-bold text-white">
          Validation
        </h3>

        <div className="space-y-4">

          <div className="flex items-center gap-3">

            {websiteName.length >= 3 ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}

            <span className="text-slate-300">
              Minimum 3 characters
            </span>

          </div>

          <div className="flex items-center gap-3">

            {websiteName.length <= 30 &&
            websiteName.length > 0 ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}

            <span className="text-slate-300">
              Maximum 30 characters
            </span>

          </div>

          <div className="flex items-center gap-3">

            {isValid ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}

            <span className="text-slate-300">
              Ready for publishing
            </span>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default WebsiteInfoForm;