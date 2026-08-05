import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Project } from "../types/project";

interface ProjectContextType {
  projects: Project[];

  addProject: (project: Project) => void;

  deleteProject: (id: string) => void;

  updateProject: (project: Project) => void;
}

const ProjectContext =
  createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateProject = (project: Project) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === project.id ? project : item
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjects must be used inside ProjectProvider"
    );
  }

  return context;
};