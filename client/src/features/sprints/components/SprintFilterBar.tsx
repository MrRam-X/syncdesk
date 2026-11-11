import { type FC } from "react";
import { Plus, ChevronDown } from "lucide-react";

export type SprintStatusFilter = "All" | "Active" | "Planned" | "Completed";

interface SprintFilterBarProps {
  selectedProject: string;
  onSelectProject: (project: string) => void;
  selectedStatus: SprintStatusFilter;
  onSelectStatus: (status: SprintStatusFilter) => void;
  onOpenCreateSprint: () => void;
  projects?: string[];
}

const defaultProjects = [
  "All Projects",
  "Payments Engine",
  "Mobile Banking App",
  "Authentication & SSO",
];

const SprintFilterBar: FC<SprintFilterBarProps> = ({
  selectedProject,
  onSelectProject,
  selectedStatus,
  onSelectStatus,
  onOpenCreateSprint,
  projects = defaultProjects,
}) => {
  const statusOptions: SprintStatusFilter[] = [
    "All",
    "Active",
    "Planned",
    "Completed",
  ];

  return (
    <div className="space-y-4">
      {/* Top Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onSelectStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedStatus === status
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Project Selector & New Sprint Action */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedProject}
              onChange={(e) => onSelectProject(e.target.value)}
              className="h-8 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 rounded-lg px-3 pr-8 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
            >
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={onOpenCreateSprint}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Sprint</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SprintFilterBar;
