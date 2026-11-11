import { type FC } from "react";
import AvatarStack from "@/components/common/AvatarStack";
import { type ProjectItem } from "./ProjectCard";

interface ProjectRowProps {
  project: ProjectItem;
  onClick: (project: ProjectItem) => void;
}

const ProjectRow: FC<ProjectRowProps> = ({ project, onClick }) => {
  const handleClick = () => {
    onClick(project);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 hover:bg-slate-900/60 transition group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs select-none"
    >
      {/* Left: Key, Title & Description directly below it */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
            {project.key}
          </span>
          <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition text-xs">
            {project.name}
          </h4>
          {project.status && (
            <span
              className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase ${
                project.status === "Active"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
              }`}
            >
              {project.status}
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-400 truncate mt-1">
          {project.desc}
        </p>
      </div>

      {/* Right side along description line: Stacked Member Avatars */}
      <div className="flex items-center gap-4 shrink-0 sm:self-center">
        <AvatarStack members={project.members} max={3} />
      </div>
    </div>
  );
};

export default ProjectRow;
