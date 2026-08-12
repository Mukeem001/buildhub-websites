import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { fetchProjects } from "@/services/project.service";
import {
  connectDomain,
  deleteDomain,
  getWebsiteDomain,
  verifyDomain,
} from "@/services/publish.service";
import type { Project } from "@/types/project";

const formatDomainLabel = (project: Project) => {
  if (project.domain && project.domain !== project.url) {
    return project.domain;
  }

  if (project.url) {
    return project.url;
  }

  return "Not connected yet";
};

const formatStatus = (value?: string) => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const isCustomDomain = (project: Project) => {
  return Boolean(project.domain && project.domain !== project.url);
};

const hasConnectedDomain = (project: Project, selectedWebsiteDomain: DomainRecord | null, selectedWebsiteId: string) => {
  if (isCustomDomain(project)) {
    return true;
  }
  return Boolean(project.id === selectedWebsiteId && selectedWebsiteDomain?.domain);
};

const getProjectDomainLabel = (project: Project, selectedWebsiteDomain: DomainRecord | null, selectedWebsiteId: string) => {
  if (project.id === selectedWebsiteId && selectedWebsiteDomain?.domain) {
    return selectedWebsiteDomain.domain;
  }

  return formatDomainLabel(project);
};

type Provider = "godaddy" | "hostinger" | "other";

type DomainRecord = {
  domain?: string;
  hostname?: string;
  cnameHost?: string;
  cnameTarget?: string;
  verificationStatus?: string;
  verificationReason?: string;
  sslStatus?: string;
  sslError?: string;
  createdAt?: string;
  updatedAt?: string;
};

