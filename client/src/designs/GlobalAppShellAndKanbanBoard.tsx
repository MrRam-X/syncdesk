import { useState } from "react";
import {
  Kanban,
  ListTodo,
  Users,
  Settings,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Bell,
  Filter,
  Layers,
  Sparkles,
  X,
  Bookmark,
  CheckSquare,
  SlidersHorizontal,
  Rocket,
  FlaskConical,
  ChevronsUpDown,
} from "lucide-react";

export default function GlobalAppShellAndKanbanBoard() {
  // State for interactive preview
  const [activeTab, setActiveTab] = useState<"taskboard" | "backlog">(
    "taskboard",
  );
  const [selectedSprint, setSelectedSprint] = useState("Sprint 24.1 (Active)");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // All stories collapsed by default as requested
  // Story IDs
  const storyIds = ["story-1", "story-2", "story-3"];
  const [expandedStories, setExpandedStories] = useState<
    Record<string, boolean>
  >({});

  const toggleStory = (storyId: string) => {
    setExpandedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  const areAllCollapsed = storyIds.every((id) => !expandedStories[id]);

  const toggleAllStories = () => {
    if (areAllCollapsed) {
      // Expand all
      setExpandedStories({ "story-1": true, "story-2": true, "story-3": true });
    } else {
      // Collapse all
      setExpandedStories({});
    }
  };

  // Sprint Status Badge Helper
  const renderSprintBadge = () => {
    switch (selectedSprint) {
      case "Sprint 24.1 (Active)":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active • Ends in 6 Days
          </span>
        );
      case "Sprint 23.4 (Completed)":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-500/15 text-slate-300 border border-slate-600/30 text-[11px] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Complete • Ended on 26/10/26
          </span>
        );
      case "Sprint 24.2 (Upcoming)":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Upcoming • Starts on 12/11/26
          </span>
        );
      case "Sprint Backlog (Inactive)":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Inactive • Not Planned
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* ========================================================= */}
      {/* 1. TOP GLOBAL NAVIGATION                                  */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Brand & Workspace Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
              S
            </div>
            <span>Syncdesk</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Project Switcher Dropdown */}
          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-800/80 text-xs font-medium text-slate-200 transition border border-transparent hover:border-slate-700/60">
            <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
              P
            </div>
            <span>Payments Engine</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
              SYNC
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Right: Quick Search, Role Badge, Notifications & Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Project Supervisor</span>
          </div>

          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
          </button>

          <button className="flex items-center gap-2 pl-1 group">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition">
              AR
            </div>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. BODY CONTAINER (Sidebar + Main Workspace)               */}
      {/* ========================================================= */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside className="w-56 border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-6">
            <div>
              <div className="px-2.5 mb-2 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                Planning
              </div>
              <nav className="space-y-1">
                <a
                  href="#board"
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/20 text-xs font-medium shadow-sm transition"
                >
                  <Kanban className="w-4 h-4" />
                  <span>Sprints & Board</span>
                </a>
                <a
                  href="#members"
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition"
                >
                  <Users className="w-4 h-4" />
                  <span>Team Members</span>
                </a>
              </nav>
            </div>

            <div>
              <div className="px-2.5 mb-2 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                Management
              </div>
              <nav className="space-y-1">
                <a
                  href="#projects"
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition"
                >
                  <Layers className="w-4 h-4" />
                  <span>All Projects</span>
                </a>
                <a
                  href="#settings"
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition"
                >
                  <Settings className="w-4 h-4" />
                  <span>Project Settings</span>
                </a>
              </nav>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                v1.0-mvp
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium truncate">
              Acme Corp Workspace
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          {/* ========================================================= */}
          {/* BOARD CONTROL HEADER WITH TABS & RIGHT-ALIGNED FILTERS     */}
          {/* ========================================================= */}
          <div className="border-b border-slate-800/80 bg-slate-900/30 px-6 pt-5 shrink-0">
            {/* Top row: Title line + Sprint Selector & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Projects</span>
                  <span>/</span>
                  <span className="text-slate-300">Payments Engine</span>
                  <span>/</span>
                  <span className="text-blue-400 font-semibold">
                    {selectedSprint}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <h1 className="text-xl font-bold tracking-tight text-white">
                    {selectedSprint}
                  </h1>
                  {renderSprintBadge()}
                </div>
              </div>

              {/* Right Side: Sprint Dropdown + Filter Drawer Toggle + New Story Button */}
              <div className="flex items-center gap-3">
                {/* Sprint Selector Dropdown */}
                <div className="relative">
                  <select
                    value={selectedSprint}
                    onChange={(e) => setSelectedSprint(e.target.value)}
                    className="h-8 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 rounded-lg px-3 pr-8 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                  >
                    <option value="Sprint 24.1 (Active)">
                      Sprint 24.1 (Active)
                    </option>
                    <option value="Sprint 23.4 (Completed)">
                      Sprint 23.4 (Completed)
                    </option>
                    <option value="Sprint 24.2 (Upcoming)">
                      Sprint 24.2 (Upcoming)
                    </option>
                    <option value="Sprint Backlog (Inactive)">
                      Sprint Backlog (Inactive)
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Filter Drawer Toggle Button */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-xs font-medium text-slate-300 transition"
                  title="Open Filters"
                >
                  <Filter className="w-3.5 h-3.5 text-blue-400" />
                  <span>Filters</span>
                </button>

                {/* New User Story Primary Button */}
                <button className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition">
                  <Plus className="w-4 h-4" />
                  <span>New Story</span>
                </button>
              </div>
            </div>

            {/* Bottom row: TABS (With added top padding and margin) */}
            <div className="flex items-center gap-8 border-t border-slate-800/60 pt-3 mt-4">
              <button
                onClick={() => setActiveTab("taskboard")}
                className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition ${
                  activeTab === "taskboard"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Kanban className="w-4 h-4" />
                <span>Task Board</span>
              </button>

              <button
                onClick={() => setActiveTab("backlog")}
                className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition ${
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
            </div>
          </div>

          {/* ========================================================= */}
          {/* AZURE DEVOPS SWIMLANE BOARD VIEW                          */}
          {/* ========================================================= */}
          <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
            {/* INNER WRAPPER: w-fit min-w-full ensures the container ALWAYS encloses all columns at any zoom level */}
            <div className="w-fit min-w-full space-y-4">
              {/* STICKY COLUMN HEADER ROW (Aligned pixel-perfect with swimlanes) */}
              <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 px-4 pb-2 border-b border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                <button
                  onClick={toggleAllStories}
                  className="flex items-center gap-2 px-2 py-1 -ml-2 rounded-md hover:bg-slate-850 hover:text-slate-200 transition text-left text-slate-300 font-semibold"
                  title="Toggle collapse on all stories"
                >
                  <ChevronsUpDown className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{areAllCollapsed ? "Expand All" : "Collapse All"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span>To Do</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Deployed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Done</span>
                </div>
              </div>

              {/* ======================================================= */}
              {/* STORY 1                                                 */}
              {/* ======================================================= */}
              <div className="w-full">
                {!expandedStories["story-1"] ? (
                  <div
                    onClick={() => toggleStory("story-1")}
                    className="w-full px-4 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between cursor-pointer transition select-none"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-xs text-blue-400 font-semibold">
                        SYNC-101
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        Integrate Stripe webhook verification for subscription
                        renewals
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
                        High
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        8 pts
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-mono">
                        4 Tasks
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl items-start">
                    {/* Story Card */}
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg shadow-sm space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleStory("story-1")}
                            className="p-1 -ml-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                            title="Collapse Story"
                          >
                            <ChevronDown className="w-4 h-4 text-blue-400" />
                          </button>
                          <span className="flex items-center gap-1 font-mono text-blue-400 font-semibold">
                            <Bookmark className="w-3.5 h-3.5" />
                            SYNC-101
                          </span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">
                          Story
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                        Integrate Stripe webhook verification for subscription
                        renewals
                      </h4>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <span className="font-mono text-[11px] text-slate-400">
                          8 pts
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400">
                            Sarah Chen
                          </span>
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                            SC
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* To Do with Add Task Button */}
                    <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850 flex flex-col justify-between">
                      <div className="space-y-2">
                        <article className="p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-slate-700 transition cursor-grab">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                            <span className="flex items-center gap-1">
                              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                              SYNC-108
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              2 pts
                            </span>
                          </div>
                          <h5 className="text-xs font-medium text-slate-200 mb-2">
                            Create webhook secret validation middleware
                          </h5>
                          <div className="flex items-center justify-end">
                            <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                              JD
                            </div>
                          </div>
                        </article>
                      </div>

                      <button className="w-full py-2 px-3 mt-2 rounded-lg border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 text-xs text-slate-400 hover:text-blue-400 flex items-center justify-center gap-1.5 transition">
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Task</span>
                      </button>
                    </div>

                    {/* In Progress */}
                    <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850">
                      <article className="p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-slate-700 transition cursor-grab">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1">
                            <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                            SYNC-110
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            3 pts
                          </span>
                        </div>
                        <h5 className="text-xs font-medium text-slate-200 mb-2">
                          Implement customer.subscription.updated handler
                        </h5>
                        <div className="flex items-center justify-end">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                            AR
                          </div>
                        </div>
                      </article>
                    </div>

                    {/* Deployed */}
                    <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850">
                      <article className="p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-slate-700 transition cursor-grab">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1">
                            <Rocket className="w-3.5 h-3.5 text-purple-400" />
                            SYNC-111
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            1 pt
                          </span>
                        </div>
                        <h5 className="text-xs font-medium text-slate-200 mb-2">
                          Deploy webhook endpoint to staging sandbox
                        </h5>
                        <div className="flex items-center justify-end">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                            AR
                          </div>
                        </div>
                      </article>
                    </div>

                    {/* Testing */}
                    <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850">
                      <article className="p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-slate-700 transition cursor-grab">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1">
                            <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                            SYNC-113
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            2 pts
                          </span>
                        </div>
                        <h5 className="text-xs font-medium text-slate-200 mb-2">
                          Simulate Stripe signature failure tests
                        </h5>
                        <div className="flex items-center justify-end">
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                            SC
                          </div>
                        </div>
                      </article>
                    </div>

                    {/* Done */}
                    <div className="min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850 flex items-center justify-center text-[11px] text-slate-600 italic">
                      No tasks done
                    </div>
                  </div>
                )}
              </div>

              {/* ======================================================= */}
              {/* STORY 2                                                 */}
              {/* ======================================================= */}
              <div className="w-full">
                {!expandedStories["story-2"] ? (
                  <div
                    onClick={() => toggleStory("story-2")}
                    className="w-full px-4 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between cursor-pointer transition select-none"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-xs text-blue-400 font-semibold">
                        SYNC-98
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        Implement OAuth2 multi-tenant authentication and session
                        management
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider">
                        Critical
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        13 pts
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-mono">
                        2 Tasks
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl items-start">
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg shadow-sm space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleStory("story-2")}
                            className="p-1 -ml-1 rounded hover:bg-slate-850 text-slate-400 hover:text-slate-200 transition"
                            title="Collapse Story"
                          >
                            <ChevronDown className="w-4 h-4 text-blue-400" />
                          </button>
                          <span className="flex items-center gap-1 font-mono text-blue-400 font-semibold">
                            <Bookmark className="w-3.5 h-3.5" />
                            SYNC-98
                          </span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">
                          Story
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                        Implement OAuth2 multi-tenant authentication and session
                        management
                      </h4>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <span className="font-mono text-[11px] text-slate-400">
                          13 pts
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400">
                            Alex Rivera
                          </span>
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                            AR
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* To Do with Add Task */}
                    <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850 flex flex-col justify-between">
                      <div className="space-y-2">
                        <article className="p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-slate-700 transition cursor-grab">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                            <span className="flex items-center gap-1">
                              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                              SYNC-114
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              5 pts
                            </span>
                          </div>
                          <h5 className="text-xs font-medium text-slate-200 mb-2">
                            Build JWT refresh token rotation mechanism
                          </h5>
                          <div className="flex items-center justify-end">
                            <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                              JD
                            </div>
                          </div>
                        </article>
                      </div>
                      <button className="w-full py-2 px-3 mt-2 rounded-lg border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 text-xs text-slate-400 hover:text-blue-400 flex items-center justify-center gap-1.5 transition">
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Task</span>
                      </button>
                    </div>

                    <div className="min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850 flex items-center justify-center text-[11px] text-slate-600 italic">
                      No tasks
                    </div>
                    <div className="min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850 flex items-center justify-center text-[11px] text-slate-600 italic">
                      No tasks
                    </div>
                    <div className="min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850 flex items-center justify-center text-[11px] text-slate-600 italic">
                      No tasks
                    </div>

                    <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-850">
                      <article className="p-3 bg-slate-900 border border-slate-800 rounded-lg opacity-80 hover:opacity-100 transition cursor-grab">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1 line-through">
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                            SYNC-75
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400">
                            8 pts
                          </span>
                        </div>
                        <h5 className="text-xs font-medium text-slate-300 line-through mb-2">
                          Create PostgreSQL schema
                        </h5>
                        <div className="flex items-center justify-end">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                            AR
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ========================================================= */}
        {/* SLIDE-OVER FILTER DRAWER                                 */}
        {/* ========================================================= */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              onClick={() => setIsFilterDrawerOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            />

            <div className="relative w-80 max-w-full bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">
                    Board Filters
                  </h3>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 flex-1 overflow-y-auto space-y-6 text-xs">
                {/* 1. ACTIVE FILTERS SECTION */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                      Active Filters (3)
                    </label>
                    <button className="text-[10px] text-blue-400 hover:underline">
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]">
                      Assignee: Alex Rivera
                      <X className="w-3 h-3 hover:text-white cursor-pointer" />
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]">
                      Type: Story, Bug
                      <X className="w-3 h-3 hover:text-white cursor-pointer" />
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]">
                      Priority: Critical
                      <X className="w-3 h-3 hover:text-white cursor-pointer" />
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                {/* 2. Keyword Search */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                    Keyword Search
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search title, ID, or description..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* 3. Assignee Dropdown */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                    Assignee
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition">
                      <option value="">All Members</option>
                      <option value="alex">Alex Rivera</option>
                      <option value="sarah">Sarah Chen</option>
                      <option value="john">John Doe</option>
                      <option value="unassigned">Unassigned</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Multi-Select Work Item Type */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                    Work Item Type (Multi-Select)
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { label: "User Stories", count: 8 },
                      { label: "Tasks", count: 14 },
                      { label: "Bugs", count: 3 },
                    ].map((item, idx) => (
                      <label
                        key={item.label}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-slate-300"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked={idx < 2}
                            className="accent-blue-500 rounded"
                          />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {item.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 5. Priority Filters */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                    Priority
                  </label>
                  <div className="space-y-1.5">
                    {["Critical", "High", "Medium", "Low"].map((priority) => (
                      <label
                        key={priority}
                        className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-850 cursor-pointer text-slate-300"
                      >
                        <input
                          type="checkbox"
                          className="accent-blue-500 rounded"
                        />
                        <span>{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
