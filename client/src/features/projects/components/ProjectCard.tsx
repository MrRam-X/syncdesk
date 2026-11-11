import { type FC } from "react";
import AvatarStack, {
  type MemberAvatar,
} from "@/components/common/AvatarStack";

export interface ProjectItem {
  name: string;
  key: string;
  desc: string;
  sprint?: string;
  items?: number;
  status?: string;
  members: MemberAvatar[];
}

interface ProjectCardProps {
  project: ProjectItem;
  onClick: (project: ProjectItem) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
  const handleClick = () => {
    onClick(project);
  };

  return (
    <div
      onClick={handleClick}
      className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl shadow-sm transition group cursor-pointer flex flex-col justify-between space-y-4 select-none"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {project.key}
          </span>
          {project.sprint && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
              {project.sprint}
            </span>
          )}
        </div>

        <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
          {project.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {project.desc}
        </p>
      </div>

      {/* Card Footer: Work Items counter + AvatarStack with +N */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
        <span className="text-slate-500 font-mono text-[11px]">
          {project.items || 0} Work Items
        </span>

        <AvatarStack members={project.members} max={3} />
      </div>
    </div>
  );
};

export default ProjectCard;
