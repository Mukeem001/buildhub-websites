import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  Copy,
  Download,
  Edit3,
  Eye,
  FileCode,
  Folder,
} from "lucide-react";
import { fetchSystemTemplates, fetchSystemTemplateById } from "../../../services/system-templates.service";
import type { SystemTemplate, SystemTemplateDetails } from "../../../services/system-templates.service";

const SystemTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<SystemTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<SystemTemplateDetails | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchSystemTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load system templates", error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filteredTemplates = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [searchTerm, templates]);

  const handleSelectTemplate = async (template: SystemTemplate) => {
    try {
      const details = await fetchSystemTemplateById(template.id);
      setSelectedTemplate(details);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to fetch template details", error);
    }
  };

  const handleClose = () => {
    setSelectedTemplate(null);
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/70 p-10 text-center">
          <p className="text-lg font-semibold text-slate-200">Loading system templates...</p>
        </div>
      </div>
    );
  }

  if (selectedTemplate && !editMode) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[7%] top-[-140px] h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute right-[5%] top-[25%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 flex h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleClose}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 hover:border-blue-500/40"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">{selectedTemplate.name}</h1>
                  <p className="text-sm text-slate-400">{selectedTemplate.category}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
                >
                  <Edit3 size={16} />
                  Edit Template
                </button>
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto border-r border-slate-800 p-6">
              <div className="space-y-6">
                <section>
                  <h2 className="mb-3 text-xl font-bold text-white">Template Details</h2>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                    <div>
                      <p className="text-xs uppercase text-slate-400">Name</p>
                      <p className="text-white">{selectedTemplate.name}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-400">Slug</p>
                      <p className="font-mono text-sm text-slate-300">{selectedTemplate.slug}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-400">Category</p>
                      <p className="text-white">{selectedTemplate.category}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-white">Structure</h2>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <FileCode size={16} className="text-blue-400" />
                      <span className="text-sm">
                        package.json {selectedTemplate.structure.hasPackageJson ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode size={16} className="text-green-400" />
                      <span className="text-sm">
                        index.html {selectedTemplate.structure.hasIndexHtml ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode size={16} className="text-orange-400" />
                      <span className="text-sm">
                        README.md {selectedTemplate.structure.hasReadme ? "✓" : "✗"}
                      </span>
                    </div>
                  </div>
                </section>

                {selectedTemplate.readmeContent && (
                  <section>
                    <h2 className="mb-3 text-xl font-bold text-white">Documentation</h2>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-sm text-slate-300">
                          {selectedTemplate.readmeContent.substring(0, 500)}
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="mb-3 text-xl font-bold text-white">Files</h2>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedTemplate.files.map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 hover:border-blue-500/40"
                        >
                          <Folder size={14} className="text-slate-400" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="w-80 border-l border-slate-800 bg-slate-950/60 p-6 overflow-y-auto">
              <h3 className="mb-4 text-lg font-bold text-white">Actions</h3>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Eye size={16} />
                  Preview Template
                </button>
                <button className="w-full rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white hover:bg-slate-700 flex items-center justify-center gap-2">
                  <Copy size={16} />
                  Duplicate Template
                </button>
                <button className="w-full rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white hover:bg-slate-700 flex items-center justify-center gap-2">
                  <Download size={16} />
                  Download
                </button>
                <button className="w-full rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white hover:bg-slate-700 flex items-center justify-center gap-2">
                  <Code2 size={16} />
                  View Source
                </button>
              </div>

              {selectedTemplate.packageJson && (
                <div className="mt-6">
                  <h4 className="mb-2 text-sm font-semibold text-slate-300">Package.json</h4>
                  <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 font-mono text-xs text-slate-400 max-h-64 overflow-y-auto">
                    {selectedTemplate.packageJson.name && (
                      <div>
                        <span className="text-slate-300">name:</span> {selectedTemplate.packageJson.name}
                      </div>
                    )}
                    {selectedTemplate.packageJson.version && (
                      <div>
                        <span className="text-slate-300">version:</span> {selectedTemplate.packageJson.version}
                      </div>
                    )}
                    {selectedTemplate.packageJson.description && (
                      <div>
                        <span className="text-slate-300">description:</span> {selectedTemplate.packageJson.description}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[7%] top-[-140px] h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[5%] top-[25%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col">
        <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur-sm sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 hover:border-blue-500/40"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">System Templates</h1>
                <p className="text-sm text-slate-400">Edit and customize available templates</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/40"
              />
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
                <Folder size={48} className="mx-auto mb-4 text-slate-500" />
                <p className="text-lg text-slate-400">No templates found</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 cursor-pointer transition hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    {template.thumbnail && (
                      <div className="mb-4 h-32 rounded-lg bg-slate-800 overflow-hidden">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-1">{template.name}</h3>
                    <p className="text-xs uppercase text-blue-400 mb-2">{template.category}</p>
                    <p className="text-sm text-slate-300 mb-4 line-clamp-2">{template.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTemplate(template);
                        }}
                        className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemTemplatesPage;
