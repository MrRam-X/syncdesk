import { useState } from "react";
import {
  Milestone,
  LayoutDashboard,
  Kanban,
  Layers,
  CheckSquare,
  Compass,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function SprintsView() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filter state for cross-project sprints
  const [selectedProjectFilter, setSelectedProjectFilter] =
    useState("All Projects");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    "All" | "Active" | "Planned" | "Completed"
  >("All");

  // Sample Sprints Data across the organization
  const allSprints = [
    {
      id: "sp-1",
      name: "Sprint 24.1",
      project: "Payments Engine",
      projectKey: "SYNC",
      status: "Active",
      startDate: "Oct 20, 2026",
      endDate: "Nov 3, 2026",
      daysLeft: "6 Days Left",
      goal: "Integrate Stripe webhook verification and token rotation architecture.",
      completedPoints: 19,
      totalPoints: 28,
      itemsCount: 8,
    },
    {
      id: "sp-2",
      name: "Sprint 12.0",
      project: "Mobile Banking App",
      projectKey: "MOB",
      status: "Active",
      startDate: "Oct 25, 2026",
      endDate: "Nov 8, 2026",
      daysLeft: "11 Days Left",
      goal: "Native biometric FaceID unlock and offline transaction caching.",
      completedPoints: 32,
      totalPoints: 42,
      itemsCount: 12,
    },
    {
      id: "sp-3",
      name: "Sprint 24.2",
      project: "Payments Engine",
      projectKey: "SYNC",
      status: "Planned",
      startDate: "Nov 4, 2026",
      endDate: "Nov 18, 2026",
      daysLeft: "Starts in 7 Days",
      goal: "Automated database snapshot backups and payment retry engine.",
      completedPoints: 0,
      totalPoints: 15,
      itemsCount: 5,
    },
    {
      id: "sp-4",
      name: "Sprint 1.0",
      project: "Authentication & SSO",
      projectKey: "AUTH",
      status: "Planned",
      startDate: "Nov 1, 2026",
      endDate: "Nov 15, 2026",
      daysLeft: "Starts in 4 Days",
      goal: "Initial Google and GitHub OAuth identity provider integration.",
      completedPoints: 0,
      totalPoints: 21,
      itemsCount: 6,
    },
    {
      id: "sp-5",
      name: "Sprint 23.4",
      project: "Payments Engine",
      projectKey: "SYNC",
      status: "Completed",
      startDate: "Oct 6, 2026",
      endDate: "Oct 19, 2026",
      daysLeft: "Ended Oct 19",
      goal: "Database schema design and initial Vite monorepo scaffolding.",
      completedPoints: 24,
      totalPoints: 24,
      itemsCount: 7,
    },
  ];

  // Filter logic
  const filteredSprints = allSprints.filter((sprint) => {
    const matchesProject =
      selectedProjectFilter === "All Projects" ||
      sprint.project === selectedProjectFilter;
    const matchesStatus =
      selectedStatusFilter === "All" || sprint.status === selectedStatusFilter;
    return matchesProject && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* ========================================================= */}
      {/* STATIC GLOBAL HEADER                                      */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        {/* Left: Brand & Current Workspace */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
              S
            </div>
            <span>Syncdesk</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-800/80 text-xs font-medium text-slate-200 transition border border-transparent hover:border-slate-700/60 cursor-pointer">
            <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
              P
            </div>
            <span className="font-semibold">Payments Engine</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
              SYNC
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Right: Search, Role Badge, Notifications & Profile Avatar */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sprints, tasks... (Ctrl+K)"
              className="w-56 h-8 bg-slate-950/60 border border-slate-800 rounded-lg pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 transition"
              readOnly
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Project Supervisor</span>
          </div>

          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition relative cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
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
        {/* ========================================================= */}
        {/* COLLAPSIBLE SIDEBAR (Sprints Active)                      */}
        {/* ========================================================= */}
        <aside
          className={`border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
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
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            )}
          </button>

          <div className="space-y-6">
            <div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSidebarCollapsed
                    ? "max-h-0 opacity-0 -translate-y-1 mb-0"
                    : "max-h-6 opacity-100 translate-y-0 mb-2"
                }`}
              >
                <div className="px-2.5 text-[10px] font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap">
                  Workspace
                </div>
              </div>

              <nav className="space-y-1">
                {/* 1. Dashboard */}
                <div className="relative group">
                  <a
                    href="#dashboard"
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      Dashboard
                    </span>
                  </a>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Dashboard
                    </div>
                  )}
                </div>

                {/* 2. Board */}
                <div className="relative group">
                  <a
                    href="#board"
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent cursor-pointer"
                  >
                    <Kanban className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      Board
                    </span>
                  </a>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Board
                    </div>
                  )}
                </div>

                {/* 3. Projects */}
                <div className="relative group">
                  <a
                    href="#projects"
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent cursor-pointer"
                  >
                    <Layers className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      Projects
                    </span>
                  </a>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Projects
                    </div>
                  )}
                </div>

                {/* 4. Sprints (Active Highlighted) */}
                <div className="relative group">
                  <button className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-blue-600/15 text-blue-400 border border-blue-500/20">
                    <Milestone className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      Sprints
                    </span>
                  </button>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Sprints
                    </div>
                  )}
                </div>

                {/* 5. Task Items */}
                <div className="relative group">
                  <a
                    href="#tasks"
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent cursor-pointer"
                  >
                    <CheckSquare className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      Task Items
                    </span>
                  </a>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Task Items
                    </div>
                  )}
                </div>

                {/* 6. Planner */}
                <div className="relative group">
                  <a
                    href="#planner"
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent cursor-pointer"
                  >
                    <Compass className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? "max-w-0 opacity-0 -translate-x-2"
                          : "max-w-[160px] opacity-100 translate-x-0"
                      }`}
                    >
                      Planner
                    </span>
                  </a>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Planner
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* Footer Workspace Info */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSidebarCollapsed
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
                <span className="font-mono text-[10px] text-slate-500">
                  v1.0
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium truncate">
                Acme Corp Workspace
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN CANVAS: GLOBAL SPRINTS SCREEN (Step 1.10)            */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Acme Corp</span>
                <span>/</span>
                <span className="text-blue-400 font-semibold">Iterations</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white mt-1">
                Sprints
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitor timelines, sprint goals, and velocity completion across
                all projects.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Project Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="h-8 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 rounded-lg px-3 pr-8 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                >
                  <option value="All Projects">All Projects</option>
                  <option value="Payments Engine">
                    Payments Engine (SYNC)
                  </option>
                  <option value="Mobile Banking App">
                    Mobile Banking App (MOB)
                  </option>
                  <option value="Authentication & SSO">
                    Authentication & SSO (AUTH)
                  </option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>New Sprint</span>
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 1. TOP METRIC COUNTERS                                  */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">
                  Active Iterations
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  2 Sprints
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">
                  Currently in flight
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">
                  Points in Progress
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  70 Story Pts
                </div>
                <p className="text-[11px] text-slate-500">
                  Across 20 work items
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400">
                  Planned Backlog Pool
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  36 Story Pts
                </div>
                <p className="text-[11px] text-sky-400 font-medium">
                  2 upcoming sprints queued
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Milestone className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 2. STATUS FILTER CHIPS & SPRINT LISTINGS               */}
          {/* ======================================================= */}
          <div className="space-y-4">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2">
              {(["All", "Active", "Planned", "Completed"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedStatusFilter === status
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>

            {/* Sprints Container */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
              {filteredSprints.map((sprint) => {
                const completionPercentage =
                  sprint.totalPoints > 0
                    ? Math.round(
                        (sprint.completedPoints / sprint.totalPoints) * 100,
                      )
                    : 0;

                return (
                  <div
                    key={sprint.id}
                    className="p-5 hover:bg-slate-900/60 transition group flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                  >
                    {/* Left: Sprint Name, Project Key, Goal & Dates */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {sprint.projectKey}
                        </span>

                        <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition">
                          {sprint.name}
                        </h3>

                        <span className="text-xs text-slate-400">
                          ({sprint.project})
                        </span>

                        {/* Status Tag */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            sprint.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : sprint.status === "Planned"
                                ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                : "bg-slate-500/15 text-slate-300 border-slate-600/30"
                          }`}
                        >
                          {sprint.status}
                        </span>
                      </div>

                      {/* Sprint Goal */}
                      <p className="text-xs text-slate-400 line-clamp-1">
                        <strong className="text-slate-300 font-medium">
                          Goal:{" "}
                        </strong>
                        {sprint.goal}
                      </p>

                      {/* Dates and Countdown */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {sprint.startDate} – {sprint.endDate}
                          </span>
                        </span>
                        <span>•</span>
                        <span
                          className={
                            sprint.status === "Active"
                              ? "text-emerald-400 font-semibold"
                              : "text-slate-400"
                          }
                        >
                          {sprint.daysLeft}
                        </span>
                      </div>
                    </div>

                    {/* Right: Progress Bar & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 lg:w-80">
                      {/* Completion Progress Bar */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-medium">
                            Velocity
                          </span>
                          <span className="font-mono text-white font-bold">
                            {sprint.completedPoints} / {sprint.totalPoints} pts
                            ({completionPercentage}%)
                          </span>
                        </div>

                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              sprint.status === "Completed"
                                ? "bg-emerald-500"
                                : sprint.status === "Active"
                                  ? "bg-blue-500"
                                  : "bg-slate-700"
                            }`}
                            style={{ width: `${completionPercentage}%` }}
                          />
                        </div>

                        <div className="text-[10px] text-slate-500 font-mono text-right">
                          {sprint.itemsCount} work items linked
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-2">
                        {sprint.status === "Active" ? (
                          <a
                            href="#board"
                            className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                          >
                            <span>Board</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : sprint.status === "Planned" ? (
                          <button className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition cursor-pointer">
                            Start
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
