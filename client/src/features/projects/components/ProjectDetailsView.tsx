import { type FC } from "react";
import {
  ArrowLeft,
  Pencil,
  Kanban,
  Bookmark,
  CheckSquare,
  Milestone,
  UserPlus,
} from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { type ProjectItem } from "./ProjectCard";

interface ProjectDetailsViewProps {
  project: ProjectItem;
  onBack: () => void;
  onOpenBoard?: (projectKey: string) => void;
  onInviteMember?: () => void;
}

const ProjectDetailsView: FC<ProjectDetailsViewProps> = ({
  project,
  onBack,
  onOpenBoard = () => {},
  onInviteMember = () => {},
}) => {
  const handleOpenBoardClick = () => {
    onOpenBoard(project.key);
  };

  const handleInviteClick = () => {
    onInviteMember();
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
            title="Back to Projects"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Projects</span>
              <span>/</span>
              <span className="text-blue-400 font-semibold">{project.key}</span>
            </div>
            <div className="flex items-center gap-2.5 mt-0.5">
              <h1 className="text-xl font-bold tracking-tight text-white">
                {project.name}
              </h1>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.key}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenBoardClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
        >
          <Kanban className="w-3.5 h-3.5" />
          <span>Open Board</span>
        </button>
      </div>

      {/* 1. "About this project" Section */}
      <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            About this project
          </h2>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-850 px-2 py-1 rounded-md transition cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-blue-400" />
            <span>Edit</span>
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {project.desc} This repository serves as the core operational module
          for high-throughput transactional flows, automated signature
          validation, and database state synchronization.
        </p>
      </div>

      {/* 2. Balanced 50/50 Split Grid (Left: Stats | Right: Members) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Project Stats (using generic StatCard) */}
        <div className="space-y-3">
          <div className="h-8 flex items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Project Stats
            </h2>
          </div>

          <div className="space-y-3">
            <StatCard
              title="Backlog Items"
              value={14}
              subtitle="Unassigned / In planning"
              icon={<Bookmark className="w-5 h-5" />}
              color="blue"
            />
            <StatCard
              title="Active Work Items"
              value={project.items || 28}
              subtitle="Tasks, stories & bugs in progress"
              icon={<CheckSquare className="w-5 h-5" />}
              color="emerald"
            />
            <StatCard
              title="Sprints Iterations"
              value="3 Sprints"
              subtitle={
                <span className="text-emerald-400 font-medium">
                  1 Active • 2 Planned
                </span>
              }
              icon={<Milestone className="w-5 h-5" />}
              color="purple"
            />
          </div>
        </div>

        {/* Right Column: Project Members with aligned h-8 header */}
        <div className="space-y-3">
          <div className="h-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Members
              </h2>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                {project.members.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleInviteClick}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-200 transition cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-400" />
              <span>Invite Member</span>
            </button>
          </div>

          {/* Members List */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
            {[
              {
                name: "Alex Rivera",
                role: "Project Supervisor",
                initials: "AR",
                bg: "bg-blue-600",
                email: "alex.rivera@acme.com",
              },
              {
                name: "Sarah Chen",
                role: "Coordinator",
                initials: "SC",
                bg: "bg-emerald-600",
                email: "sarah.chen@acme.com",
              },
              {
                name: "John Doe",
                role: "Contributor",
                initials: "JD",
                bg: "bg-purple-600",
                email: "john.doe@acme.com",
              },
              {
                name: "Elena Rostova",
                role: "Reader",
                initials: "ER",
                bg: "bg-slate-700",
                email: "elena.rostova@acme.com",
              },
              {
                name: "Marcus Vance",
                role: "Contributor",
                initials: "MV",
                bg: "bg-amber-600",
                email: "marcus.vance@acme.com",
              },
            ].map((member) => (
              <div
                key={member.email}
                className="p-3 hover:bg-slate-850/50 transition flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 ${member.bg}`}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {member.email}
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-slate-800/80 text-slate-300 border-slate-700">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsView;
