import { motion } from "framer-motion";
import {
  FaRocket,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";

interface PublishFooterProps {
  websiteName: string;

  domainType: "subdomain" | "custom";

  customDomain: string;

  customDomainConnected?: boolean;

  customDomainVerified?: boolean;

  loading?: boolean;

  onCancel: () => void;

  onConnectDomain?: () => void;

  onVerifyDomain?: () => void;

  onPublish: () => void;
}

const PublishFooter = ({
  websiteName,
  domainType,
  customDomain,
  customDomainConnected = false,
  customDomainVerified = false,
  loading = false,
  onCancel,
  onConnectDomain,
  onVerifyDomain,
  onPublish,
}: PublishFooterProps) => {
  const domainRegex =
    /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  const validWebsite =
    websiteName.trim().length >= 3;

  const validDomain =
    domainType === "subdomain"
      ? true
      : domainRegex.test(customDomain);

  const canConnectDomain =
    domainType === "custom" &&
    validDomain &&
    !loading;

  const canPublish =
    validWebsite &&
    (domainType === "subdomain" ||
      (customDomainConnected &&
        customDomainVerified)) &&
    !loading;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky bottom-0 rounded-b-3xl border-t border-slate-800 bg-slate-950 p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Left */}

        <div>

          <h3 className="text-lg font-bold text-white">
            Ready to Publish
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Your website and admin panel will be
            generated automatically.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaArrowLeft />

            Cancel
          </button>

          {domainType === "custom" && !customDomainConnected && (
            <button
              type="button"
              onClick={onConnectDomain}
              disabled={!canConnectDomain}
              className={`flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white transition ${
                canConnectDomain
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "cursor-not-allowed bg-slate-700"
              }`}
            >
              Connect Domain
            </button>
          )}

          {domainType === "custom" &&
            customDomainConnected &&
            !customDomainVerified && (
              <button
                type="button"
                onClick={onVerifyDomain}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700"
              >
                Verify DNS
              </button>
            )}

          <button
            type="button"
            onClick={onPublish}
            disabled={!canPublish}
            className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-3 font-bold text-white transition ${
              canPublish
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-700"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <FaRocket />
                Publish Website
              </>
            )}
          </button>

        </div>

      </div>

      {!validWebsite && (
        <p className="mt-4 text-sm text-red-400">
          Website name must contain at least 3
          characters.
        </p>
      )}

      {domainType === "custom" &&
        !validDomain && (
          <p className="mt-2 text-sm text-red-400">
            Please enter a valid custom domain.
          </p>
        )}

      {domainType === "custom" &&
        customDomainConnected &&
        !customDomainVerified && (
          <p className="mt-2 text-sm text-yellow-400">
            Domain connected. Run DNS verification before publishing.
          </p>
        )}

      {domainType === "custom" &&
        customDomainVerified && (
          <p className="mt-2 text-sm text-green-400">
            Custom domain verified. Ready to publish.
          </p>
        )}
    </motion.div>
  );
};

export default PublishFooter;