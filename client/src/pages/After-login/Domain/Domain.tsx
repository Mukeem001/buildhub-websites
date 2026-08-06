import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchProjects } from "@/services/project.service";
import { connectDomain, verifyDomain } from "@/services/publish.service";
import type { Project } from "@/types/project";

type Provider = "godaddy" | "hostinger" | "other";

const Domain = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState("");
  const [domain, setDomain] = useState("");
  const [dnsHost, setDnsHost] = useState("www");
  const [dnsTarget, setDnsTarget] = useState("builder.buildhub.app");
  const [provider, setProvider] = useState<Provider>("godaddy");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        if (data[0]?.id) {
          setSelectedWebsiteId(data[0].id);
        }
      } catch {
        setError("Unable to load your websites right now.");
      }
    };

    void loadProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!selectedWebsiteId || !domain.trim()) {
        throw new Error("Please choose a website and enter a domain.");
      }

      const payload = await connectDomain({
        websiteId: selectedWebsiteId,
        customDomain: domain.trim(),
        dnsHost: dnsHost.trim() || "www",
        dnsTarget: dnsTarget.trim() || "builder.buildhub.app",
      });

      await verifyDomain(selectedWebsiteId);

      setMessage(`Domain connected successfully for ${payload?.domain || domain}.`);
      setDomain("");
      setDnsHost("www");
      setDnsTarget("builder.buildhub.app");
    } catch (err: any) {
      setError(err?.message || "Unable to connect domain.");
    } finally {
      setLoading(false);
    }
  };

  const providerInstructions = {
    godaddy: {
      title: "GoDaddy DNS setup",
      steps: [
        "Open your GoDaddy Domain Manager.",
        "Select your domain and open DNS Management.",
        "Add or edit a CNAME record with Host: www and Value: builder.buildhub.app.",
        "If you want the root domain, add an A record pointing to your server IP.",
      ],
    },
    hostinger: {
      title: "Hostinger DNS setup",
      steps: [
        "Open Hostinger DNS Zone Editor.",
        "Create a CNAME record for www with Value: builder.buildhub.app.",
        "If needed, add an A record for the root domain to your server IP.",
      ],
    },
    other: {
      title: "Other providers",
      steps: [
        "Open your DNS management page.",
        "Create a CNAME record for www pointing to builder.buildhub.app.",
        "If you use the root domain, use an A record pointing to your server IP.",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Domain
            </p>
            <h1 className="mt-2 text-3xl font-bold">Domain Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Connect and verify a custom domain for one of your websites.
            </p>
          </div>

          <Link
            to="/websites"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Back to Websites
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
          >
            <h2 className="text-xl font-semibold">Connect a Domain</h2>
            <p className="mt-2 text-sm text-slate-400">
              Choose a website and add a custom domain. The domain will be saved to the backend.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Website
                </label>
                <select
                  value={selectedWebsiteId}
                  onChange={(e) => setSelectedWebsiteId(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                >
                  {projects.length === 0 ? (
                    <option value="">No websites found</option>
                  ) : (
                    projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Domain
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Domain Provider
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as Provider)}
                  className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                >
                  <option value="godaddy">GoDaddy</option>
                  <option value="hostinger">Hostinger</option>
                  <option value="other">Other Provider</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    DNS Host
                  </label>
                  <input
                    type="text"
                    value={dnsHost}
                    onChange={(e) => setDnsHost(e.target.value)}
                    placeholder="www"
                    className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    DNS Target
                  </label>
                  <input
                    type="text"
                    value={dnsTarget}
                    onChange={(e) => setDnsTarget(e.target.value)}
                    placeholder="builder.buildhub.app"
                    className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            {message ? (
              <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connecting..." : "Connect Domain"}
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">What happens next?</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• The domain is saved to the backend for the selected website.</li>
                <li>• Verification starts immediately after the connection request.</li>
                <li>• DNS propagation can take a few minutes to a few hours.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">{providerInstructions[provider].title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {providerInstructions[provider].steps.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                <p className="font-semibold text-slate-100">DNS values to use</p>
                <p className="mt-2">Host: {dnsHost || "www"}</p>
                <p>Value: {dnsTarget || "builder.buildhub.app"}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">Connected websites</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {projects.length === 0 ? (
                  <p>No websites loaded yet.</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                      <div className="font-semibold text-white">{project.name}</div>
                      <div className="mt-1 text-slate-400">Status: {project.status}</div>
                      <div className="mt-1 text-slate-400">Domain: {project.domain || "Not connected yet"}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domain;
