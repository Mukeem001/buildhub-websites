import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import TemplateHero from "./component/TemplateHero";
import CategoryFilter from "./component/CategoryFilter";
import TemplateGrid from "./component/TemplateGrid";
import Pagination from "./component/Pagination";
import CreateTemplateModal from "../../../components/templates/CreateTemplateModal";

import { createTemplate, fetchTemplates } from "../../../services/template.service";
import type { Template as TemplateType } from "./component/TemplateCard";

interface CreateTemplatePayload {
  name: string;
  category: string;
  description: string;
  price: number;
  premium: boolean;
  thumbnail?: string;
  previewUrl?: string;
}

/* ========================================================= */

const ITEMS_PER_PAGE = 3;

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [templates, setTemplates] = useState<TemplateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  const categoriesList = useMemo(() => {
    const cats = new Set<string>();
    templates.forEach((t) => {
      if (t.category) cats.add(t.category);
    });
    return ["All", ...Array.from(cats)];
  }, [templates]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (err) {
        console.error("Failed to fetch templates", err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filteredTemplates = useMemo(() => {
    const q = search.toLowerCase().trim();

    return templates.filter((template) => {
      const categoryMatch =
        category === "All" ||
        template.category === category;

      const searchMatch =
        !q ||
        template.name.toLowerCase().includes(q) ||
        (template.category || "").toLowerCase().includes(q) ||
        (template.description || "").toLowerCase().includes(q) ||
        (template.tags || []).some((tag) =>
          tag.toLowerCase().includes(q)
        );

      return categoryMatch && searchMatch;
    });
  }, [search, category, templates]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE)
  );


  const paginatedTemplates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredTemplates.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredTemplates, currentPage]);

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePreview = (template: TemplateType) => {
    const slug = template.slug ?? createSlug(template.name);
    navigate(`/templates/${slug}`);
  };

  const handleUseTemplate = (template: TemplateType) => {
    const slug = template.slug ?? createSlug(template.name);
    navigate(`/templates/${slug}?mode=use`);
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCreateTemplate = async (payload: CreateTemplatePayload) => {
    try {
      const created = await createTemplate(payload);
      setTemplates((prev) => [
        {
          id: created._id || created.id,
          slug: created.slug,
          name: created.name,
          title: created.name,
          category: created.category || "General",
          image: created.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
          premium: Boolean(created.premium),
          rating: Number(created.rating) || 4.8,
          downloads: Number(created.downloads) || 0,
          price: Number(created.price) || 0,
          previewUrl: created.previewUrl || "",
          description: created.description || "",
          isActive: Boolean(created.isActive),
          tags: Array.isArray(created.tags) ? created.tags : [],
        } as TemplateType,
        ...prev,
      ]);
      setCreateOpen(false);
    } catch (error) {
      console.error("Failed to create template", error);
      alert((error instanceof Error ? error.message : "Unable to create template."));
    }
  };

    return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-180px] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[-120px] top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <main className="relative">

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-10">

          {/* HERO */}

          <TemplateHero
            totalTemplates={templates.length}
            onExplore={() =>
              document
                .getElementById("template-library")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          />

          {/* TEMPLATE LIBRARY */}

          <section
            id="template-library"
            className="mt-10"
          >

            {/* Heading */}

            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={18}
                    className="text-blue-400"
                  />

                  <h2 className="text-2xl font-bold">
                    Template Library
                  </h2>

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Explore professionally designed templates for every industry.
                </p>

              </div>

              {/* SEARCH */}

              <div className="relative w-full xl:max-w-sm">

                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={handleSearch}
                  className="h-12 w-full rounded-xl border border-slate-800 bg-slate-900/70 pl-11 pr-11 text-sm outline-none transition focus:border-blue-500/60"
                />

                {search && (

                  <button
                    onClick={() => {
                      setSearch("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-slate-800"
                  >

                    <X size={15} />

                  </button>

                )}

              </div>

            </div>

            {/* FILTER BAR */}

            <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-900/50 p-3 backdrop-blur">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="min-w-0 flex-1">

                    <CategoryFilter
                      categories={categoriesList}
                      activeCategory={category}
                      onChange={handleCategory}
                    />

                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">

                  <SlidersHorizontal size={14} />

                  <span>

                    {filteredTemplates.length}

                    {filteredTemplates.length === 1
                      ? " Template"
                      : " Templates"}

                  </span>

                </div>

              </div>

            </div>

            {/* ACTIVE FILTERS */}

            {(search || category !== "All") && (

              <div className="mt-5 flex flex-wrap gap-2">

                {search && (

                  <button
                    onClick={() => setSearch("")}
                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
                  >

                    "{search}"

                  </button>

                )}

                {category !== "All" && (

                  <button
                    onClick={() => handleCategory("All")}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                  >

                    {category}

                  </button>

                )}

              </div>

            )}

            {/* GRID */}

            <div className="mt-8">
              {loading ? (
                <div className="text-white">Loading templates...</div>
              ) : (
                <TemplateGrid
                  templates={paginatedTemplates as TemplateType[]}
                  onPreview={handlePreview}
                  onUse={handleUseTemplate}
                />
              )}
            </div>

                        {/* PAGINATION */}

            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePage}
              />
            </div>

          </section>

          <CreateTemplateModal
            isOpen={createOpen}
            onClose={() => setCreateOpen(false)}
            onCreate={handleCreateTemplate}
          />

          {/* ==========================
              CTA SECTION
          ========================== */}

          <section className="mt-14 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900/90 to-cyan-500/10 p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

                  <Sparkles
                    size={16}
                    className="text-blue-400"
                  />

                  <span className="text-sm font-semibold text-blue-400">
                    Build Something Amazing
                  </span>

                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Can't find the perfect template?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">

                  Create your website completely from scratch using our
                  drag & drop website builder and build exactly what you
                  imagine.

                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  className="
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    transition
                    hover:border-blue-500
                    hover:bg-slate-800
                  "
                >
                  Contact Team
                </button>

                <button
                  className="
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    shadow-lg
                    shadow-blue-500/20
                    transition
                    hover:scale-[1.02]
                  "
                >
                  Create Website
                </button>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default Templates;