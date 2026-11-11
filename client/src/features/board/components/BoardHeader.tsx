import { type FC, useState, useRef, useEffect } from "react";
import {
  Kanban,
  ListTodo,
  Users,
  Filter,
  Plus,
  Pencil,
  ChevronDown,
} from "lucide-react";

export type BoardSubTab = "taskboard" | "backlog" | "team-members";

interface BoardHeaderProps {
  projectName: string;
  selectedSprint: string;
  onSelectSprint: (sprint: string) => void;
  activeTab: BoardSubTab;
  onTabChange: (tab: BoardSubTab) => void;
  onOpenFilterDrawer: () => void;
  onOpenNewStoryModal: () => void;
  onOpenEditSprintModal: () => void;
  onOpenCreateSprintModal: () => void;
}

const sprintOptions = [
  {
    name: "Sprint 24.1 (Active)",
    status: "Active",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    name: "Sprint 24.2 (Upcoming)",
    status: "Upcoming",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  {
    name: "Sprint 23.4 (Completed)",
    status: "Completed",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-600/30",
  },
];

const BoardHeader: FC<BoardHeaderProps> = ({
  projectName,
  selectedSprint,
  onSelectSprint,
  activeTab,
  onTabChange,
  onOpenFilterDrawer,
  onOpenNewStoryModal,
  onOpenEditSprintModal,
  onOpenCreateSprintModal,
}) => {
  const [isSprintDropdownOpen, setIsSprintDropdownOpen] = useState(false);
  const sprintDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        sprintDropdownRef.current &&
        !sprintDropdownRef.current.contains(e.target as Node)
      ) {
        setIsSprintDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const renderSprintBadge = () => {
    if (selectedSprint.includes("Active")) {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active • Ends in 6 Days
        </span>
      );
    }
    if (selectedSprint.includes("Upcoming")) {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Upcoming • Starts Nov 4
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-slate-500/15 text-slate-300 border border-slate-600/30 text-[11px] font-semibold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        Completed
      </span>
    );
  };

  return (
    <div className="border-b border-slate-800 bg-slate-900/30 px-6 pt-5 shrink-0 select-none">
      {/* Top line: Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Projects</span>
            <span>/</span>
            <span className="text-slate-300">{projectName}</span>
            <span>/</span>
            <span className="text-blue-400 font-semibold">
              {selectedSprint}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            <h1 className="text-xl font-bold tracking-tight text-white">
              {selectedSprint}
            </h1>
            <button
              type="button"
              onClick={onOpenEditSprintModal}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-850 transition cursor-pointer"
              title="Edit Sprint Details"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            {renderSprintBadge()}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Custom Sprint Dropdown */}
          <div className="relative" ref={sprintDropdownRef}>
            <button
              type="button"
              onClick={() => setIsSprintDropdownOpen(!isSprintDropdownOpen)}
              className="flex items-center gap-2 h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
            >
              <span>{selectedSprint}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isSprintDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="max-h-52 overflow-y-auto space-y-0.5 p-1 text-xs">
                  {sprintOptions.map((s) => (
                    <div
                      key={s.name}
                      onClick={() => {
                        onSelectSprint(s.name);
                        setIsSprintDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition ${
                        selectedSprint === s.name
                          ? "bg-blue-600/15 text-blue-400"
                          : "hover:bg-slate-800 text-slate-200"
                      }`}
                    >
                      <span className="font-medium truncate">{s.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${s.badgeColor}`}
                      >
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-800 bg-slate-950/70">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSprintDropdownOpen(false);
                      onOpenCreateSprintModal();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-600/10 text-blue-400 text-xs font-semibold transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Sprint</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={onOpenFilterDrawer}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 transition cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Filters</span>
          </button>

          {/* New Story Button */}
          <button
            type="button"
            onClick={onOpenNewStoryModal}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Story</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-t border-slate-800 pt-3 mt-4">
        <button
          type="button"
          onClick={() => onTabChange("taskboard")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
            activeTab === "taskboard"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Kanban className="w-4 h-4" />
          <span>Task Board</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("backlog")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
            activeTab === "backlog"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <ListTodo className="w-4 h-4" />
          <span>Backlog</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
            12
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("team-members")}
          className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
            activeTab === "team-members"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Members</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
            4
          </span>
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;
