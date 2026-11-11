import { type FC } from "react";
import { Building2, Users, Database, Server } from "lucide-react";
import StatCard from "@/components/common/StatCard";

export interface OrgSummaryItem {
  id: string;
  name: string;
  ownerName: string;
  created: string;
}

interface AdminDashboardViewProps {
  totalOrgs: number;
  recentOrgs: OrgSummaryItem[];
  onViewAllOrgs: () => void;
}

const AdminDashboardView: FC<AdminDashboardViewProps> = ({
  totalOrgs,
  recentOrgs,
  onViewAllOrgs,
}) => {
  return (
    <div className="space-y-6 w-full select-none">
      {/* Platform Operations Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enterprises"
          value={`${totalOrgs} Tenancies`}
          subtitle={
            <span className="text-emerald-400 font-medium">
              +2 joined this month
            </span>
          }
          icon={<Building2 className="w-5 h-5" />}
          color="blue"
        />

        <StatCard
          title="Worldwide Users"
          value="92 Accounts"
          subtitle="Active across 15 projects"
          icon={<Users className="w-5 h-5" />}
          color="emerald"
        />

        <StatCard
          title="PostgreSQL (Neon)"
          value="Connected"
          subtitle={
            <span className="text-emerald-400 font-medium">
              SSL Pool • 0.12 GB / 0.5 GB
            </span>
          }
          icon={<Database className="w-5 h-5" />}
          color="purple"
        />

        <StatCard
          title="Express Server"
          value="Live (Render)"
          subtitle="Ping cron keep-alive 24/7"
          icon={<Server className="w-5 h-5" />}
          color="rose"
        />
      </div>

      {/* Two Column Grid: Plan Distribution & Recent Onboardings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Tenancy Plan Breakdown */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Tenancy Plan Breakdown
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-purple-400">
                Enterprise Tier
              </span>
              <span className="font-mono font-bold text-white">
                2 Companies
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-blue-400">Growth Tier</span>
              <span className="font-mono font-bold text-white">1 Company</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-400">Starter Tier</span>
              <span className="font-mono font-bold text-white">1 Company</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Tenant Onboardings */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Recent Tenant Onboardings
            </h2>
            <button
              type="button"
              onClick={onViewAllOrgs}
              className="text-xs text-rose-400 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {recentOrgs.map((org) => (
              <div
                key={org.id}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-white">{org.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Owner: {org.ownerName}
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  {org.created}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;