import { useState, useRef, useEffect } from "react";
import {
  Kanban,
  ListTodo,
  Users,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
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
  Calendar,
  Pencil,
  LayoutDashboard,
  Milestone,
  Compass,
  Check,
  User,
  LogOut,
  Moon,
  MessageSquare,
} from "lucide-react";

export default function UpdatedHeaderMenuWithLayout() {
  // State for interactive preview
  const [activeTab, setActiveTab] = useState<
    "taskboard" | "backlog" | "team-members"
  >("taskboard");
  const [selectedSprint, setSelectedSprint] = useState("Sprint 24.1 (Active)");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // All stories collapsed by default as requested
  // Story IDs
  const storyIds = ["story-1", "story-2", "story-3"];
  const [expandedStories, setExpandedStories] = useState<
    Record<string, boolean>
  >({});

  // Selected story for the detail modal (null = modal closed)
  const [selectedStoryModal, setSelectedStoryModal] = useState<any | null>(
    null,
  );

  // Controls the "Create New Story" modal
  const [isNewStoryModalOpen, setIsNewStoryModalOpen] = useState(false);

  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Custom Sprint Dropdown & Modal state
  const [isSprintDropdownOpen, setIsSprintDropdownOpen] = useState(false);
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [sprintModalMode, setSprintModalMode] = useState<"create" | "edit">(
    "create",
  );
  // Header Popups & Dropdown States
  const [selectedProject, setSelectedProject] = useState({
    name: "Payments Engine",
    key: "SYNC",
  });
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Refs for detecting clicks outside popups
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(target)
      ) {
        setIsProjectDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample stories for the selected sprint / backlog
  const backlogStories = [
    {
      id: "SYNC-101",
      title: "Integrate Stripe webhook verification for subscription renewals",
      description:
        "Validate incoming Stripe webhook signatures using HMAC SHA256 before updating database rows. Handle failed attempts and send alerts to the monitoring channel.",
      status: "In Progress",
      priority: "High",
      points: 8,
      assignee: { name: "Sarah Chen", initials: "SC", bg: "bg-emerald-600" },
      tasks: [
        {
          id: "SYNC-108",
          title: "Create webhook secret validation middleware",
          status: "To Do",
          points: 2,
          assignee: "JD",
        },
        {
          id: "SYNC-110",
          title: "Implement customer.subscription.updated handler",
          status: "In Progress",
          points: 3,
          assignee: "AR",
        },
        {
          id: "SYNC-111",
          title: "Deploy webhook endpoint to staging sandbox",
          status: "Deployed",
          points: 1,
          assignee: "AR",
        },
        {
          id: "SYNC-113",
          title: "Simulate Stripe signature failure tests",
          status: "Testing",
          points: 2,
          assignee: "SC",
        },
      ],
    },
    {
      id: "SYNC-98",
      title:
        "Implement OAuth2 multi-tenant authentication and session management",
      description:
        "Support Google and GitHub single sign-on with organization isolation. Implement token rotation with short-lived access tokens and refresh tokens.",
      status: "In Progress",
      priority: "Critical",
      points: 13,
      assignee: { name: "Alex Rivera", initials: "AR", bg: "bg-blue-600" },
      tasks: [
        {
          id: "SYNC-114",
          title: "Build JWT refresh token rotation mechanism",
          status: "To Do",
          points: 5,
          assignee: "JD",
        },
        {
          id: "SYNC-75",
          title: "Create PostgreSQL database schema for multi-tenant users",
          status: "Done",
          points: 8,
          assignee: "AR",
        },
      ],
    },
    {
      id: "SYNC-104",
      title: "Design customer billing and invoice download portal",
      description:
        "Allow org owners to view billing cycle history and download PDF invoices directly from the settings panel.",
      status: "Planning",
      priority: "Medium",
      points: 5,
      assignee: { name: "John Doe", initials: "JD", bg: "bg-purple-600" },
      tasks: [],
    },
    {
      id: "SYNC-112",
      title:
        "Configure automated PostgreSQL backup snapshots and point-in-time recovery",
      description:
        "Set up daily Neon backup branches and automated verification health check pings.",
      status: "Planning",
      priority: "Low",
      points: 3,
      assignee: null,
      tasks: [],
    },
  ];

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
      {/* 1. TOP GLOBAL NAVIGATION WITH INTERACTIVE POPOVERS        */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        {/* Left: Brand & Custom Project Selection Dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
              S
            </div>
            <span>Syncdesk</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* CUSTOM PROJECT SELECTOR DROPDOWN (No create button per design) */}
          {/* CUSTOM PROJECT SELECTOR DROPDOWN */}
          <div className="relative" ref={projectDropdownRef}>
            <button
              onClick={() => {
                setIsProjectDropdownOpen(!isProjectDropdownOpen);
                setIsNotificationsOpen(false);
                setIsProfileOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-800/80 text-xs font-medium text-slate-200 transition border border-transparent hover:border-slate-700/60 cursor-pointer"
            >
              <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                {selectedProject.key[0]}
              </div>
              <span className="font-semibold">{selectedProject.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                {selectedProject.key}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProjectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-slate-800/60 text-[11px] font-semibold text-slate-400 px-3 uppercase tracking-wider">
                  Select Project
                </div>
                {/* Scrollable Project Items */}
                <div className="max-h-56 overflow-y-auto space-y-0.5 p-1 text-xs">
                  {[
                    {
                      name: "Payments Engine",
                      key: "SYNC",
                      description: "Stripe, PayPal & billing pipeline",
                    },
                    {
                      name: "Mobile Banking App",
                      key: "MOB",
                      description: "iOS & Android client apps",
                    },
                    {
                      name: "Authentication & SSO",
                      key: "AUTH",
                      description: "OAuth2 and tenant identity gateway",
                    },
                    {
                      name: "Data Platform & Analytics",
                      key: "DATA",
                      description: "Postgres CDC pipelines and warehouse",
                    },
                  ].map((project) => (
                    <div
                      key={project.key}
                      onClick={() => {
                        setSelectedProject({
                          name: project.name,
                          key: project.key,
                        });
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`flex items-start justify-between p-2.5 rounded-lg cursor-pointer transition ${
                        selectedProject.key === project.key
                          ? "bg-blue-600/15 text-blue-400"
                          : "hover:bg-slate-850 text-slate-200"
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs truncate">
                            {project.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {project.key}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {project.description}
                        </p>
                      </div>
                      {selectedProject.key === project.key && (
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Search, Role Badge, Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search work items... (Ctrl+K)"
              className="w-56 h-8 bg-slate-950/60 border border-slate-800 rounded-lg pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 transition"
              readOnly
            />
          </div>

          {/* Active Sub-Role Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Project Supervisor</span>
          </div>

          {/* NOTIFICATIONS BELL & POPOVER */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
                setIsProjectDropdownOpen(false);
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
            </button>

            {isNotificationsOpen && (
              <>
                <div className="absolute right-0 top-full mt-1.5 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        Notifications
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-semibold">
                        3 New
                      </span>
                    </div>
                    <button className="text-[11px] text-blue-400 hover:underline cursor-pointer">
                      Mark all read
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-850 text-xs">
                    {[
                      {
                        title: "Sarah Chen assigned a task to you",
                        detail:
                          "SYNC-110: Implement customer.subscription.updated",
                        time: "10m ago",
                        unread: true,
                        icon: CheckSquare,
                        color: "text-blue-400",
                      },
                      {
                        title: "Mentioned in SYNC-102",
                        detail:
                          '"@Alex Rivera can you review the Redis lock race condition?"',
                        time: "45m ago",
                        unread: true,
                        icon: MessageSquare,
                        color: "text-purple-400",
                      },
                      {
                        title: "Sprint 24.1 started",
                        detail:
                          "Sprint goal: Deliver webhook verification and token rotation.",
                        time: "2h ago",
                        unread: true,
                        icon: Rocket,
                        color: "text-emerald-400",
                      },
                      {
                        title: "Deployment successful",
                        detail: "SYNC-111 deployed to staging sandbox",
                        time: "Yesterday",
                        unread: false,
                        icon: Rocket,
                        color: "text-slate-400",
                      },
                    ].map((notif, index) => {
                      const Icon = notif.icon;
                      return (
                        <div
                          key={index}
                          className={`p-3 hover:bg-slate-850/60 transition cursor-pointer flex gap-3 ${
                            notif.unread ? "bg-slate-950/30" : ""
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg bg-slate-800/80 shrink-0 h-fit ${notif.color}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-semibold text-slate-200 text-xs truncate">
                                {notif.title}
                              </span>
                              {notif.unread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {notif.detail}
                            </p>
                            <span className="text-[10px] text-slate-500 mt-1 block">
                              {notif.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-slate-800 bg-slate-950/60 text-center">
                    <button className="text-[11px] text-slate-400 hover:text-slate-200 font-medium cursor-pointer">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* USER PROFILE AVATAR & POPOVER */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
                setIsProjectDropdownOpen(false);
              }}
              className="flex items-center gap-2 pl-1 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition">
                AR
              </div>
            </button>

            {isProfileOpen && (
              <>
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
                  {/* User Profile Info Card */}
                  <div className="p-3.5 border-b border-slate-800 bg-slate-950/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        AR
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white text-xs truncate">
                          Alex Rivera
                        </div>
                        <div className="text-[11px] text-slate-400 truncate font-mono">
                          alex.rivera@acme.com
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/60">
                      <span className="text-slate-500">Workspace:</span>
                      <strong className="text-slate-300">Acme Corp</strong>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Sub-Role:</span>
                      <span className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
                        Project Supervisor
                      </span>
                    </div>
                  </div>

                  {/* Profile Menu Actions */}
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-850 transition cursor-pointer text-left"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Profile & Settings</span>
                    </button>

                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-850 transition cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Moon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Theme Preference</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        Dark
                      </span>
                    </button>
                  </div>

                  {/* Logout Row */}
                  <div className="p-1 border-t border-slate-800 bg-slate-950/40">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        alert("Logout clicked");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition cursor-pointer text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. BODY CONTAINER (Sidebar + Main Workspace)               */}
      {/* ========================================================= */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ========================================================= */}
        {/* COLLAPSIBLE SIDEBAR WITH FLUID TRANSITION & VERTICAL TAB  */}
        {/* ========================================================= */}
        <aside
          className={`border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
            isSidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          {/* SLEEK VERTICAL TAB HANDLE FUSED TO THE BORDER */}
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
              {/* Animated Section Header */}
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
                {/* 1. Dashboard (Top) */}
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

                {/* 2. Board (Renamed from Sprints & Board) */}
                <div className="relative group">
                  <button
                    onClick={() => setActiveTab("taskboard")}
                    className={`w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === "taskboard"
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                    }`}
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
                  </button>
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

                {/* 4. Sprints (New) */}
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

                {/* 5. Task Items (New) */}
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

                {/* 6. Planner (New) */}
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

          {/* Footer Workspace Info with Smooth Fade & Height Collapse */}
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

        {/* MAIN WORKSPACE */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          {/* ========================================================= */}
          {/* BOARD CONTROL HEADER WITH TABS & RIGHT-ALIGNED FILTERS     */}
          {/* ========================================================= */}
          <div className="border-b border-slate-800/80 bg-slate-900/30 px-6 pt-5 shrink-0">
            {/* Top row: Title line (with Edit Icon) + Custom Sprint Dropdown & Actions */}
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

                  {/* Edit Sprint Icon Button */}
                  <button
                    onClick={() => {
                      setSprintModalMode("edit");
                      setIsSprintModalOpen(true);
                    }}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                    title="Edit Sprint Details"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  {renderSprintBadge()}
                </div>
              </div>

              {/* Right Side: Custom Sprint Dropdown + Filter Drawer Toggle + New Story Button */}
              <div className="flex items-center gap-3">
                {/* CUSTOM SPRINT SELECTION DROPDOWN WITH SCROLLBAR & CREATE SPRINT ACTION */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsSprintDropdownOpen(!isSprintDropdownOpen)
                    }
                    className="flex items-center gap-2 h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  >
                    <span>{selectedSprint}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isSprintDropdownOpen && (
                    <>
                      {/* Invisible backdrop to dismiss dropdown on click outside */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsSprintDropdownOpen(false)}
                      />

                      <div className="absolute right-0 top-full mt-1.5 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {/* Scrollable Sprint Items List */}
                        <div className="max-h-52 overflow-y-auto space-y-0.5 p-1 text-xs">
                          {[
                            {
                              name: "Sprint 24.1 (Active)",
                              status: "Active",
                              badgeColor:
                                "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                            },
                            {
                              name: "Sprint 24.2 (Upcoming)",
                              status: "Upcoming",
                              badgeColor:
                                "bg-sky-500/10 text-sky-400 border-sky-500/20",
                            },
                            {
                              name: "Sprint 23.4 (Completed)",
                              status: "Completed",
                              badgeColor:
                                "bg-slate-500/15 text-slate-300 border-slate-600/30",
                            },
                            {
                              name: "Sprint Backlog (Inactive)",
                              status: "Inactive",
                              badgeColor:
                                "bg-amber-500/10 text-amber-400 border-amber-500/20",
                            },
                          ].map((sprint) => (
                            <div
                              key={sprint.name}
                              onClick={() => {
                                setSelectedSprint(sprint.name);
                                setIsSprintDropdownOpen(false);
                              }}
                              className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition ${
                                selectedSprint === sprint.name
                                  ? "bg-blue-600/15 text-blue-400"
                                  : "hover:bg-slate-850 text-slate-200"
                              }`}
                            >
                              <span className="font-medium truncate">
                                {sprint.name}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${sprint.badgeColor}`}
                              >
                                {sprint.status}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Sticky Action Button at the bottom of dropdown to create a new sprint */}
                        <div className="p-2 border-t border-slate-800 bg-slate-950/70">
                          <button
                            onClick={() => {
                              setIsSprintDropdownOpen(false);
                              setSprintModalMode("create");
                              setIsSprintModalOpen(true);
                            }}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-600/10 text-blue-400 text-xs font-semibold transition cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Create New Sprint</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Filter Drawer Toggle Button */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-xs font-medium text-slate-300 transition cursor-pointer"
                  title="Open Filters"
                >
                  <Filter className="w-3.5 h-3.5 text-blue-400" />
                  <span>Filters</span>
                </button>

                {/* New User Story Primary Button */}
                <button
                  onClick={() => setIsNewStoryModalOpen(true)}
                  className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Story</span>
                </button>
              </div>
            </div>

            {/* Bottom row: TABS (Task Board, Backlog, Team Members) */}
            <div className="flex items-center gap-8 border-t border-slate-800/60 pt-3 mt-4">
              <button
                onClick={() => setActiveTab("taskboard")}
                className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
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
                className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
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

              <button
                onClick={() => setActiveTab("team-members")}
                className={`flex items-center gap-2 pb-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeTab === "team-members"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Team Members</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
                  4
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* AZURE DEVOPS SWIMLANE BOARD VIEW                          */}
          {/* ========================================================= */}
          <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
            {/* TAB 1: KANBAN TASK BOARD VIEW                             */}
            {/* ========================================================= */}
            {activeTab === "taskboard" && (
              <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
                {/* Keep your existing Kanban board code here */}
                <div className="w-fit min-w-full space-y-4">
                  {/* STICKY COLUMN HEADER ROW (Aligned pixel-perfect with swimlanes) */}
                  <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 px-4 pb-2 border-b border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                    <button
                      onClick={toggleAllStories}
                      className="flex items-center gap-2 px-2 py-1 -ml-2 rounded-md hover:bg-slate-850 hover:text-slate-200 transition text-left text-slate-300 font-semibold"
                      title="Toggle collapse on all stories"
                    >
                      <ChevronsUpDown className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>
                        {areAllCollapsed ? "Expand All" : "Collapse All"}
                      </span>
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
                            Integrate Stripe webhook verification for
                            subscription renewals
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
                            Integrate Stripe webhook verification for
                            subscription renewals
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
                            Implement OAuth2 multi-tenant authentication and
                            session management
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
                            Implement OAuth2 multi-tenant authentication and
                            session management
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
            )}

            {/* ========================================================= */}
            {/* TAB 2: BACKLOG / USER STORIES TABLE VIEW                  */}
            {/* ========================================================= */}
            {activeTab === "backlog" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Backlog Action / Summary Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/40 border border-slate-850 rounded-xl">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-blue-400" />
                      <span>Backlog & Stories in {selectedSprint}</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Click any story row to view full acceptance criteria,
                      metadata, and child tasks.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">
                      Total Stories:{" "}
                      <strong className="text-white">
                        {backlogStories.length}
                      </strong>
                    </span>
                    {/* <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Story</span>
                    </button> */}
                  </div>
                </div>

                {/* 4-COLUMN TABLE: ID, TITLE, STATUS, ASSIGNED TO */}
                <div className="bg-slate-900/30 border border-slate-850 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    {/* Table Header */}
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                        <th className="py-3 px-4 w-32">ID</th>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4 w-40">Status</th>
                        <th className="py-3 px-4 w-52">Assigned To</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-850">
                      {backlogStories.map((story) => (
                        <tr
                          key={story.id}
                          onClick={() => setSelectedStoryModal(story)}
                          className="hover:bg-slate-850/60 cursor-pointer transition group"
                        >
                          {/* 1. ID Column */}
                          <td className="py-3.5 px-4 font-mono font-semibold text-blue-400 flex items-center gap-2">
                            <Bookmark className="w-3.5 h-3.5 shrink-0" />
                            <span>{story.id}</span>
                          </td>

                          {/* 2. Title Column */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-200 group-hover:text-blue-400 transition">
                              {story.title}
                            </div>
                            {story.tasks.length > 0 && (
                              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                {story.tasks.length} child tasks linked
                              </div>
                            )}
                          </td>

                          {/* 3. Status Column */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                                story.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : story.status === "Ready"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {story.status}
                            </span>
                          </td>

                          {/* 4. Assigned To Column */}
                          <td className="py-3.5 px-4">
                            {story.assignee ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 ${story.assignee.bg}`}
                                >
                                  {story.assignee.initials}
                                </div>
                                <span className="text-slate-300 font-medium">
                                  {story.assignee.name}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-500 italic">
                                Unassigned
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: PROJECT TEAM MEMBERS VIEW                          */}
            {/* ========================================================= */}
            {activeTab === "team-members" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Header Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/40 border border-slate-850 rounded-xl">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>Project Members • Payments Engine</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Team members assigned to contribute, coordinate, or
                      supervise this project.
                    </p>
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Assign Member</span>
                  </button>
                </div>

                {/* Members Table */}
                <div className="bg-slate-900/30 border border-slate-850 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                        <th className="py-3 px-4">Member</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Project Sub-Role</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {[
                        {
                          name: "Alex Rivera",
                          email: "alex.rivera@acme.com",
                          role: "Project Supervisor",
                          badge:
                            "bg-blue-500/10 text-blue-400 border-blue-500/20",
                          bg: "bg-blue-600",
                          initials: "AR",
                        },
                        {
                          name: "Sarah Chen",
                          email: "sarah.chen@acme.com",
                          role: "Coordinator",
                          badge:
                            "bg-purple-500/10 text-purple-400 border-purple-500/20",
                          bg: "bg-emerald-600",
                          initials: "SC",
                        },
                        {
                          name: "John Doe",
                          email: "john.doe@acme.com",
                          role: "Contributor",
                          badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
                          bg: "bg-purple-600",
                          initials: "JD",
                        },
                        {
                          name: "Elena Rostova",
                          email: "elena.rostova@acme.com",
                          role: "Reader",
                          badge:
                            "bg-slate-500/10 text-slate-400 border-slate-500/20",
                          bg: "bg-slate-700",
                          initials: "ER",
                        },
                      ].map((member) => (
                        <tr
                          key={member.email}
                          className="hover:bg-slate-850/50 transition"
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${member.bg}`}
                              >
                                {member.initials}
                              </div>
                              <span className="font-semibold text-slate-200">
                                {member.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {member.email}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${member.badge}`}
                            >
                              {member.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="text-slate-400 hover:text-rose-400 transition text-[11px] font-medium cursor-pointer">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
      {/* ========================================================= */}
      {/* STORY DETAIL & LINKED TASKS MODAL                        */}
      {/* ========================================================= */}
      {selectedStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop */}
          <div
            onClick={() => setSelectedStoryModal(null)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Dialog Container */}
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10 animate-in zoom-in-95 duration-150">
            {/* Modal Top Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs font-semibold text-blue-400">
                  {selectedStoryModal.id}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">
                  User Story
                </span>
              </div>

              <button
                onClick={() => setSelectedStoryModal(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Title & Metadata Pills */}
              <div>
                <h2 className="text-base font-bold text-white leading-snug">
                  {selectedStoryModal.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Sprint:</span>
                    <strong className="text-slate-200">{selectedSprint}</strong>
                  </div>
                  <div className="h-3 w-px bg-slate-800" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Priority:</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase">
                      {selectedStoryModal.priority}
                    </span>
                  </div>
                  <div className="h-3 w-px bg-slate-800" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Story Points:</span>
                    <strong className="text-blue-400 font-mono">
                      {selectedStoryModal.points} pts
                    </strong>
                  </div>
                  <div className="h-3 w-px bg-slate-800" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Assignee:</span>
                    <strong className="text-slate-200">
                      {selectedStoryModal.assignee
                        ? selectedStoryModal.assignee.name
                        : "Unassigned"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Description & Acceptance Criteria */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Description & Acceptance Criteria
                </label>
                <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-slate-300 leading-relaxed text-xs">
                  {selectedStoryModal.description}
                </div>
              </div>

              {/* Linked Child Tasks Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Child Tasks ({selectedStoryModal.tasks.length})</span>
                  </label>

                  <button className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition">
                    <Plus className="w-3 h-3" />
                    <span>Add Task</span>
                  </button>
                </div>

                {selectedStoryModal.tasks.length > 0 ? (
                  <div className="divide-y divide-slate-850 border border-slate-850 rounded-lg overflow-hidden bg-slate-950/40">
                    {selectedStoryModal.tasks.map((task: any) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 hover:bg-slate-900/60 transition text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="font-mono text-slate-400 text-[11px]">
                            {task.id}
                          </span>
                          <span className="text-slate-200 truncate font-medium">
                            {task.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 pl-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                            {task.status}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">
                            {task.points} pts
                          </span>
                          <div className="w-5 h-5 rounded-full bg-slate-700 text-white text-[9px] font-bold flex items-center justify-center">
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-slate-850 rounded-lg text-center text-slate-500 text-xs italic">
                    No child tasks created for this story yet.
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CREATE NEW USER STORY MODAL                               */}
      {/* ========================================================= */}
      {isNewStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsNewStoryModalOpen(false)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Panel */}
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    Create User Story
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Add a new requirement to the backlog or active sprint
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsNewStoryModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // In Phase 2, this will call TanStack Query mutation
                setIsNewStoryModalOpen(false);
              }}
              className="p-6 overflow-y-auto space-y-4 text-xs"
            >
              {/* 1. Title Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Story Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Implement webhook signature verification"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs"
                />
              </div>

              {/* 2. Target Sprint Dropdown */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assign to Sprint
                </label>
                <div className="relative">
                  <select
                    defaultValue={selectedSprint}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                  >
                    <option value="Sprint 24.1 (Active)">
                      Sprint 24.1 (Current Active Sprint)
                    </option>
                    <option value="Sprint 24.2 (Upcoming)">
                      Sprint 24.2 (Upcoming Planned Sprint)
                    </option>
                    <option value="Sprint Backlog (Inactive)">
                      Backlog (Unassigned / Future)
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 3. Priority & Story Points (Two-Column Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      defaultValue="Medium"
                      className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Story Points (Fibonacci)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="34"
                    defaultValue="5"
                    placeholder="e.g., 3, 5, 8"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition text-xs font-mono"
                  />
                </div>
              </div>

              {/* 4. Assignee Dropdown */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assignee
                </label>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                  >
                    <option value="">Unassigned</option>
                    <option value="alex">
                      Alex Rivera (Project Supervisor)
                    </option>
                    <option value="sarah">Sarah Chen (Coordinator)</option>
                    <option value="john">John Doe (Contributor)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 5. Description & Acceptance Criteria */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Description & Acceptance Criteria
                </label>
                <textarea
                  rows={4}
                  placeholder="As a [user type], I want to [goal] so that [benefit]...&#10;&#10;Acceptance Criteria:&#10;- Criteria 1&#10;- Criteria 2"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs leading-relaxed font-sans resize-none"
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewStoryModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  Create Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CREATE / EDIT SPRINT MODAL                                */}
      {/* ========================================================= */}
      {isSprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsSprintModalOpen(false)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Panel */}
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    {sprintModalMode === "edit"
                      ? "Edit Sprint"
                      : "Create New Sprint"}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {sprintModalMode === "edit"
                      ? "Update timeline, goals, and iteration state"
                      : "Plan a new sprint iteration for this project"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSprintModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSprintModalOpen(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              {/* 1. Sprint Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Sprint Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  defaultValue={sprintModalMode === "edit" ? "Sprint 24.1" : ""}
                  placeholder="e.g., Sprint 24.3"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs"
                />
              </div>

              {/* 2. Date Range (Two Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    defaultValue={
                      sprintModalMode === "edit" ? "2026-10-20" : ""
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition text-xs [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    defaultValue={
                      sprintModalMode === "edit" ? "2026-11-03" : ""
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition text-xs [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* 3. Sprint Status */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    defaultValue={
                      sprintModalMode === "edit" ? "ACTIVE" : "PLANNED"
                    }
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                  >
                    <option value="PLANNED">Planned / Upcoming</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 4. Sprint Goal */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Sprint Goal
                </label>
                <textarea
                  rows={3}
                  defaultValue={
                    sprintModalMode === "edit"
                      ? "Integrate Stripe webhook verification and multi-tenant OAuth rotation."
                      : ""
                  }
                  placeholder="What does the team aim to deliver in this iteration?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs leading-relaxed font-sans resize-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsSprintModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  {sprintModalMode === "edit"
                    ? "Save Changes"
                    : "Create Sprint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
