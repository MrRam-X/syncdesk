import { type FC } from "react";
import { Users, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { type OwnerDashboardData } from "../hooks/useOwner";

interface OwnerDashboardViewProps {
  data?: OwnerDashboardData;
  onViewRoster: () => void;
}

const OwnerDashboardView: FC<OwnerDashboardViewProps> = ({
  data,
  onViewRoster,
}) => {
  const total = data?.totalWorkforce || 0;
  const breakdown = data?.subRoleBreakdown || {
    supervisors: 0,
    coordinators: 0,
    contributors: 0,
    readers: 0,
  };
  const projects = data?.totalProjects || 0;

  return (
    <div className="space-y-6 w-full select-none">
      {/* Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workforce"
          value={`${total} Members`}
          subtitle={
            <span className="text-emerald-400 font-medium">
              Active in organization
            </span>
          }
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />

        <StatCard
          title="Hosted Projects"
          value={`${projects} Repositories`}
          subtitle="Organization workspaces"
          icon={<Layers className="w-5 h-5" />}
          color="purple"
        />

        <StatCard
          title="Team Supervision"
          value={`${breakdown.supervisors + breakdown.coordinators} Leads`}
          subtitle="Project leads & coordinators"
          icon={<TrendingUp className="w-5 h-5" />}
          color="emerald"
        />

        <StatCard
          title="Tenant Plan"
          value="Enterprise Tier"
          subtitle="Unlimited members & boards"
          icon={<ShieldCheck className="w-5 h-5" />}
          color="sky"
        />
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Workforce Distribution by Sub-Role */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Workforce Distribution by Sub-Role
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
              <span className="font-mono font-bold text-white">
                {breakdown.supervisors}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-purple-400">
                Coordinators
              </span>
              <span className="font-mono font-bold text-white">
                {breakdown.coordinators}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-sky-400">
                Contributors (Dev / Test)
              </span>
              <span className="font-mono font-bold text-white">
                {breakdown.contributors}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-400">
                Readers (Stakeholders)
              </span>
              <span className="font-mono font-bold text-white">
                {breakdown.readers}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Info Card */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Tenant Governance Information
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400">Workspace Identifier:</div>
              <div className="font-mono text-sm text-blue-400 font-bold">
                syncdesk.app/{data?.orgSlug}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400">Auto-Generated Email Domain:</div>
              <div className="font-mono text-sm text-purple-400 font-bold">
                @{data?.orgSlug}.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardView;