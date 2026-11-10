import { useState } from "react";
import {
  LayoutDashboard,
  Kanban,
  Layers,
  Milestone,
  CheckSquare,
  Compass,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import {
  KanbanBoardSkeleton,
  TableSkeleton,
  CardGridSkeleton,
  ButtonSpinner,
} from "./components/Skeletons";

export default function SkeletonsViewStateSwitcher() {
  // Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Active Skeleton Switcher State
  const [activeSkeleton, setActiveSkeleton] = useState<
    "all" | "kanban" | "table" | "cards" | "buttons"
  >("all");

  // Interactive Button Spinner Test State
  const [isSimulatingMutation, setIsSimulatingMutation] = useState(false);

  const triggerButtonLoading = () => {
    setIsSimulatingMutation(true);
    setTimeout(() => setIsSimulatingMutation(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* ========================================================= */}
      {/* STATIC GLOBAL HEADER                                      */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
              S
            </div>
            <span>Syncdesk</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Skeletons Switcher Pills */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium">
            {[
              { id: "all", label: "View All" },
              { id: "kanban", label: "Kanban Board" },
              { id: "table", label: "Table Roster" },
              { id: "cards", label: "Card Grid" },
              { id: "buttons", label: "Button Spinner" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSkeleton(tab.id as any)}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  activeSkeleton === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Skeletons Preview</span>
          </div>

          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition relative cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-2 pl-1 group cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition">
              AR
            </div>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* BODY WRAPPER                                              */}
      {/* ========================================================= */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* COLLAPSIBLE SIDEBAR */}
        <aside
          className={`border-r border-slate-800 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
            isSidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          {/* Vertical Tab Handle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-14 bg-slate-900 hover:bg-slate-800 border-y border-r border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-r-md flex items-center justify-center shadow-md transition-all duration-200 z-40 cursor-pointer group"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="space-y-6">
            <div>
              <div
                className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? "max-h-0 opacity-0" : "max-h-6 opacity-100 mb-2"}`}
              >
                <div className="px-2.5 text-[10px] font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap">
                  Workspace
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { label: "Dashboard", icon: LayoutDashboard },
                  { label: "Board", icon: Kanban },
                  { label: "Projects", icon: Layers },
                  { label: "Sprints", icon: Milestone },
                  { label: "Task Items", icon: CheckSquare },
                  { label: "Planner", icon: Compass },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="relative group">
                      <button
                        className={`w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          idx === 1
                            ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span
                          className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"}`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 whitespace-nowrap">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
              <span className="font-mono text-[10px] text-slate-500">v1.0</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium truncate">
              Acme Corp Workspace
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN CANVAS: SKELETON PREVIEW VIEWPORTS                   */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950 pl-5">
          {/* Header Action Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Components</span>
                <span>/</span>
                <span className="text-blue-400 font-semibold">
                  Skeletons.tsx
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white mt-0.5">
                Reusable Skeleton Loaders
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Layout-matched placeholders preventing Cumulative Layout Shift
                (CLS) during initial API queries.
              </p>
            </div>

            {/* Live Interactive Button Test */}
            <div className="flex items-center gap-3">
              <button
                onClick={triggerButtonLoading}
                disabled={isSimulatingMutation}
                className="flex items-center gap-2 h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-75 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
              >
                {isSimulatingMutation ? (
                  <>
                    <ButtonSpinner className="w-3.5 h-3.5" />
                    <span>Saving to DB...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Test Button Spinner</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/* VIEW 1: KANBAN BOARD SKELETON                           */}
          {/* ======================================================= */}
          {(activeSkeleton === "all" || activeSkeleton === "kanban") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  1. &lt;KanbanBoardSkeleton /&gt;
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">
                  Used in: Sprints & Task Board View
                </span>
              </div>

              <div className="overflow-x-auto p-4 bg-slate-900/20 border border-slate-800 rounded-2xl">
                <KanbanBoardSkeleton />
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* VIEW 2: REUSABLE TABLE SKELETON                         */}
          {/* ======================================================= */}
          {(activeSkeleton === "all" || activeSkeleton === "table") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. &lt;TableSkeleton rows={5} /&gt;
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">
                  Used in: Backlog, Task Items, Employees, Organizations
                </span>
              </div>

              <TableSkeleton rows={5} showHeader={true} />
            </div>
          )}

          {/* ======================================================= */}
          {/* VIEW 3: REUSABLE CARD GRID SKELETON                     */}
          {/* ======================================================= */}
          {(activeSkeleton === "all" || activeSkeleton === "cards") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. &lt;CardGridSkeleton count={3} columns={3} /&gt;
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">
                  Used in: My Projects, Executive KPIs, Project Stats
                </span>
              </div>

              <CardGridSkeleton count={3} columns={3} />
            </div>
          )}

          {/* ======================================================= */}
          {/* VIEW 4: MUTATION BUTTON SPINNERS                        */}
          {/* ======================================================= */}
          {(activeSkeleton === "all" || activeSkeleton === "buttons") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  4. &lt;ButtonSpinner /&gt; (Mutation Loading States)
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">
                  Used inside action buttons during POST / PATCH / DELETE
                </span>
              </div>

              <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl flex flex-wrap items-center gap-4 text-xs">
                {/* Primary Button Loading */}
                <button
                  disabled
                  className="flex items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 text-white font-semibold opacity-80 cursor-not-allowed"
                >
                  <ButtonSpinner className="w-3.5 h-3.5" />
                  <span>Creating Work Item...</span>
                </button>

                {/* Secondary Button Loading */}
                <button
                  disabled
                  className="flex items-center gap-2 h-9 px-4 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 font-semibold opacity-80 cursor-not-allowed"
                >
                  <ButtonSpinner className="w-3.5 h-3.5 text-slate-400" />
                  <span>Saving Changes...</span>
                </button>

                {/* Destructive Button Loading */}
                <button
                  disabled
                  className="flex items-center gap-2 h-9 px-4 rounded-lg bg-rose-600 text-white font-semibold opacity-80 cursor-not-allowed"
                >
                  <ButtonSpinner className="w-3.5 h-3.5" />
                  <span>Deleting Organization...</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
