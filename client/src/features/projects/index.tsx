import { type FC, useState } from "react";
import { Search, Plus } from "lucide-react";
import ProjectCard, { type ProjectItem } from "./components/ProjectCard";
import ProjectRow from "./components/ProjectRow";
import ProjectDetailsView from "./components/ProjectDetailsView";
import CreateProjectModal from "./components/CreateProjectModal";

interface ProjectsProps {
  onOpenBoard?: (projectKey: string) => void;
}

const initialProjects: ProjectItem[] = [
  {
    name: "Payments Engine",
    key: "SYNC",
    desc: "Core billing pipeline, Stripe webhook integration, and subscription renewals.",
    sprint: "Sprint 24.1 (Active)",
    items: 28,
    status: "Active",
    members: [
      { initials: "AR", bg: "bg-blue-600" },
      { initials: "SC", bg: "bg-emerald-600" },
      { initials: "JD", bg: "bg-purple-600" },
      { initials: "ER", bg: "bg-slate-700" },
      { initials: "MV", bg: "bg-amber-600" },
      { initials: "LS", bg: "bg-rose-600" },
    ],
  },
  {
    name: "Mobile Banking App",
    key: "MOB",
    desc: "Native iOS & Android mobile banking clients with biometric authentication.",
    sprint: "Sprint 12.0 (Active)",
    items: 42,
    status: "Active",
    members: [
      { initials: "AR", bg: "bg-blue-600" },
      { initials: "JD", bg: "bg-purple-600" },
      { initials: "SC", bg: "bg-emerald-600" },
      { initials: "MK", bg: "bg-indigo-600" },
      { initials: "NL", bg: "bg-teal-600" },
    ],
  },
  {
    name: "Authentication & SSO Gateway",
    key: "AUTH",
    desc: "OAuth2 identity provider, session management, token rotation, and SAML integration.",
    status: "Active",
    members: [
      { initials: "AR", bg: "bg-blue-600" },
      { initials: "SC", bg: "bg-emerald-600" },
      { initials: "ER", bg: "bg-slate-700" },
    ],
  },
  {
    name: "Data Platform & Analytics",
    key: "DATA",
    desc: "PostgreSQL change data capture pipelines, ClickHouse aggregation, and reporting.",
    status: "Planned",
    members: [
      { initials: "JD", bg: "bg-purple-600" },
      { initials: "MV", bg: "bg-amber-600" },
      { initials: "LS", bg: "bg-rose-600" },
      { initials: "NL", bg: "bg-teal-600" },
      { initials: "MK", bg: "bg-indigo-600" },
    ],
  },
];

const Projects: FC<ProjectsProps> = ({ onOpenBoard = () => {} }) => {
  const [projectsList, setProjectsList] =
    useState<ProjectItem[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectForDetails, setSelectedProjectForDetails] =
    useState<ProjectItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Projects assigned to the current user
  const myProjects = projectsList.filter((p) =>
    p.members.some((m) => m.initials === "AR"),
  );

  const filteredAllProjects = projectsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.key.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProjectForDetails(project);
  };

  const handleCreateProject = (data: {
    name: string;
    key: string;
    description: string;
  }) => {
    const newProj: ProjectItem = {
      name: data.name,
      key: data.key,
      desc: data.description,
      status: "Active",
      items: 0,
      members: [{ initials: "AR", bg: "bg-blue-600" }],
    };
    setProjectsList([newProj, ...projectsList]);
  };

  // 1. PROJECT DETAILS VIEW
  if (selectedProjectForDetails) {
    return (
      <ProjectDetailsView
        project={selectedProjectForDetails}
        onBack={() => setSelectedProjectForDetails(null)}
        onOpenBoard={onOpenBoard}
      />
    );
  }

  // 2. PROJECTS DIRECTORY VIEW
  return (
    <div className="space-y-8 w-full">
      {/* Header Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage repositories, sprint workflows, and team assignments across
            Acme Corp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-48 h-8 bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Section 1: My Projects (Cards Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              My Projects
            </h2>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
              {myProjects.length}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Projects you are an active member of
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {myProjects.map((proj) => (
            <ProjectCard
              key={proj.key}
              project={proj}
              onClick={handleSelectProject}
            />
          ))}
        </div>
      </div>

      {/* Section 2: All Projects (Row List) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              All Projects
            </h2>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono font-bold">
              {filteredAllProjects.length}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Complete organization workspace directory
          </span>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
          {filteredAllProjects.map((proj) => (
            <ProjectRow
              key={proj.key}
              project={proj}
              onClick={handleSelectProject}
            />
          ))}
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default Projects;
