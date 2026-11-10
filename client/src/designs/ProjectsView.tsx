import { useState } from "react";
import {
  Kanban,
  Layers,
  LayoutDashboard,
  Milestone,
  CheckSquare,
  Compass,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Sparkles,
  ArrowLeft,
  Pencil,
  UserPlus,
  Bookmark,
} from "lucide-react";

export default function ProjectsView() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Tracks selected project for details screen (null = projects list view)
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<
    any | null
  >(null);

  // Sample Projects Data
  const myProjects = [
    {
      name: "Payments Engine",
      key: "SYNC",
      desc: "Core billing pipeline, Stripe webhook integration, and subscription renewals.",
      sprint: "Sprint 24.1 (Active)",
      items: 28,
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "ER", bg: "bg-slate-700" },
        { initials: "MV", bg: "bg-amber-600" },
        { initials: "LS", bg: "bg-rose-600" },
      ],
    },
    {
      name: "Mobile Banking App",
      key: "MOB",
      desc: "Native iOS & Android mobile banking clients with biometric authentication.",
      sprint: "Sprint 12.0 (Active)",
      items: 42,
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "MK", bg: "bg-indigo-600" },
        { initials: "NL", bg: "bg-teal-600" },
      ],
    },
    {
      name: "Mobile Banking App",
      key: "SLKS",
      desc: "Native iOS & Android mobile banking clients with biometric authentication.",
      sprint: "Sprint 12.0 (Active)",
      items: 42,
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "MK", bg: "bg-indigo-600" },
        { initials: "NL", bg: "bg-teal-600" },
      ],
    },
    {
      name: "Mobile Banking App",
      key: "UUII",
      desc: "Native iOS & Android mobile banking clients with biometric authentication.",
      sprint: "Sprint 12.0 (Active)",
      items: 42,
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "MK", bg: "bg-indigo-600" },
        { initials: "NL", bg: "bg-teal-600" },
      ],
    },
    {
      name: "Mobile Banking App",
      key: "EERR",
      desc: "Native iOS & Android mobile banking clients with biometric authentication.",
      sprint: "Sprint 12.0 (Active)",
      items: 42,
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "MK", bg: "bg-indigo-600" },
        { initials: "NL", bg: "bg-teal-600" },
      ],
    },
  ];

  const allProjects = [
    {
      name: "Payments Engine",
      key: "SYNC",
      desc: "Core billing pipeline, Stripe webhook integration, and subscription renewals.",
      status: "Active",
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "ER", bg: "bg-slate-700" },
        { initials: "MV", bg: "bg-amber-600" },
        { initials: "LS", bg: "bg-rose-600" },
      ],
    },
    {
      name: "Mobile Banking App",
      key: "MOB",
      desc: "Native iOS & Android mobile banking clients with biometric authentication.",
      status: "Active",
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "MK", bg: "bg-indigo-600" },
        { initials: "NL", bg: "bg-teal-600" },
      ],
    },
    {
      name: "Authentication & SSO Gateway",
      key: "AUTH",
      desc: "OAuth2 identity provider, session management, token rotation, and SAML integration.",
      status: "Active",
      members: [
        { initials: "AR", bg: "bg-blue-600" },
        { initials: "SC", bg: "bg-emerald-600" },
        { initials: "ER", bg: "bg-slate-700" },
      ],
    },
    {
      name: "Data Platform & Analytics",
      key: "DATA",
      desc: "PostgreSQL change data capture pipelines, ClickHouse aggregation, and reporting.",
      status: "Planned",
      members: [
        { initials: "JD", bg: "bg-purple-600" },
        { initials: "MV", bg: "bg-amber-600" },
        { initials: "LS", bg: "bg-rose-600" },
        { initials: "NL", bg: "bg-teal-600" },
        { initials: "MK", bg: "bg-indigo-600" },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* ========================================================= */}
      {/* STATIC GLOBAL HEADER                                      */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        {/* Left: Brand & Workspace / Current Project */}
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
              placeholder="Search work items... (Ctrl+K)"
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
        {/* STATIC COLLAPSIBLE SIDEBAR                                */}
        {/* ========================================================= */}
        <aside
          className={`border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
            isSidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          {/* Vertical Tab Handle Fused to Border */}
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

                {/* 3. Projects (Active Highlighted) */}
                <div className="relative group">
                  <button className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-blue-600/15 text-blue-400 border border-blue-500/20">
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
                  </button>
                  {isSidebarCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                      Projects
                    </div>
                  )}
                </div>

                {/* 4. Sprints */}
                <div className="relative group">
                  <a
                    href="#sprints"
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors border border-transparent cursor-pointer"
                  >
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
                  </a>
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
            <div className="p-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1 whitespace-nowrap">
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
        {/* MAIN CANVAS: PROJECTS (LIST VIEW OR DETAILS VIEW)         */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">
          {/* ------------------------------------------------------- */}
          {/* VIEW A: PROJECT DETAILS SCREEN                          */}
          {/* ------------------------------------------------------- */}
          {selectedProjectForDetails ? (
            <div className="space-y-6 w-full">
              {/* Top Navigation & Breadcrumb */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProjectForDetails(null)}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Back to Projects"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>Projects</span>
                      <span>/</span>
                      <span className="text-blue-400 font-semibold">
                        {selectedProjectForDetails.key}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 mt-0.5">
                      <h1 className="text-xl font-bold tracking-tight text-white">
                        {selectedProjectForDetails.name}
                      </h1>
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {selectedProjectForDetails.key}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer">
                    <Kanban className="w-3.5 h-3.5" />
                    <span>Open Board</span>
                  </button>
                </div>
              </div>

              {/* 1. "About this project" Section */}
              <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    About this project
                  </h2>
                  <button
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-850 px-2 py-1 rounded-md transition cursor-pointer"
                    title="Edit project details"
                  >
                    <Pencil className="w-3.5 h-3.5 text-blue-400" />
                    <span>Edit</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProjectForDetails.desc} This repository serves as the
                  core operational module for high-throughput transactional
                  flows, automated signature validation, and database state
                  synchronization.
                </p>
              </div>

              {/* ===================================================== */}
              {/* TWO-COLUMN GRID: LEFT = STATS | RIGHT = MEMBERS       */}
              {/* ===================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* --------------------------------------------------- */}
                {/* LEFT COLUMN: PROJECT STATS                          */}
                {/* --------------------------------------------------- */}
                <div className="space-y-3">
                  <div className="h-8 flex items-center">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Project Stats
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* Stat 1: Backlogs */}
                    <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs text-slate-400">
                          Backlog Items
                        </span>
                        <div className="text-xl font-bold font-mono text-white">
                          14
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Unassigned / In planning
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Bookmark className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Stat 2: Work Items */}
                    <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs text-slate-400">
                          Active Work Items
                        </span>
                        <div className="text-xl font-bold font-mono text-white">
                          {selectedProjectForDetails.items || 28}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Tasks, stories & bugs in progress
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckSquare className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Stat 3: Sprints */}
                    <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs text-slate-400">
                          Sprints Iterations
                        </span>
                        <div className="text-xl font-bold font-mono text-white">
                          3 Sprints
                        </div>
                        <p className="text-[11px] text-emerald-400 font-medium">
                          1 Active • 2 Planned
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Milestone className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* RIGHT COLUMN: TEAM MEMBERS                          */}
                {/* --------------------------------------------------- */}
                <div className="space-y-3">
                  <div className="h-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Project Members
                      </h2>
                      <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                        {selectedProjectForDetails.members.length}
                      </span>
                    </div>

                    <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-200 transition cursor-pointer">
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
          ) : (
            /* ------------------------------------------------------- */
            /* VIEW B: ALL PROJECTS LIST (EXISTING SCREEN)             */
            /* ------------------------------------------------------- */
            <>
              {/* Header Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white">
                    Projects
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage repositories, sprint workflows, and team assignments
                    across Acme Corp.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-48 h-8 bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <button className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                  </button>
                </div>
              </div>

              {/* Section 1: My Projects */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      My Projects
                    </h2>
                    <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                      {myProjects.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Projects you are an active member of
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {myProjects.map((proj) => {
                    const extraMembers =
                      proj.members.length > 4 ? proj.members.length - 3 : 0;
                    const visibleMembers =
                      proj.members.length > 4
                        ? proj.members.slice(0, 3)
                        : proj.members.slice(0, 4);

                    return (
                      <div
                        key={proj.key}
                        onClick={() => setSelectedProjectForDetails(proj)}
                        className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl shadow-sm transition group cursor-pointer flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {proj.key}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                              {proj.sprint}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                            {proj.name}
                          </h3>

                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {proj.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                          <span className="text-slate-500 font-mono text-[11px]">
                            {proj.items} Work Items
                          </span>

                          <div className="flex items-center -space-x-1.5 overflow-hidden">
                            {visibleMembers.map((m, i) => (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-full text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-slate-900 ${m.bg}`}
                              >
                                {m.initials}
                              </div>
                            ))}
                            {extraMembers > 0 && (
                              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-[9px] font-bold font-mono flex items-center justify-center ring-2 ring-slate-900">
                                +{extraMembers}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: All Projects */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      All Projects
                    </h2>
                    <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono font-bold">
                      {allProjects.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Complete organization workspace directory
                  </span>
                </div>

                <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
                  {allProjects.map((proj) => {
                    const extraMembers =
                      proj.members.length > 4 ? proj.members.length - 3 : 0;
                    const visibleMembers =
                      proj.members.length > 4
                        ? proj.members.slice(0, 3)
                        : proj.members.slice(0, 4);

                    return (
                      <div
                        key={proj.key}
                        onClick={() => setSelectedProjectForDetails(proj)}
                        className="p-4 hover:bg-slate-850/60 transition group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                              {proj.key}
                            </span>
                            <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition text-xs">
                              {proj.name}
                            </h4>
                            <span
                              className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase ${
                                proj.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              }`}
                            >
                              {proj.status}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 truncate mt-1">
                            {proj.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 sm:self-center">
                          <div className="flex items-center -space-x-1.5 overflow-hidden">
                            {visibleMembers.map((m, i) => (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-full text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-slate-900 ${m.bg}`}
                              >
                                {m.initials}
                              </div>
                            ))}
                            {extraMembers > 0 && (
                              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-[9px] font-bold font-mono flex items-center justify-center ring-2 ring-slate-900">
                                +{extraMembers}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
