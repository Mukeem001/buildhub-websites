import { motion } from "framer-motion";
import {
  FaGlobe,
  FaLink,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

import type { DomainType } from "../../types/publish";

interface DomainSelectorProps {
  domainType: DomainType;
  setDomainType: (value: DomainType) => void;

  websiteName: string;
  setWebsiteName: (value: string) => void;

  customDomain: string;
  setCustomDomain: (value: string) => void;

  dnsHost: string;
  setDnsHost: (value: string) => void;

  dnsTarget: string;
  setDnsTarget: (value: string) => void;
}

const DomainSelector = ({
  domainType,
  setDomainType,
  websiteName,
  setWebsiteName,
  customDomain,
  setCustomDomain,
  dnsHost,
  setDnsHost,
  dnsTarget,
  setDnsTarget,
}: DomainSelectorProps) => {
  const domainRegex =
    /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  const fallbackTarget =
    import.meta.env.VITE_CUSTOM_DOMAIN_TARGET ||
    (import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL
          .replace(/\/api\/?$/, "")
          .replace(/^https?:\/\//, "")
      : "your-domain-target.com");
  const defaultTarget = fallbackTarget;

  const activeTarget =
    dnsTarget || defaultTarget;

  const dnsPreviewHost =
    dnsHost?.trim() === "@" ||
    dnsHost?.trim() === ""
      ? "@"
      : dnsHost;

  const isValidCustomDomain =
    customDomain.length === 0
      ? false
      : domainRegex.test(customDomain);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="text-2xl font-bold text-white">
        Domain Configuration
      </h2>

      <p className="mt-2 text-slate-400">
        Choose whether you want to use a free BuildHub
        subdomain or connect your own custom domain.
      </p>

      {/* ================= Options ================= */}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        {/* Free Subdomain */}

        <button
          type="button"
          onClick={() => setDomainType("subdomain")}
          className={`rounded-2xl border p-6 text-left transition ${
            domainType === "subdomain"
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 bg-slate-950 hover:border-blue-500"
          }`}
        >
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
                <FaGlobe className="text-xl text-white" />
              </div>

              <div>

                <h3 className="text-lg font-bold text-white">
                  Free Subdomain
                </h3>

                <p className="text-slate-400">
                  Instant deployment
                </p>

              </div>

            </div>

            {domainType === "subdomain" && (
              <FaCheckCircle className="text-2xl text-green-500" />
            )}

          </div>

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-4">

            <p className="text-sm text-slate-400">
              Your Website
            </p>

            <h4 className="mt-2 break-all text-white font-bold">

              https://
              {websiteName || "your-store"}
              .buildhub.com

            </h4>

          </div>

        </button>

        {/* Custom Domain */}

        <button
          type="button"
          onClick={() => setDomainType("custom")}
          className={`rounded-2xl border p-6 text-left transition ${
            domainType === "custom"
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 bg-slate-950 hover:border-blue-500"
          }`}
        >
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600">
                <FaLink className="text-xl text-white" />
              </div>

              <div>

                <h3 className="text-lg font-bold text-white">
                  Custom Domain
                </h3>

                <p className="text-slate-400">
                  Connect your own domain
                </p>

              </div>

            </div>

            {domainType === "custom" && (
              <FaCheckCircle className="text-2xl text-green-500" />
            )}

          </div>

          <p className="mt-6 text-sm text-slate-400">
            Example:
          </p>

          <h4 className="mt-2 text-white font-bold">
            https://mybusiness.com
          </h4>

        </button>

      </div>

      {/* ================= Custom Domain Input ================= */}

      {domainType === "custom" && (

        <div className="mt-8 space-y-6">

          <div>
            <label className="mb-3 block font-medium text-white">
              Website Name
            </label>

            <input
              type="text"
              value={websiteName}
              onChange={(e) =>
                setWebsiteName(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "")
                    .replace(/\s+/g, "-")
                )
              }
              placeholder="my-awesome-store"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-blue-500"
            />

            <p className="mt-2 text-sm text-slate-400">
              This name is used for project management and internal
              URLs, not the public custom domain.
            </p>
          </div>

          <div>
            <label className="mb-3 block font-medium text-white">
              Enter Custom Domain
            </label>

            <input
              type="text"
              value={customDomain}
              onChange={(e) =>
                setCustomDomain(
                  e.target.value
                    .trim()
                    .toLowerCase()
                )
              }
              placeholder="example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">

            {isValidCustomDomain ? (

              <>
                <FaCheckCircle className="text-green-500" />

                <span className="text-green-400">
                  Domain format looks valid
                </span>
              </>

            ) : (

              <>
                <FaInfoCircle className="text-yellow-400" />

                <span className="text-yellow-400">
                  Enter a valid domain like
                  example.com
                </span>
              </>

            )}

          </div>

          {/* DNS Instructions */}

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-5">

            <h3 className="font-bold text-white">
              DNS Configuration
            </h3>

            <p className="mt-3 text-slate-400">
              Connect your custom domain with the
              following DNS settings.
            </p>

            <div className="mt-5 space-y-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Host
                </label>
                <input
                  type="text"
                  value={dnsHost}
                  onChange={(e) =>
                    setDnsHost(
                      e.target.value.trim().toLowerCase()
                    )
                  }
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Target
                </label>
                <input
                  type="text"
                  value={dnsTarget}
                  onChange={(e) =>
                    setDnsTarget(
                      e.target.value.trim().toLowerCase()
                    )
                  }
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div className="rounded-xl bg-slate-900 p-4">
                <p className="text-sm text-slate-500">
                  DNS Preview
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">
                    Host: {dnsPreviewHost}
                  </p>
                  <p className="text-sm text-slate-400">
                    Target: {activeTarget}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                <h3 className="font-bold text-white">
                  Hostinger / GoDaddy DNS guide
                </h3>

                <p className="mt-3 text-sm text-slate-400">
                  In your domain provider dashboard, add a CNAME record for your custom domain.
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>
                    <strong>Type:</strong> CNAME
                  </li>
                  <li>
                    <strong>Host:</strong> {dnsHost || "www"}
                  </li>
                  <li>
                    <strong>Value / Target:</strong> {activeTarget}
                  </li>
                  <li>
                    <strong>TTL:</strong> use default or 1 hour
                  </li>
                </ul>

                <p className="mt-4 text-sm text-slate-400">
                  If you want the root domain to work, set a root redirect to <code className="rounded bg-slate-900 px-1 py-0.5 text-xs text-white">www</code> or use your provider's domain forwarding.
                </p>

                <p className="mt-4 text-sm text-yellow-300">
                  After saving DNS, click Verify DNS and wait a few minutes for propagation.
                </p>
              </div>

            </div>

          </div>

        </div>

      )}

    </motion.div>
  );
};

export default DomainSelector;