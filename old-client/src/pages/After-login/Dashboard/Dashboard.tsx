import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectGrid from "@/components/dashboard/ProjectGrid";
import { fetchProjects } from "@/services/project.service";
import { deleteWebsite } from "@/services/project.service";
import type { Project } from "@/types/project";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProjects();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Unable to load your websites right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Delete this website permanently?")) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      await deleteWebsite(projectId);
      setProjects((prev) =>
        prev.filter((project) => project.id !== projectId)
      );
    } catch (err: any) {
      setError(err.message || "Failed to delete website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-20">
      <DashboardHeader projects={projects} />
      <ProjectGrid
        projects={projects}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </main>
  );
};

export default Dashboard;