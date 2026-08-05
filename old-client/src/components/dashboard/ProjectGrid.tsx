import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
  error?: string;
  onDelete: (id: string) => void;
}

const ProjectGrid = ({
  projects,
  loading = false,
  error = "",
  onDelete,
}: ProjectGridProps) => {
  if (loading) {
    return (
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 py-24 text-center">
            <h2 className="text-3xl font-bold text-white">Loading your websites...</h2>
            <p className="mt-4 text-slate-400">Please wait while we fetch your latest projects.</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="rounded-3xl border border-red-800 bg-slate-900 py-24 text-center">
            <h2 className="text-3xl font-bold text-white">We could not load your websites</h2>
            <p className="mt-4 text-slate-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-5">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 py-24 text-center">

            <h2 className="text-3xl font-bold text-white">
              No Projects Yet
            </h2>

            <p className="mt-4 text-slate-400">
              Publish your first website to see it here.
            </p>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-5">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-black text-white">
              Published Websites
            </h2>

            <p className="mt-2 text-slate-400">
              {projects.length} Project
              {projects.length > 1 && "s"}
            </p>

          </div>

        </div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={onDelete}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default ProjectGrid;