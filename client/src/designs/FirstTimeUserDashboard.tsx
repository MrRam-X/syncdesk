import { useState } from 'react';
import {
  LayoutDashboard,
  Kanban,
  Layers,
  Milestone,
  CheckSquare,
  Compass,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Sparkles,
  Rocket,
  BookOpen,
  Inbox,
  ArrowRight,
  FolderPlus,
  ShieldCheck,
} from 'lucide-react';

export default function FirstTimeUserDashboard() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* ========================================================= */}
      {/* STATIC GLOBAL HEADER (First-Time User State)              */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        
        {/* Left: Brand & "No Project Selected" Empty Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
              S
            </div>
            <span>Syncdesk</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Empty Project Selector Indicator */}
          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-800/80 text-xs font-medium text-slate-400 hover:text-slate-200 transition border border-dashed border-slate-800 hover:border-slate-700 cursor-pointer">
            <FolderPlus className="w-4 h-4 text-slate-500" />
            <span className="italic">No Project Selected</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
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

          {/* New Member Role Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-medium text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Contributor • Acme Corp</span>
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

        {/* ========================================================= */}
        {/* COLLAPSIBLE SIDEBAR                                       */}
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
                {/* 1. Dashboard (Active) */}
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
        {/* MAIN CANVAS: FIRST-TIME USER ONBOARDING DASHBOARD         */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">
          
          {/* 1. HERO ONBOARDING BANNER */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-900/40 border border-blue-500/20 rounded-2xl shadow-xl overflow-hidden">
            <div className="max-w-2xl space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome to Acme Corp on Syncdesk</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Welcome aboard, Alex Rivera!
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You are registered in the <strong className="text-white">Acme Corp</strong> workspace, but you haven't been assigned to any projects yet. Discover active teams below or contact your Project Supervisor to get assigned to a project sprint.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Browse Organization Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button className="px-3.5 py-2 rounded-lg border border-slate-700/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition cursor-pointer">
                  Request Project Access
                </button>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none hidden md:block">
              <Rocket className="w-64 h-64 text-blue-400" />
            </div>
          </div>

          {/* ======================================================= */}
          {/* 2. THREE ACTIONABLE GETTING STARTED CARDS               */}
          {/* ======================================================= */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Getting Started Checklist
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1: Explore Projects */}
              <div className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between space-y-4 group">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                    1. Explore Active Projects
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Check out active repositories like <strong className="text-slate-300">Payments Engine</strong> or <strong className="text-slate-300">Mobile Banking</strong> and meet team leads.
                  </p>
                </div>

                <a
                  href="#projects"
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 transition pt-2"
                >
                  <span>View directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2: Understand Agile Sprints */}
              <div className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between space-y-4 group">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                    <Kanban className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                    2. Learn the Taskboard Flow
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Understand how user stories move across <strong className="text-slate-300">To Do</strong>, <strong className="text-slate-300">In Progress</strong>, <strong className="text-slate-300">Deployed</strong>, and <strong className="text-slate-300">Testing</strong> columns.
                  </p>
                </div>

                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 transition pt-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learn workflow</span>
                </span>
              </div>

              {/* Card 3: Personal Planner & Notes */}
              <div className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between space-y-4 group">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition">
                    3. Use Your Personal Planner
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Use your private notebook to take daily standup notes, plan sprint objectives, or keep personal checklists.
                  </p>
                </div>

                <a
                  href="#planner"
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1.5 transition pt-2"
                >
                  <span>Open Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* ======================================================= */}
          {/* 3. ZERO-STATE WORKSPACE CONTAINERS                     */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Left: Empty Assigned Tasks Card */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Assigned Work Items
              </h2>

              <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                  <Inbox className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">No tasks assigned yet</h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Once a Project Supervisor adds you to a project and assigns work items in an active sprint, they will appear here.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Empty Sprint Progress Card */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Iteration Velocity
              </h2>

              <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                  <Milestone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">No active sprint tracking</h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    You are not linked to any active sprint iterations. Join a project team to monitor burn-down rates and sprint goals.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}