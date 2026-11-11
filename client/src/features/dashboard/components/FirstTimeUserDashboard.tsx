import { type FC } from "react";
import {
  Sparkles,
  Layers,
  ArrowRight,
  Rocket,
  Kanban,
  BookOpen,
  Compass,
  Inbox,
  Milestone,
} from "lucide-react";

interface FirstTimeUserDashboardProps {
  userName?: string;
  workspaceName?: string;
  onBrowseProjects?: () => void;
  onRequestAccess?: () => void;
}

const FirstTimeUserDashboard: FC<FirstTimeUserDashboardProps> = ({
  userName = "Alex Rivera",
  workspaceName = "Acme Corp",
  onBrowseProjects = () => {},
  onRequestAccess = () => {},
}) => {
  return (
    <div className="space-y-8 w-full select-none">
      {/* 1. Hero Onboarding Banner */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-900/40 border border-blue-500/20 rounded-2xl shadow-xl overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to {workspaceName} on Syncdesk</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Welcome aboard, {userName}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You are registered in the{" "}
            <strong className="text-white">{workspaceName}</strong> workspace,
            but you haven't been assigned to any projects yet. Discover active
            teams below or request access to get assigned to a sprint.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onBrowseProjects}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Browse Organization Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onRequestAccess}
              className="px-3.5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Request Project Access
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none hidden md:block">
          <Rocket className="w-64 h-64 text-blue-400" />
        </div>
      </div>

      {/* 2. Three Getting Started Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Getting Started Checklist
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                1. Explore Active Projects
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check out active repositories like Payments Engine or Mobile
                Banking.
              </p>
            </div>
            <button
              type="button"
              onClick={onBrowseProjects}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 transition pt-2 text-left cursor-pointer"
            >
              <span>View directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                <Kanban className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                2. Learn the Taskboard Flow
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Understand how user stories move across To Do, In Progress,
                Deployed, and Testing.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn workflow</span>
            </span>
          </div>

          <div className="p-5 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition">
                3. Use Your Personal Planner
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use your private notebook to take daily standup notes or keep
                personal checklists.
              </p>
            </div>
            <span className="text-xs text-purple-400 font-semibold flex items-center gap-1.5 pt-2">
              <span>Private Scratchpad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Empty States */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
            <Inbox className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              No tasks assigned yet
            </h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Once you join a project and a sprint starts, assigned work items
              will appear here.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-xl text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
            <Milestone className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              No active sprint tracking
            </h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              You are not linked to any active sprint iterations. Join a team to
              monitor burn-down rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUserDashboard;
