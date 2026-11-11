import { type FC } from "react";
import { Users, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import StatCard from "@/components/common/StatCard";

interface OwnerDashboardViewProps {
  totalEmployees: number;
  onViewRoster: () => void;
}

const OwnerDashboardView: FC<OwnerDashboardViewProps> = ({
  totalEmployees,
  onViewRoster,
}) => {
  return (
    <div className="space-y-6 w-full select-none">
      {/* Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workforce"
          value={`${totalEmployees} Members`}
          subtitle={
            <span className="text-emerald-400 font-medium">
              All registered & active
            </span>
          }
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />

        <StatCard
          title="Active Repositories"
          value="4 Projects"
          subtitle="2 in active iteration"
          icon={<Layers className="w-5 h-5" />}
          color="purple"
        />

        <StatCard
          title="Active Sprint Velocity"
          value="70 pts"
          subtitle="68% overall delivery rate"
          icon={<TrendingUp className="w-5 h-5" />}
          color="emerald"
        />

        <StatCard
          title="Workspace Plan"
          value="Enterprise Tier"
          subtitle="Unlimited repos & members"
          icon={<ShieldCheck className="w-5 h-5" />}
          color="sky"
        />
      </div>

      {/* Two Column Grid: Workforce Breakdown & Project Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Workforce by Sub-Role */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Workforce by Sub-Role
            </h2>
            <button
              type="button"
              onClick={onViewRoster}
              className="text-xs text-blue-400 hover:underline cursor-pointer"
            >
              View Roster
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-blue-400">
                Project Supervisors
              </span>
              <span className="font-mono font-bold text-white">1</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-purple-400">
                Coordinators
              </span>
              <span className="font-mono font-bold text-white">1</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-sky-400">
                Contributors (Dev / Test)
              </span>
              <span className="font-mono font-bold text-white">2</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-400">
                Readers (Stakeholders)
              </span>
              <span className="font-mono font-bold text-white">1</span>
            </div>
          </div>
        </div>

        {/* Right: Company Project Health */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Company Project Health
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">
                  Payments Engine (SYNC)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                  Sprint 24.1 Active
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[68%]" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                19 of 28 Story Points completed
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">
                  Mobile Banking App (MOB)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                  Sprint 12.0 Active
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[76%]" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                32 of 42 Story Points completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardView;