import { type FC } from "react";
import { Search, ChevronDown } from "lucide-react";

export type WorkItemTypeFilter = "All" | "Story" | "Task" | "Bug";

interface TasksFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: WorkItemTypeFilter;
  onSelectType: (type: WorkItemTypeFilter) => void;
  selectedProject: string;
  onSelectProject: (proj: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  projects?: string[];
  statuses?: string[];
}

const defaultProjects = [
  "All Projects",
  "Payments Engine",
  "Mobile Banking App",
  "Authentication & SSO",
  "Data Platform",
];

const defaultStatuses = [
  "All Statuses",
  "To Do",
  "In Progress",
  "Deployed",
  "Testing",
  "Done",
];

const TasksFilterBar: FC<TasksFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onSelectType,
  selectedProject,
  onSelectProject,
  selectedStatus,
  onSelectStatus,
  projects = defaultProjects,
  statuses = defaultStatuses,
}) => {
  const typeChips: WorkItemTypeFilter[] = ["All", "Story", "Task", "Bug"];

  return (
    <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
      {/* Search Input & Type Filter Chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by title or ID..."
            className="w-56 h-8 bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Type Filter Chips */}
        <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
          {typeChips.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onSelectType(type)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Project & Status Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Project Selector */}
        <div className="relative">
          <select
            value={selectedProject}
            onChange={(e) => onSelectProject(e.target.value)}
            className="h-8 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 rounded-lg px-2.5 pr-7 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
          >
            {projects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Selector */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onSelectStatus(e.target.value)}
            className="h-8 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 rounded-lg px-2.5 pr-7 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default TasksFilterBar;