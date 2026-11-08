import { useState } from "react";
import {
  Compass,
  LayoutDashboard,
  Kanban,
  Layers,
  Milestone,
  CheckSquare,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Sparkles,
  Bold,
  Italic,
  List,
  Code,
  Trash2,
  Pin,
  Save,
} from "lucide-react";

export default function PlannerView() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sample Saved Notes
  const savedNotes = [
    {
      id: "note-1",
      title: "Sprint 24.1 Standup Notes & Blockers",
      category: "Standup",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      updated: "Just now",
      pinned: true,
      preview:
        "Discuss Redis lock race condition in card reordering. Sync with Sarah on webhook secret verification...",
    },
    {
      id: "note-2",
      title: "Stripe Webhook Signature Verification RFC",
      category: "Architecture",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      updated: "Yesterday",
      pinned: true,
      preview:
        "Ensure timing-safe comparison on HMAC SHA256 digests. Return 400 on malformed payloads before database writes...",
    },
    {
      id: "note-3",
      title: "PostgreSQL Migration Checklist (Neon)",
      category: "Checklist",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      updated: "Oct 28, 2026",
      pinned: false,
      preview:
        "Run drizzle-kit generate, verify SSL pool connections, check index performance on work_items table...",
    },
    {
      id: "note-4",
      title: "Sprint 24.2 Backlog Grooming Ideas",
      category: "Ideas",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      updated: "Oct 25, 2026",
      pinned: false,
      preview:
        "Propose automated retry queues using BullMQ, export CSV velocity reports for management...",
    },
  ];

  // Active selected note
  const [activeNoteId, setActiveNoteId] = useState("note-1");
  const [noteSearch, setNoteSearch] = useState("");

  const activeNote =
    savedNotes.find((n) => n.id === activeNoteId) || savedNotes[0];

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
        {/* COLLAPSIBLE SIDEBAR (Planner Active)                      */}
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

                {/* 6. Planner (Active Highlighted) */}
                <div className="relative group">
                  <button className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-blue-600/15 text-blue-400 border border-blue-500/20">
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
                  </button>
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
        {/* MAIN CANVAS: PERSONAL PLANNER & NOTEBOOK (Step 1.12)       */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950 pl-5">
          {/* Header Action Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Personal</span>
                <span>/</span>
                <span className="text-blue-400 font-semibold">Scratchpad</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white mt-0.5">
                Developer Planner
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-saved to cloud</span>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 2-PANEL NOTEBOOK WORKSPACE                              */}
          {/* ======================================================= */}
          <div className="flex-1 flex overflow-hidden">
            {/* ----------------------------------------------------- */}
            {/* LEFT PANEL: NOTES LIST & EXPLORER (w-80)               */}
            {/* ----------------------------------------------------- */}
            <div className="w-80 border-r border-slate-800 bg-slate-950/60 flex flex-col shrink-0">
              {/* Search & New Note Row */}
              <div className="p-3 border-b border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={noteSearch}
                      onChange={(e) => setNoteSearch(e.target.value)}
                      placeholder="Search notes..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <button
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer"
                    title="New Scratchpad Note"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-mono">
                  <span>{savedNotes.length} Saved Notes</span>
                  <span>Markdown Enabled</span>
                </div>
              </div>

              {/* Saved Notes Scrollable List */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
                {savedNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    className={`p-3.5 cursor-pointer transition flex flex-col justify-between space-y-2 ${
                      activeNoteId === note.id
                        ? "bg-slate-900 border-l-2 border-blue-500"
                        : "hover:bg-slate-900/40 text-slate-300"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${note.tagColor}`}
                        >
                          {note.category}
                        </span>
                        {note.pinned && (
                          <Pin className="w-3 h-3 text-amber-400 shrink-0 rotate-45" />
                        )}
                      </div>

                      <h3 className="text-xs font-bold text-white line-clamp-1">
                        {note.title}
                      </h3>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {note.preview}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">
                      Updated {note.updated}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT PANEL: RICH TEXT / MARKDOWN SCRATCHPAD CANVAS   */}
            {/* ----------------------------------------------------- */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
              {/* Note Header & Toolbar */}
              <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
                {/* Note Meta & Title indicator */}
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${activeNote.tagColor}`}
                  >
                    {activeNote.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Last modified {activeNote.updated}
                  </span>
                </div>

                {/* Rich Formatting Actions Toolbar */}
                <div className="flex items-center gap-1 border border-slate-800 rounded-lg p-1 bg-slate-900/60">
                  <button
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-3 w-px bg-slate-800 mx-0.5" />
                  <button
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Checklist"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Code Block"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-3 w-px bg-slate-800 mx-0.5" />
                  <button
                    className="p-1 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Content Canvas */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl">
                {/* Note Title Input */}
                <input
                  type="text"
                  defaultValue={activeNote.title}
                  className="w-full bg-transparent text-2xl font-extrabold text-white focus:outline-none placeholder-slate-600 border-b border-transparent focus:border-slate-800 pb-2 transition"
                />

                {/* Interactive Sprint Checklist Section */}
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold uppercase text-[10px] tracking-wider text-blue-400">
                      Standup Action Items (3/4 Complete)
                    </span>
                    <span className="font-mono text-[11px]">75% Done</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      {
                        text: "Verify Stripe webhook secret validation in staging sandbox",
                        done: true,
                      },
                      {
                        text: "Simulate network latency drops for optimistic UI rollback",
                        done: true,
                      },
                      {
                        text: "Review PR for Redis distributed lock race condition (SYNC-102)",
                        done: true,
                      },
                      {
                        text: "Discuss story point capacity with Sarah for upcoming Sprint 24.2",
                        done: false,
                      },
                    ].map((item, i) => (
                      <label
                        key={i}
                        className="flex items-start gap-2.5 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={item.done}
                          className="mt-0.5 accent-blue-500 rounded"
                        />
                        <span
                          className={
                            item.done
                              ? "line-through text-slate-500"
                              : "text-slate-200"
                          }
                        >
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Architecture Code Snippet Block */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Signature Verification RFC snippet:</span>
                    <span className="text-slate-500">TypeScript / Node.js</span>
                  </div>
                  <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
                    {`// Validate incoming payload with HMAC SHA256 timing-safe compare
const expectedSignature = crypto
  .createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET)
  .update(payload, 'utf8')
  .digest('hex');

if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
  throw new Error('Invalid signature. Potential replay attack blocked.');
}`}
                  </pre>
                </div>

                {/* Freeform Writing Scratchpad */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Freeform Standup Thoughts & Next Actions
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={`- Need to ask Marcus if Neon serverless autoscaling will be enabled during tomorrow's load test.\n- Confirm with Elena regarding OAuth2 refresh token expiration window (set to 7 days vs 14 days).\n- Clean up dnd-kit collision detection sensors for mobile touch devices.`}
                    className="w-full bg-slate-900/30 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 leading-relaxed font-sans resize-none transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
