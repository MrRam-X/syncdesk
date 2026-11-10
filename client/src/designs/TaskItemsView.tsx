import { useState } from 'react';
import {
  CheckSquare,
  LayoutDashboard,
  Kanban,
  Layers,
  Milestone,
  Compass,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Sparkles,
  Bookmark,
  Bug,
} from 'lucide-react';

export default function TaskItemsView() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Story' | 'Task' | 'Bug'>('All');
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Sample Cross-Project Work Items Data
  const workItems = [
    {
      id: 'SYNC-101',
      type: 'Story',
      title: 'Integrate Stripe webhook verification for subscription renewals',
      project: 'Payments Engine',
      projectKey: 'SYNC',
      sprint: 'Sprint 24.1',
      status: 'In Progress',
      priority: 'High',
      points: 8,
      assignee: { name: 'Sarah Chen', initials: 'SC', bg: 'bg-emerald-600' },
    },
    {
      id: 'SYNC-102',
      type: 'Bug',
      title: 'Fix card reordering race condition under simulated 3G latency',
      project: 'Payments Engine',
      projectKey: 'SYNC',
      sprint: 'Sprint 24.1',
      status: 'In Progress',
      priority: 'Critical',
      points: 8,
      assignee: { name: 'Alex Rivera', initials: 'AR', bg: 'bg-blue-600' },
    },
    {
      id: 'MOB-42',
      type: 'Task',
      title: 'Integrate biometric FaceID unlock flow on iOS native app',
      project: 'Mobile Banking App',
      projectKey: 'MOB',
      sprint: 'Sprint 12.0',
      status: 'To Do',
      priority: 'High',
      points: 5,
      assignee: { name: 'Alex Rivera', initials: 'AR', bg: 'bg-blue-600' },
    },
    {
      id: 'SYNC-108',
      type: 'Task',
      title: 'Create webhook secret validation middleware in Express',
      project: 'Payments Engine',
      projectKey: 'SYNC',
      sprint: 'Sprint 24.1',
      status: 'To Do',
      priority: 'Medium',
      points: 2,
      assignee: { name: 'John Doe', initials: 'JD', bg: 'bg-purple-600' },
    },
    {
      id: 'SYNC-111',
      type: 'Task',
      title: 'Deploy webhook endpoint to staging sandbox for E2E validation',
      project: 'Payments Engine',
      projectKey: 'SYNC',
      sprint: 'Sprint 24.1',
      status: 'Deployed',
      priority: 'Medium',
      points: 1,
      assignee: { name: 'Alex Rivera', initials: 'AR', bg: 'bg-blue-600' },
    },
    {
      id: 'SYNC-113',
      type: 'Bug',
      title: 'Simulate Stripe signature failure tests and retry logic',
      project: 'Payments Engine',
      projectKey: 'SYNC',
      sprint: 'Sprint 24.1',
      status: 'Testing',
      priority: 'High',
      points: 2,
      assignee: { name: 'Sarah Chen', initials: 'SC', bg: 'bg-emerald-600' },
    },
    {
      id: 'AUTH-12',
      type: 'Story',
      title: 'Google and GitHub OAuth2 social login provider setup',
      project: 'Authentication & SSO',
      projectKey: 'AUTH',
      sprint: 'Sprint 1.0',
      status: 'To Do',
      priority: 'High',
      points: 13,
      assignee: { name: 'Elena Rostova', initials: 'ER', bg: 'bg-slate-700' },
    },
    {
      id: 'SYNC-75',
      type: 'Task',
      title: 'Create PostgreSQL database schema for multi-tenant users',
      project: 'Payments Engine',
      projectKey: 'SYNC',
      sprint: 'Sprint 23.4',
      status: 'Done',
      priority: 'High',
      points: 8,
      assignee: { name: 'Alex Rivera', initials: 'AR', bg: 'bg-blue-600' },
    },
    {
      id: 'DATA-04',
      type: 'Story',
      title: 'PostgreSQL change data capture pipeline streaming with Debezium',
      project: 'Data Platform',
      projectKey: 'DATA',
      sprint: 'Backlog (Unassigned)',
      status: 'To Do',
      priority: 'Low',
      points: 5,
      assignee: null,
    },
  ];

  // Filtering Logic
  const filteredItems = workItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesProject = selectedProject === 'All Projects' || item.project === selectedProject;
    const matchesStatus = selectedStatus === 'All Statuses' || item.status === selectedStatus;

    return matchesSearch && matchesType && matchesProject && matchesStatus;
  });

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
        {/* COLLAPSIBLE SIDEBAR (Task Items Active)                   */}
        {/* ========================================================= */}
        <aside
          className={`border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
            isSidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Vertical Tab Handle */}
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
                          ? 'max-w-0 opacity-0 -translate-x-2'
                          : 'max-w-[160px] opacity-100 translate-x-0'
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

                {/* 5. Task Items (Active Highlighted) */}
                <div className="relative group">
                  <button
                    className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-blue-600/15 text-blue-400 border border-blue-500/20"
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
                  </button>
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
        {/* MAIN CANVAS: TASK ITEMS SCREEN (Step 1.11)                */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950">
          
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Acme Corp</span>
                <span>/</span>
                <span className="text-blue-400 font-semibold">Directory</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white mt-1">
                Task Items
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore, filter, and audit all stories, tasks, and bugs across every project repository.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>New Work Item</span>
              </button>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 1. TYPE SUMMARY METRIC PILLS                           */}
          {/* ======================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Work Items</span>
                <CheckSquare className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-white">{workItems.length}</div>
            </div>

            <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>User Stories</span>
                <Bookmark className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-400">
                {workItems.filter((i) => i.type === 'Story').length}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Tasks</span>
                <CheckSquare className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-bold font-mono text-indigo-400">
                {workItems.filter((i) => i.type === 'Task').length}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Bugs</span>
                <Bug className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-400">
                {workItems.filter((i) => i.type === 'Bug').length}
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* 2. MULTI-FILTER CONTROL BAR                            */}
          {/* ======================================================= */}
          <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
            
            {/* Search Input & Type Filter Chips */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by title or ID..."
                  className="w-56 h-8 bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Type Filter Chips */}
              <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
                {(['All', 'Story', 'Task', 'Bug'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      selectedType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Project & Status Dropdowns */}
            <div className="flex items-center gap-3">
              {/* Project Filter */}
              <div className="relative">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="h-8 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 rounded-lg px-2.5 pr-7 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                >
                  <option value="All Projects">All Projects</option>
                  <option value="Payments Engine">Payments Engine</option>
                  <option value="Mobile Banking App">Mobile Banking App</option>
                  <option value="Authentication & SSO">Authentication & SSO</option>
                  <option value="Data Platform">Data Platform</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-8 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 rounded-lg px-2.5 pr-7 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Testing">Testing</option>
                  <option value="Done">Done</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* 3. UNIVERSAL TASK ITEMS DIRECTORY TABLE                */}
          {/* ======================================================= */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  <th className="py-3 px-4 w-32">ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4 w-28">Project</th>
                  <th className="py-3 px-4 w-36">Sprint</th>
                  <th className="py-3 px-4 w-32">Status</th>
                  <th className="py-3 px-4 w-28">Priority</th>
                  <th className="py-3 px-4 w-20 text-right">Points</th>
                  <th className="py-3 px-4 w-44">Assignee</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-800">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-900/60 transition group cursor-pointer"
                  >
                    {/* ID Column with Type Icon */}
                    <td className="py-3 px-4 font-mono font-semibold text-blue-400">
                      <div className="flex items-center gap-2">
                        {item.type === 'Story' && <Bookmark className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                        {item.type === 'Task' && <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                        {item.type === 'Bug' && <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                        <span>{item.id}</span>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition line-clamp-1">
                        {item.title}
                      </span>
                    </td>

                    {/* Project */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {item.projectKey}
                      </span>
                    </td>

                    {/* Sprint */}
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px] truncate">
                      {item.sprint}
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                          item.status === 'In Progress'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : item.status === 'Deployed'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : item.status === 'Testing'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : item.status === 'Done'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          item.priority === 'Critical'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : item.priority === 'High'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : item.priority === 'Medium'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* Story Points */}
                    <td className="py-3 px-4 text-right font-mono text-slate-400 text-[11px]">
                      {item.points} pts
                    </td>

                    {/* Assignee */}
                    <td className="py-3 px-4">
                      {item.assignee ? (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 ${item.assignee.bg}`}
                          >
                            {item.assignee.initials}
                          </div>
                          <span className="text-slate-300 font-medium truncate">{item.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Unassigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            {/* Empty Search Result State */}
            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs italic">
                No work items found matching your current filter criteria.
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}