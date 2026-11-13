import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Bell,
  Sparkles,
  Check,
  Rocket,
  MessageSquare,
  CheckSquare,
  User,
  Moon,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

export interface ProjectOption {
  name: string;
  key: string;
  description?: string;
}

interface NavbarProps {
  currentProject: ProjectOption;
  onSelectProject: (project: ProjectOption) => void;
  projects?: ProjectOption[];
  roleTitle?: string;
  userName?: string;
  userEmail?: string;
  workspaceName?: string;
}

const defaultProjects: ProjectOption[] = [
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
];

export function Navbar({
  currentProject,
  onSelectProject,
  projects = defaultProjects,
  roleTitle = "Project Supervisor",
}: NavbarProps) {
  const { user, logout } = useAuthStore();
  const userProfileIconInitials = user
    ? user?.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "DU";
  const navigate = useNavigate();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Click outside handling
  const projectRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogoutButtonClick = () => {
    setIsProfileOpen(false);
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (projectRef.current && !projectRef.current.contains(target)) {
        setIsProjectDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-40 relative select-none">
      {/* Left: Brand Logo & Project Dropdown */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
            S
          </div>
          <span>Syncdesk</span>
        </div>

        <div className="h-4 w-px bg-slate-800" />

        {/* Custom Project Selector Dropdown */}
        <div className="relative" ref={projectRef}>
          <button
            onClick={() => {
              setIsProjectDropdownOpen(!isProjectDropdownOpen);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-xs font-medium text-slate-200 transition border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
              {currentProject.key[0]}
            </div>
            <span className="font-semibold">{currentProject.name}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
              {currentProject.key}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 px-3 uppercase tracking-wider">
                Select Project
              </div>
              <div className="max-h-56 overflow-y-auto space-y-0.5 p-1 text-xs">
                {projects.map((proj) => (
                  <div
                    key={proj.key}
                    onClick={() => {
                      onSelectProject(proj);
                      setIsProjectDropdownOpen(false);
                    }}
                    className={`flex items-start justify-between p-2.5 rounded-lg cursor-pointer transition ${
                      currentProject.key === proj.key
                        ? "bg-blue-600/15 text-blue-400"
                        : "hover:bg-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs truncate">
                          {proj.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {proj.key}
                        </span>
                      </div>
                      {proj.description && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {proj.description}
                        </p>
                      )}
                    </div>
                    {currentProject.key === proj.key && (
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Search, Role Badge, Notifications & Profile Popover */}
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
          <span>{roleTitle}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
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

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800 text-xs">
                {[
                  {
                    title: "Sarah Chen assigned a task",
                    detail: "SYNC-110: Implement subscription updated",
                    time: "10m ago",
                    unread: true,
                    icon: CheckSquare,
                    color: "text-blue-400",
                  },
                  {
                    title: "Mentioned in SYNC-102",
                    detail: '"@Alex Rivera review race condition"',
                    time: "45m ago",
                    unread: true,
                    icon: MessageSquare,
                    color: "text-purple-400",
                  },
                  {
                    title: "Sprint 24.1 started",
                    detail: "Goal: Stripe webhook verification",
                    time: "2h ago",
                    unread: true,
                    icon: Rocket,
                    color: "text-emerald-400",
                  },
                ].map((notif, idx) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-3 hover:bg-slate-800/60 transition cursor-pointer flex gap-3 ${notif.unread ? "bg-slate-950/30" : ""}`}
                    >
                      <div
                        className={`p-1.5 rounded-lg bg-slate-800 shrink-0 h-fit ${notif.color}`}
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
            </div>
          )}
        </div>

        {/* User Profile Popover */}
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
              {userProfileIconInitials}
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
              <div className="p-3.5 border-b border-slate-800 bg-slate-950/40 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {userProfileIconInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white text-xs truncate">
                      {user?.fullName || "User Fullname"}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate font-mono">
                      {user?.email || "user@email.com"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">
                    {user?.orgName || "workspaceName"}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
                    {user?.role || "roleTitle"}
                  </span>
                </div>
              </div>

              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-left"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile & Settings</span>
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Theme</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Dark
                  </span>
                </button>
              </div>

              <div className="p-1 border-t border-slate-800 bg-slate-950/40">
                <button
                  onClick={handleLogoutButtonClick}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition cursor-pointer text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
