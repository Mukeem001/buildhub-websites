import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BrushCleaning,
  Check,
  Code2,
  Globe,
  ImageIcon,
  MonitorCog,
  Palette,
  Save,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
} from "lucide-react";
import { fetchProjects } from "../../../services/project.service";
import type { Project } from "../../../types/project";

type WebsiteEditorForm = {
  name: string;
  slug: string;
  url: string;
  status: "building" | "live" | "failed";
  templateName: string;
  description: string;
  accentColor: string;
  heroTitle: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  favicon: string;
  ogImage: string;
  customDomain: string;
  analyticsId: string;
  footerText: string;
  primaryCTA: string;
  secondaryCTA: string;
  layout: "classic" | "modern" | "minimal";
  navigation: boolean;
  darkMode: boolean;
};

const defaultForm = (): WebsiteEditorForm => ({
  name: "",
  slug: "",
  url: "",
  status: "building",
  templateName: "Business",
  description: "",
  accentColor: "#3b82f6",
  heroTitle: "Build your modern online presence",
  heroSubtitle: "Launch a fast, polished website designed to convert visitors into customers.",
  seoTitle: "",
  seoDescription: "",
  keywords: "website builder, portfolio, business, ecommerce",
  favicon: "",
  ogImage: "",
  customDomain: "",
  analyticsId: "",
  footerText: "© 2026 BuildHub. Built for growth.",
  primaryCTA: "Get Started",
  secondaryCTA: "View Demo",
  layout: "modern",
  navigation: true,
  darkMode: true,
});

const WebsiteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [form, setForm] = useState<WebsiteEditorForm>(defaultForm());
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projects = await fetchProjects();
        const match = projects.find((item) => item.id === id);

        if (!match) {
          navigate("/websites");
          return;
        }

        setProject(match);
        setForm({
          name: match.name || "",
          slug: match.slug || "",
          url: match.url || "",
          status: match.status || "building",
          templateName: match.templateName || "Business",
          description: match.templateName
            ? `Professional ${match.templateName.toLowerCase()} website`
            : "Professional website",
          accentColor: "#3b82f6",
          heroTitle: match.name || "Build your online presence",
          heroSubtitle: "Launch a modern website that supports your business, audience, and growth goals.",
          seoTitle: match.name || "",
          seoDescription: match.name ? `${match.name} website for modern growth.` : "",
          keywords: "website builder, business, portfolio, online presence",
          favicon: "",
          ogImage: "",
          customDomain: match.domain || "",
          analyticsId: "",
          footerText: "© 2026 BuildHub. Crafted for your business.",
          primaryCTA: "Get Started",
          secondaryCTA: "Book a Demo",
          layout: "modern",
          navigation: true,
          darkMode: true,
        });
      } catch (error) {
        console.error("Failed to load project for editor", error);
        navigate("/websites");
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [id, navigate]);

  const websiteUrlPreview = useMemo(() => {
    const slug = form.slug.trim() || "your-website";
    return `https://${form.customDomain || `${slug}.buildhub.app`}`;
  }, [form.customDomain, form.slug]);

  const updateField = <K extends keyof WebsiteEditorForm>(field: K, value: WebsiteEditorForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const saveChanges = () => {
    const storageKey = "buildhub_website_editor_cache";
    const cached = JSON.parse(localStorage.getItem(storageKey) || "{}") as Record<string, unknown>;
    cached[id || "draft"] = form;
    localStorage.setItem(storageKey, JSON.stringify(cached));
    setSaved(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] px-4 py-12 text-white">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center">
          <p className="text-lg font-semibold text-slate-200">Loading website editor...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[-100px] top-[30%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <main className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/websites")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 transition hover:border-blue-500/40 hover:text-white"
              aria-label="Back to websites"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-sm font-medium text-blue-400">Website Editor</p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => window.open(project.url || websiteUrlPreview, "_blank", "noopener,noreferrer")}
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500/50 hover:text-white"
            >
              Preview
            </button>
            <button
              onClick={saveChanges}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <Check size={16} />
            Website settings saved successfully.
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Settings2 size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">General</p>
                  <h2 className="text-xl font-bold">Website details</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">Website name</span>
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="My Website"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Slug</span>
                  <input
                    value={form.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="my-website"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Status</span>
                  <select
                    value={form.status}
                    onChange={(e) => updateField("status", e.target.value as WebsiteEditorForm["status"])}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  >
                    <option value="building">Building</option>
                    <option value="live">Live</option>
                    <option value="failed">Failed</option>
                  </select>
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">Website description</span>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="Tell visitors what your website is about..."
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Template</span>
                  <input
                    value={form.templateName}
                    onChange={(e) => updateField("templateName", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Website URL</span>
                  <input
                    value={form.url}
                    onChange={(e) => updateField("url", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="https://example.com"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <Palette size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Branding</p>
                  <h2 className="text-xl font-bold">Appearance</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Accent color</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2">
                    <input
                      type="color"
                      value={form.accentColor}
                      onChange={(e) => updateField("accentColor", e.target.value)}
                      className="h-11 w-16 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <span className="text-sm text-slate-300">{form.accentColor}</span>
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Layout</span>
                  <select
                    value={form.layout}
                    onChange={(e) => updateField("layout", e.target.value as WebsiteEditorForm["layout"])}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">Hero title</span>
                  <input
                    value={form.heroTitle}
                    onChange={(e) => updateField("heroTitle", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">Hero subtitle</span>
                  <textarea
                    value={form.heroSubtitle}
                    onChange={(e) => updateField("heroSubtitle", e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Primary CTA</span>
                  <input
                    value={form.primaryCTA}
                    onChange={(e) => updateField("primaryCTA", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Secondary CTA</span>
                  <input
                    value={form.secondaryCTA}
                    onChange={(e) => updateField("secondaryCTA", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Target size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">SEO</p>
                  <h2 className="text-xl font-bold">Search visibility</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">SEO title</span>
                  <input
                    value={form.seoTitle}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">SEO description</span>
                  <textarea
                    value={form.seoDescription}
                    onChange={(e) => updateField("seoDescription", e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm text-slate-300">Keywords</span>
                  <input
                    value={form.keywords}
                    onChange={(e) => updateField("keywords", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Publishing</p>
                  <h2 className="text-xl font-bold">Domain & launch</h2>
                </div>
              </div>

              <div className="space-y-4">
                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Custom domain</span>
                  <input
                    value={form.customDomain}
                    onChange={(e) => updateField("customDomain", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="www.example.com"
                  />
                </label>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">Live preview</p>
                  <p className="break-all text-sm text-slate-200">{websiteUrlPreview}</p>
                </div>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Analytics ID</span>
                  <input
                    value={form.analyticsId}
                    onChange={(e) => updateField("analyticsId", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="G-XXXXXXXXXX"
                  />
                </label>

                <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <label className="flex items-center justify-between gap-3 text-sm text-slate-300">
                    <span>Navigation</span>
                    <input
                      type="checkbox"
                      checked={form.navigation}
                      onChange={(e) => updateField("navigation", e.target.checked)}
                      className="h-4 w-4 accent-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-3 text-sm text-slate-300">
                    <span>Dark mode</span>
                    <input
                      type="checkbox"
                      checked={form.darkMode}
                      onChange={(e) => updateField("darkMode", e.target.checked)}
                      className="h-4 w-4 accent-blue-500"
                    />
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                  <ImageIcon size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Assets</p>
                  <h2 className="text-xl font-bold">Media & branding</h2>
                </div>
              </div>

              <div className="space-y-4">
                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Favicon URL</span>
                  <input
                    value={form.favicon}
                    onChange={(e) => updateField("favicon", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="https://.../favicon.png"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-slate-300">OG image URL</span>
                  <input
                    value={form.ogImage}
                    onChange={(e) => updateField("ogImage", e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                    placeholder="https://.../social-card.jpg"
                  />
                </label>

                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-white">
                  <Upload size={16} />
                  Upload media
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Code2 size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Advanced</p>
                  <h2 className="text-xl font-bold">Footer & scripts</h2>
                </div>
              </div>

              <div className="space-y-4">
                <label className="space-y-2">
                  <span className="text-sm text-slate-300">Footer text</span>
                  <textarea
                    value={form.footerText}
                    onChange={(e) => updateField("footerText", e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-500/60"
                  />
                </label>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Sparkles size={15} className="text-blue-400" />
                    Smart recommendations
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center gap-2"><BrushCleaning size={14} /> Improve CTA copy</li>
                    <li className="flex items-center gap-2"><TrendingUp size={14} /> Add conversion tracking</li>
                    <li className="flex items-center gap-2"><MonitorCog size={14} /> Optimize mobile layout</li>
                  </ul>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default WebsiteEditor;
