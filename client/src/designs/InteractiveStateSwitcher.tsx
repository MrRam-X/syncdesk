import { useState } from "react";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  Server,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  X,
  ChevronRight,
  ChevronLeft,
  Bell,
  Sparkles,
  Kanban,
  Layers,
  LayoutDashboard,
  Milestone,
  CheckSquare,
  Compass,
} from "lucide-react";

export default function InteractiveStateSwitcher() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Switcher between resilience prototypes
  const [resilienceView, setResilienceView] = useState<
    "skeletons" | "error-boundary" | "toasts"
  >("skeletons");

  // Interactive Toast states
  const [activeToasts, setActiveToasts] = useState<string[]>([
    "success",
    "error-rollback",
    "warning",
  ]);
  const [showColdStartBanner, setShowColdStartBanner] = useState(true);

  const removeToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t !== id));
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

          {/* Resilience Prototype Selector */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setResilienceView("skeletons")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                resilienceView === "skeletons"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Loading Skeletons
            </button>

            <button
              onClick={() => setResilienceView("error-boundary")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                resilienceView === "error-boundary"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Error Boundary
            </button>

            <button
              onClick={() => setResilienceView("toasts")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                resilienceView === "toasts"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Toasters & Banners
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Resilience Testing Harness</span>
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
        {/* MAIN CANVAS: RESILIENCE PROTOTYPES                        */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {/* ======================================================= */}
          {/* 1. LOADING SKELETONS (Board & Table Placeholders)        */}
          {/* ======================================================= */}
          {resilienceView === "skeletons" && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Header skeleton */}
              <div className="space-y-4 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-40 bg-slate-900 rounded animate-pulse" />
                    <div className="h-6 w-64 bg-slate-900 rounded animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-28 bg-slate-900 rounded-lg animate-pulse" />
                    <div className="h-8 w-32 bg-slate-900 rounded-lg animate-pulse" />
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <div className="h-4 w-24 bg-slate-900 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-slate-900 rounded animate-pulse" />
                  <div className="h-4 w-28 bg-slate-900 rounded animate-pulse" />
                </div>
              </div>

              {/* SECTION A: KANBAN SWIMLANE BOARD SKELETON */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    A. Kanban Swimlane Layout Skeleton (Zero Layout Shift)
                  </span>
                  <span className="text-[11px] text-blue-400 font-mono">
                    Simulating Initial Fetch...
                  </span>
                </div>

                <div className="w-fit min-w-full space-y-4 overflow-x-auto pb-4">
                  {/* Column Header Skeletons */}
                  <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 px-4 pb-2 border-b border-slate-800 select-none">
                    {[
                      "Story",
                      "To Do",
                      "In Progress",
                      "Deployed",
                      "Testing",
                      "Done",
                    ].map((col) => (
                      <div
                        key={col}
                        className="h-4 bg-slate-900 rounded animate-pulse w-24"
                      />
                    ))}
                  </div>

                  {/* Story Row 1 Skeleton */}
                  <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl items-start">
                    {/* Story Card Skeleton */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 animate-pulse">
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-16 bg-slate-800 rounded" />
                        <div className="h-3 w-10 bg-slate-800 rounded" />
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded" />
                      <div className="h-3 w-3/4 bg-slate-800 rounded" />
                      <div className="pt-2 border-t border-slate-800 flex justify-between">
                        <div className="h-3 w-12 bg-slate-800 rounded" />
                        <div className="w-5 h-5 rounded-full bg-slate-800" />
                      </div>
                    </div>

                    {/* Column Skeletons */}
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <div
                        key={idx}
                        className="space-y-2 p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800 min-h-[140px]"
                      >
                        {idx <= 3 && (
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2 animate-pulse">
                            <div className="h-3 w-14 bg-slate-800 rounded" />
                            <div className="h-3 w-full bg-slate-800 rounded" />
                            <div className="flex justify-end">
                              <div className="w-4 h-4 rounded-full bg-slate-800" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Story Row 2 Skeleton (Collapsed bar) */}
                  <div className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-slate-800" />
                      <div className="h-3 w-16 bg-slate-800 rounded" />
                      <div className="h-3 w-64 bg-slate-800 rounded" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-12 bg-slate-800 rounded-full" />
                      <div className="h-3 w-10 bg-slate-800 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: DIRECTORY TABLE SKELETON */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  B. Table Roster Skeleton (Projects, Employees & Tasks)
                </span>

                <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden">
                  <div className="p-3.5 bg-slate-900/80 flex justify-between">
                    <div className="h-3 w-28 bg-slate-800 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-slate-800 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
                  </div>
                  {[1, 2, 3].map((row) => (
                    <div
                      key={row}
                      className="p-4 flex items-center justify-between animate-pulse"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800" />
                        <div className="space-y-1">
                          <div className="h-3 w-36 bg-slate-800 rounded" />
                          <div className="h-2 w-24 bg-slate-800 rounded" />
                        </div>
                      </div>
                      <div className="h-4 w-20 bg-slate-800 rounded-full" />
                      <div className="h-3 w-16 bg-slate-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* 2. REACT ERROR BOUNDARY FALLBACK SCREEN                 */}
          {/* ======================================================= */}
          {resilienceView === "error-boundary" && (
            <div className="flex-1 flex items-center justify-center min-h-[550px] animate-in fade-in zoom-in-95 duration-150">
              <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                {/* Warning Icon Glow */}
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/5">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Something went wrong loading this workspace
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                    An unexpected render error occurred in this view. Your saved
                    changes on the database are safe.
                  </p>
                </div>

                {/* Collapsible Error Debug Details */}
                <div className="text-left bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-rose-400 font-semibold">
                      Error: NetworkPacketDesyncException
                    </span>
                    <span>Code: ERR_BOARD_500</span>
                  </div>
                  <pre className="text-[10px] text-slate-500 font-mono overflow-x-auto leading-relaxed pt-1">
                    {`at KanbanBoard.render (BoardView.tsx:84)
at QueryObserver.notify (queryClient.ts:142)
at Socket.emit (socket.io-client.js:12)`}
                  </pre>
                </div>

                {/* Recovery Actions */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() =>
                      alert("Retrying queries with exponential backoff...")
                    }
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again (Refetch)</span>
                  </button>

                  <button
                    onClick={() => setResilienceView("skeletons")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Go to Dashboard</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 font-mono pt-2">
                  Syncdesk Client v1.0 • Protected by React ErrorBoundary
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* 3. TOAST NOTIFICATIONS & COLD START BANNER SHOWCASE     */}
          {/* ======================================================= */}
          {resilienceView === "toasts" && (
            <div className="space-y-6 max-w-3xl animate-in fade-in duration-150">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white">
                  Toasters & Resilience Banners
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual designs for optimistic rollback toasts, operational
                  confirmations, and server cold-start alerts.
                </p>
              </div>

              {/* Interactive Triggers */}
              <div className="flex flex-wrap gap-2.5 text-xs">
                <button
                  onClick={() =>
                    setActiveToasts((prev) => [...prev, "success"])
                  }
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 font-semibold hover:bg-emerald-600/20 transition cursor-pointer"
                >
                  + Trigger Success Toast
                </button>
                <button
                  onClick={() =>
                    setActiveToasts((prev) => [...prev, "error-rollback"])
                  }
                  className="px-3 py-1.5 rounded-lg bg-rose-600/10 border border-rose-500/20 text-rose-400 font-semibold hover:bg-rose-600/20 transition cursor-pointer"
                >
                  + Trigger Error Rollback Toast
                </button>
                <button
                  onClick={() =>
                    setActiveToasts((prev) => [...prev, "warning"])
                  }
                  className="px-3 py-1.5 rounded-lg bg-amber-600/10 border border-amber-500/20 text-amber-400 font-semibold hover:bg-amber-600/20 transition cursor-pointer"
                >
                  + Trigger Warning Toast
                </button>
                <button
                  onClick={() => setShowColdStartBanner(!showColdStartBanner)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-semibold hover:bg-blue-600/20 transition cursor-pointer"
                >
                  {showColdStartBanner ? "Hide" : "Show"} Cold Start Banner
                </button>
              </div>

              {/* TOAST NOTIFICATION STACK PREVIEWS */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Simulated Sonner Toast Stack (Fluid Physics)
                </span>

                <div className="space-y-3">
                  {/* 1. Success Toast */}
                  {activeToasts.includes("success") && (
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            Sprint 24.1 created successfully
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Added to Payments Engine iteration roadmap.
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeToast("success")}
                        className="text-slate-500 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* 2. Error Rollback Toast with Retry Button (Flagship Portfolio Pattern) */}
                  {activeToasts.includes("error-rollback") && (
                    <div className="p-3.5 bg-slate-900 border border-rose-900/40 rounded-xl shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                          <XCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-rose-400">
                            Task move failed • Reverted to "To Do"
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Network connection timed out. Card position
                            restored.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => alert("Retrying task mutation...")}
                          className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-semibold transition cursor-pointer"
                        >
                          Retry
                        </button>
                        <button
                          onClick={() => removeToast("error-rollback")}
                          className="text-slate-500 hover:text-white p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. Warning Toast */}
                  {activeToasts.includes("warning") && (
                    <div className="p-3.5 bg-slate-900 border border-amber-900/40 rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-amber-400">
                            Unsaved Planner Notes
                          </div>
                          <div className="text-[11px] text-slate-400">
                            You have 1 draft note waiting to be synced to cloud.
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeToast("warning")}
                        className="text-slate-500 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* 4. Info Toast */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          Live Real-Time Sync Active
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Connected to room: project:SYNC over WebSockets.
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Just now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* FLOATING COLD START GRACE BANNER                          */}
      {/* (Appears if query takes > 2.5s while server spins up)     */}
      {/* ========================================================= */}
      {showColdStartBanner && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-3 bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md text-xs">
            <div className="relative">
              <Server className="w-4 h-4 text-blue-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute -top-0.5 -right-0.5 animate-ping" />
            </div>

            <div className="space-y-0.5">
              <div className="font-semibold text-slate-200">
                Waking up free cloud instance...
              </div>
              <div className="text-[11px] text-slate-400">
                Connecting to Neon DB & Render (takes ~3s on first load).
              </div>
            </div>

            <button
              onClick={() => setShowColdStartBanner(false)}
              className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800 transition cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