const Domain = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState("");
  const [selectedWebsiteDomain, setSelectedWebsiteDomain] = useState<DomainRecord | null>(null);
  const [domain, setDomain] = useState("");
  const [dnsHost, setDnsHost] = useState("www");
  const [dnsTarget, setDnsTarget] = useState("builder.buildhub.app");
  const [provider, setProvider] = useState<Provider>("godaddy");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef(false);

  const providerInstructions = {
    godaddy: {
      title: "GoDaddy DNS setup",
      steps: [
        "Open your GoDaddy Domain Manager.",
        "Select your domain and open DNS Management.",
        "Create a CNAME record with Host = www and Value = builder.buildhub.app.",
        "If you want the root domain to work, add an A record with Host = @ and Value = 2.28.13.238.",
        "Save the records and wait for DNS propagation before verifying.",
      ],
    },
    hostinger: {
      title: "Hostinger DNS setup",
      steps: [
        "Open Hostinger and go to the DNS Zone Editor for your domain.",
        "Create a CNAME record with Host = www and Value = builder.buildhub.app.",
        "If you want the root domain to work, add an A record with Host = @ and Value = 2.28.13.238.",
        "Save the records and wait for DNS propagation before verifying.",
      ],
    },
    other: {
      title: "Other provider DNS setup",
      steps: [
        "Open your DNS management page.",
        "Create a CNAME record with Host = www and Value = builder.buildhub.app.",
        "If you want the root domain, create an A record with Host = @ and Value = 2.28.13.238.",
        "Save the record and wait for propagation.",
      ],
    },
  };

  const connectSteps = [
    "Select the website you want to connect to a custom domain.",
    "Enter your purchased domain exactly, for example example.com.",
    "Choose Hostinger (or your provider) and update DNS records as shown below.",
    "Click Connect Domain, then wait for DNS propagation.",
    "After propagation, click Verify Domain to complete the connection.",
  ];

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
      if (!selectedWebsiteId && data[0]?.id) {
        setSelectedWebsiteId(data[0].id);
      }
    } catch {
      setError("Unable to load your websites right now.");
    }
  };

  const loadDomainDetails = async (websiteId: string) => {
    setSelectedWebsiteDomain(null);

    if (!websiteId) return;

    try {
      const data = await getWebsiteDomain(websiteId);
      setSelectedWebsiteDomain(data);
    } catch {
      setSelectedWebsiteDomain(null);
    }
  };

  // Poll domain status until verification and SSL are settled
  const pollDomainStatus = async (websiteId: string) => {
    if (!websiteId) return;

    // avoid multiple concurrent pollers
    if (pollingRef.current) return;
    pollingRef.current = true;

    try {
      const intervalMs = 3000;
      const maxAttempts = 40; // ~2 minutes
      let attempts = 0;

      await new Promise<void>((resolve) => {
        const iv = setInterval(async () => {
          attempts += 1;

          try {
            const status = await getWebsiteDomain(websiteId);
            setSelectedWebsiteDomain(status);

            const verificationDone = status?.verificationStatus && status.verificationStatus !== "pending";
            const sslSettled = !status?.sslStatus || (status.sslStatus !== "generating" && status.sslStatus !== "pending");

            if (verificationDone && sslSettled) {
              clearInterval(iv);
              resolve();
              return;
            }

            if (attempts >= maxAttempts) {
              clearInterval(iv);
              resolve();
              return;
            }
          } catch (err) {
            // ignore errors, but stop after max attempts
            if (attempts >= maxAttempts) {
              clearInterval(iv);
              resolve();
            }
          }
        }, intervalMs);
      });
    } finally {
      pollingRef.current = false;
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  useEffect(() => {
    if (selectedWebsiteId) {
      void loadDomainDetails(selectedWebsiteId);
    }
  }, [selectedWebsiteId]);

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

      // trigger verification and then poll status (verification triggers SSL issuance on backend)
      await verifyDomain(selectedWebsiteId);
      // start polling status until verification + SSL complete
      void pollDomainStatus(selectedWebsiteId);
      await loadDomainDetails(selectedWebsiteId);
      await loadProjects();

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

  const handleVerify = async () => {
    if (!selectedWebsiteId) {
      setError("Please select a website first.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const result = await verifyDomain(selectedWebsiteId);

      // poll while backend issues SSL
      void pollDomainStatus(selectedWebsiteId);

      await loadDomainDetails(selectedWebsiteId);

      setMessage(
        result?.verificationStatus === "verified"
          ? "DNS verified successfully. SSL issuance is in progress if enabled."
          : "DNS verification failed. Please check your records and try again."
      );
    } catch (err: any) {
      setError(err?.message || "Unable to verify the domain.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (websiteId?: string, websiteName?: string, projectDomain?: string) => {
    const id = websiteId || selectedWebsiteId;

    if (!id) {
      setError("Please select a website first.");
      return;
    }

    // determine domain label: prefer explicit projectDomain, then selectedWebsiteDomain
    const domainLabel = projectDomain || (id === selectedWebsiteId ? selectedWebsiteDomain?.domain : undefined);

    if (!domainLabel) {
      setError("This website does not have a connected custom domain.");
      return;
    }

    const confirmText = `Delete domain "${domainLabel}" from website "${websiteName || id}"? This will remove the connection from the database.`;
    if (!window.confirm(confirmText)) {
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await deleteDomain(id);
      setMessage(`Connected domain ${domainLabel} removed successfully.`);

      if (id === selectedWebsiteId) {
        await loadDomainDetails(id);
      }

      await loadProjects();
    } catch (err: any) {
      setError(err?.message || "Unable to delete domain.");
    } finally {
      setLoading(false);
    }
  };

const selectedProject = projects.find((project) => project.id === selectedWebsiteId);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Domain
            </p>
            <h1 className="mt-2 text-3xl font-bold">Domain Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Connect, verify, and manage a custom domain for your published website.
            </p>
          </div>

          <Link
            to="/websites"
            className="inline-flex rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Back to Websites
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">Connect a Domain</h2>
            <p className="mt-2 text-sm text-slate-400">
              Select a website, add your custom domain, then follow the DNS instructions below.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Website</label>
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

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Domain</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Provider</label>
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
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">DNS Host</label>
                  <input
                    type="text"
                    value={dnsHost}
                    onChange={(e) => setDnsHost(e.target.value)}
                    placeholder="www"
                    className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">DNS Target</label>
                  <input
                    type="text"
                    value={dnsTarget}
                    onChange={(e) => setDnsTarget(e.target.value)}
                    placeholder="builder.buildhub.app"
                    className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500"
                  />
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              {message ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                  {message}
                </div>
              ) : null}

              {selectedWebsiteDomain ? (
                <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-200">
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                      <p className="text-slate-400">DNS Status</p>
                      <p className="mt-1 text-white">{formatStatus(selectedWebsiteDomain.verificationStatus)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">SSL Status</p>
                      <p className="mt-1 text-white">{formatStatus(selectedWebsiteDomain.sslStatus)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Domain</p>
                      <p className="mt-1 text-white">{selectedWebsiteDomain.domain || "-"}</p>
                    </div>
                  </div>

                  {selectedWebsiteDomain.sslError ? (
                    <div className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      <p className="font-semibold">SSL error</p>
                      <p>{selectedWebsiteDomain.sslError}</p>
                    </div>
                  ) : null}

                  {selectedWebsiteDomain?.verificationStatus === "failed" && selectedWebsiteDomain?.verificationReason ? (
                    <div className="mt-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
                      <p className="font-semibold">DNS verification details</p>
                      <pre className="mt-2 whitespace-pre-wrap text-xs text-yellow-100">{selectedWebsiteDomain.verificationReason}</pre>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Connecting..." : "Connect Domain"}
                </button>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={!selectedWebsiteId || loading}
                  className="rounded-2xl border border-blue-600 bg-slate-950 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Verify Domain
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedWebsiteId, selectedProject?.name, selectedWebsiteDomain?.domain)}
                  disabled={!selectedWebsiteId || loading}
                  className="rounded-2xl border border-red-600 bg-red-600/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete Connected Domain
                </button>
              </div>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold">How to use this page</h3>
              <ol className="mt-4 space-y-3 text-sm text-slate-300 list-decimal list-inside">
                {connectSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <h3 className="text-lg font-semibold">Selected Website</h3>
              <p className="mt-2 text-sm text-slate-400">
                {selectedProject ? selectedProject.name : "Choose a website above."}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                  <p className="font-semibold text-slate-100">Live URL</p>
                  <p className="mt-2 break-all text-slate-300">{selectedProject?.url || "Not available"}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                  <p className="font-semibold text-slate-100">Current domain</p>
                  <p className="mt-2 break-all text-slate-300">{selectedProject ? formatDomainLabel(selectedProject) : "Not connected"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold">Connected Domain Details</h3>
              {selectedWebsiteDomain ? (
                <div className="mt-4 grid gap-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                    <p className="text-slate-400">Domain</p>
                    <p className="mt-1 break-all text-white">{selectedWebsiteDomain.domain || "-"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                    <p className="text-slate-400">Hostname</p>
                    <p className="mt-1 break-all text-white">{selectedWebsiteDomain.hostname || "-"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                    <p className="text-slate-400">CNAME Host</p>
                    <p className="mt-1 text-white">{selectedWebsiteDomain.cnameHost || "www"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                    <p className="text-slate-400">CNAME Target</p>
                    <p className="mt-1 text-white">{selectedWebsiteDomain.cnameTarget || "builder.buildhub.app"}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                      <p className="text-slate-400">Verification</p>
                      <p className="mt-1 text-white">{formatStatus(selectedWebsiteDomain.verificationStatus)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                      <p className="text-slate-400">SSL Status</p>
                      <p className="mt-1 text-white">{formatStatus(selectedWebsiteDomain.sslStatus)}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                    <p className="text-slate-400">Last updated</p>
                    <p className="mt-1 text-white">{selectedWebsiteDomain.updatedAt ? new Date(selectedWebsiteDomain.updatedAt).toLocaleString() : "-"}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400">No domain details available for the selected website yet.</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">How to connect a Hostinger domain</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-300 list-decimal list-inside">
                <li>Login to Hostinger and open the DNS Zone Editor for your domain.</li>
                <li>Set a CNAME record for <strong>www</strong> to <strong>builder.buildhub.app</strong>.</li>
                <li>If you want the root domain, set an A record for <strong>@</strong> to <strong>2.28.13.238</strong>.</li>
                <li>Wait for DNS propagation, then select your website and connect the domain here.</li>
                <li>After connecting, verify the domain with the button above.</li>
              </ol>
              <div className="mt-4 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-200">
                BuildHub is deployed on Hetzner at <strong>http://2.28.13.238/</strong>. Use this IP for A records and <strong>builder.buildhub.app</strong> for CNAME records.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">DNS setup for your provider</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {providerInstructions[provider].steps.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">Connected websites</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {projects.length === 0 ? (
                  <p>No websites loaded yet.</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-white">{project.name}</div>
                          <div className="mt-1 text-slate-400">Status: {project.status}</div>
                        </div>
                        {hasConnectedDomain(project, selectedWebsiteDomain, selectedWebsiteId) ? (
                          <button
                            type="button"
                            onClick={() => handleDelete(project.id, project.name, getProjectDomainLabel(project, selectedWebsiteDomain, selectedWebsiteId))}
                            disabled={loading}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-500 text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                            title="Delete connected domain"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.75 5.25A.75.75 0 0 1 7.5 4.5h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75ZM9.28 8.28a.75.75 0 0 0-1.06 1.06L10.94 12l-2.72 2.72a.75.75 0 1 0 1.06 1.06L12 13.06l2.72 2.72a.75.75 0 0 0 1.06-1.06L13.06 12l2.72-2.72a.75.75 0 0 0-1.06-1.06L12 10.94 9.28 8.28Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        ) : null}
                      </div>
                      <div className="mt-3 text-slate-400">Domain: {getProjectDomainLabel(project, selectedWebsiteDomain, selectedWebsiteId)}</div>
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
