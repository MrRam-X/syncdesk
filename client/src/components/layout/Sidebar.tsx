import {
  LayoutDashboard,
  Kanban,
  Layers,
  Milestone,
  CheckSquare,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type NavItem =
  | "dashboard"
  | "board"
  | "projects"
  | "sprints"
  | "tasks"
  | "planner";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentNav: NavItem;
  onNavChange: (nav: NavItem) => void;
  workspaceName?: string;
}

const navItems: {
  id: NavItem;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "board", label: "Board", icon: Kanban },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "sprints", label: "Sprints", icon: Milestone },
  { id: "tasks", label: "Task Items", icon: CheckSquare },
  { id: "planner", label: "Planner", icon: Compass },
];

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  currentNav,
  onNavChange,
  workspaceName = "Acme Corp Workspace",
}: SidebarProps) {
  return (
    <aside
      className={`border-r border-slate-800 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Sleek Vertical Tab Handle Fused to Border */}
      <button
        onClick={onToggleCollapse}
        className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-14 bg-slate-900 hover:bg-slate-800 border-y border-r border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-r-md flex items-center justify-center shadow-md transition-all duration-200 z-40 cursor-pointer group"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>

      <div className="space-y-6">
        <div>
          {/* Section Heading */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "max-h-0 opacity-0 -translate-y-1 mb-0"
                : "max-h-6 opacity-100 translate-y-0 mb-2"
            }`}
          >
            <div className="px-2.5 text-[10px] font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap">
              Workspace
            </div>
          </div>

          {/* Navigation Links with Smooth Text Width Collapse */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentNav === item.id;
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => onNavChange(item.id)}
                    className={`w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>

                  {/* Tooltip on Collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-24 opacity-100"
        }`}
      >
        <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 whitespace-nowrap">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
            <span className="font-mono text-[10px] text-slate-500">v1.0</span>
          </div>
          <div className="text-[11px] text-slate-300 font-medium truncate">
            {workspaceName}
          </div>
        </div>
      </div>
    </aside>
  );
}
