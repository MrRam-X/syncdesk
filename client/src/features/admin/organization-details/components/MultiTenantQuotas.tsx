import { type FC } from "react";
import type { OrganizationRowItem } from "../../organization/components/OrganizationTable";

interface MultiTenantQuotasProps {
  organization: OrganizationRowItem;
}

const MultiTenantQuotas: FC<MultiTenantQuotasProps> = ({ organization }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl space-y-1">
        <div className="text-slate-400 text-xs">Licensed Seats</div>
        <div className="text-2xl font-bold font-mono text-white">
          {organization.usersCount} Users
        </div>
        <p className="text-[11px] text-slate-500">Max limit: 50 accounts</p>
      </div>

      <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl space-y-1">
        <div className="text-slate-400 text-xs">Hosted Projects</div>
        <div className="text-2xl font-bold font-mono text-blue-400">
          {organization.projectsCount} Repositories
        </div>
        <p className="text-[11px] text-slate-500">Active enterprise repos</p>
      </div>

      <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl space-y-1">
        <div className="text-slate-400 text-xs">Database Partition (Neon)</div>
        <div className="text-2xl font-bold font-mono text-purple-400">
          48 MB
        </div>
        <p className="text-[11px] text-emerald-400">
          SSL Connection pool active
        </p>
      </div>
    </div>
  );
};

export default MultiTenantQuotas;
