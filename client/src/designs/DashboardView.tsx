import { useState } from 'react';
import {
  LayoutDashboard,
  Kanban,
  Layers,
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
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  Bookmark,
  Rocket,
  MessageSquare,
} from 'lucide-react';

export default function DashboardView() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* ========================================================= */}
      {/* STATIC GLOBAL HEADER                                      */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        
        {/* Left: Brand & Workspace */}
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
        {/* COLLAPSIBLE SIDEBAR (Dashboard Active)                    */}
        {/* ========================================================= */}
        <aside
          className={`border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
            isSidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Vertical Tab Handle Fused to Border */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-14 bg-slate-900 hover:bg-slate-800 border-y border-r border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-r-md flex items-center justify-center shadow-md transition-all duration-200 z-40 cursor-pointer group"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
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
                    ? 'max-h-0 opacity-0 -translate-y-1 mb-0'
                    : 'max-h-6 opacity-100 translate-y-0 mb-2'
                }`}
              >
                <div className="px-2.5 text-[10px] font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap">
                  Workspace
                </div>
              </div>

              <nav className="space-y-1">
                {/* 1. Dashboard (Active Highlighted) */}
                <div className="relative group">
                  <button
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-blue-600/15 text-blue-400 border border-blue-500/20"
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                        isSidebarCollapsed
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
                      }`}
                    >
                      Dashboard
                    </span>
                  </button>
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
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
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
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
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
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
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
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
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
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
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
                ? 'max-h-0 opacity-0 pointer-events-none'
                : 'max-h-24 opacity-100'
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
                Acme Corp Workspace
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN CANVAS: DASHBOARD SCREEN (Step 1.9)                  */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">
          
          {/* Welcome Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Acme Corp</span>
                <span>/</span>
                <span className="text-blue-400 font-semibold">Overview</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white mt-1">
                Good morning, Alex Rivera
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Here is a summary of active iterations, team velocity, and your assigned priorities today.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Quick Work Item</span>
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 1. EXECUTIVE KPI STAT CARDS (4 Columns)                 */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Assigned to Me */}
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-medium">Assigned to Me</span>
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <CheckSquare className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-white">4</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="text-blue-400 font-semibold">2 in progress</span>
                <span>•</span>
                <span>2 in review/todo</span>
              </div>
            </div>

            {/* KPI 2: Sprint Velocity */}
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-medium">Active Sprint Velocity</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-white">68%</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span>19 of 28 Story Points completed</span>
              </div>
            </div>

            {/* KPI 3: Open Critical Blockers */}
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-medium">Critical Blockers</span>
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-rose-400">1</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>SYNC-102 (Race condition)</span>
              </div>
            </div>

            {/* KPI 4: Time Remaining in Iteration */}
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-medium">Sprint 24.1 Timeline</span>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-white">6 Days</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>Ends Nov 3, 2026</span>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* 2. SPLIT SECTION: MY PRIORITY TASKS & SPRINT PROGRESS   */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left (2 Columns): My Priority Tasks */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    My Priority Work Items
                  </h2>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                    4
                  </span>
                </div>
                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition cursor-pointer">
                  <span>View all my tasks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks List Container */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
                {[
                  {
                    id: 'SYNC-110',
                    project: 'SYNC',
                    title: 'Implement customer.subscription.updated webhook handler',
                    status: 'In Progress',
                    statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                    priority: 'High',
                    priorityColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    points: 3,
                  },
                  {
                    id: 'SYNC-111',
                    project: 'SYNC',
                    title: 'Deploy webhook endpoint to staging sandbox for E2E validation',
                    status: 'Deployed',
                    statusColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                    priority: 'Medium',
                    priorityColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
                    points: 1,
                  },
                  {
                    id: 'SYNC-102',
                    project: 'SYNC',
                    title: 'Fix card reordering race condition under simulated 3G latency',
                    status: 'In Progress',
                    statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                    priority: 'Critical',
                    priorityColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                    points: 8,
                  },
                  {
                    id: 'MOB-42',
                    project: 'MOB',
                    title: 'Integrate biometric FaceID unlock flow on iOS app',
                    status: 'To Do',
                    statusColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
                    priority: 'High',
                    priorityColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    points: 5,
                  },
                ].map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 hover:bg-slate-900/60 transition group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 shrink-0">
                        {task.project}
                      </span>
                      <span className="font-mono text-blue-400 font-semibold shrink-0">
                        {task.id}
                      </span>
                      <span className="font-medium text-slate-200 truncate group-hover:text-blue-400 transition">
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${task.statusColor}`}>
                        {task.status}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${task.priorityColor}`}>
                        {task.priority}
                      </span>
                      <span className="font-mono text-slate-400 text-[11px] w-10 text-right">
                        {task.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right (1 Column): Sprint Health Card */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Sprint 24.1 Health
              </h2>

              <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Sprint 24.1</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    <strong className="text-slate-300">Goal: </strong>
                    Stripe webhook verification and OAuth2 token rotation architecture.
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Completion</span>
                    <strong className="text-white font-mono">19 / 28 pts (68%)</strong>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full w-[45%]" title="Done (12 pts)" />
                    <div className="bg-blue-500 h-full w-[23%]" title="In Progress (7 pts)" />
                    <div className="bg-slate-700 h-full w-[32%]" title="Remaining (9 pts)" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Done (12)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Active (7)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700" /> To Do (9)
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <a
                    href="#board"
                    className="w-full py-2 rounded-lg bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Kanban className="w-3.5 h-3.5" />
                    <span>Go to Task Board</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* 3. RECENT WORKSPACE ACTIVITY FEED                       */}
          {/* ======================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Recent Workspace Activity
              </h2>
              <span className="text-[11px] text-slate-500 font-mono">Live updates from team</span>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
              {[
                {
                  avatar: 'SC',
                  bg: 'bg-emerald-600',
                  user: 'Sarah Chen',
                  action: 'moved task',
                  item: 'SYNC-111',
                  detail: 'to Deployed sandbox',
                  time: '12m ago',
                  icon: Rocket,
                  color: 'text-purple-400',
                },
                {
                  avatar: 'AR',
                  bg: 'bg-blue-600',
                  user: 'Alex Rivera',
                  action: 'updated description and criteria on story',
                  item: 'SYNC-101',
                  detail: 'Integrate Stripe webhook verification',
                  time: '45m ago',
                  icon: Bookmark,
                  color: 'text-blue-400',
                },
                {
                  avatar: 'JD',
                  bg: 'bg-purple-600',
                  user: 'John Doe',
                  action: 'commented on task',
                  item: 'MOB-42',
                  detail: '"FaceID entitlements configured for sandbox build"',
                  time: '2h ago',
                  icon: MessageSquare,
                  color: 'text-sky-400',
                },
                {
                  avatar: 'MV',
                  bg: 'bg-amber-600',
                  user: 'Marcus Vance',
                  action: 'planned new iteration',
                  item: 'Sprint 24.2',
                  detail: 'Target dates: Nov 4 – Nov 18',
                  time: '4h ago',
                  icon: Milestone,
                  color: 'text-purple-400',
                },
                {
                  avatar: 'ER',
                  bg: 'bg-slate-700',
                  user: 'Elena Rostova',
                  action: 'verified and closed',
                  item: 'SYNC-75',
                  detail: 'Create PostgreSQL database schema',
                  time: 'Yesterday',
                  icon: CheckSquare,
                  color: 'text-emerald-400',
                },
              ].map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 hover:bg-slate-900/50 transition flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${activity.bg}`}>
                        {activity.avatar}
                      </div>

                      <div className="truncate">
                        <span className="font-semibold text-slate-200">{activity.user}</span>{' '}
                        <span className="text-slate-400">{activity.action}</span>{' '}
                        <span className="font-mono text-blue-400 font-semibold">{activity.item}</span>{' '}
                        <span className="text-slate-400 hidden sm:inline">({activity.detail})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 pl-3">
                      <Icon className={`w-3.5 h-3.5 ${activity.color}`} />
                      <span className="text-[11px] text-slate-500 font-mono">{activity.time}</span>
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