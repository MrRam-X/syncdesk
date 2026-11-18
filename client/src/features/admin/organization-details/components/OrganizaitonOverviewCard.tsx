import { type FC } from "react";
import { Calendar } from "lucide-react";
import type { OrganizationRowItem } from "../../organization/components/OrganizationTable";

interface OrganizaitonOverviewCardProps {
  organization: OrganizationRowItem;
}

const OrganizaitonOverviewCard: FC<OrganizaitonOverviewCardProps> = ({
  organization,
}) => {
  return (
    <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xl shrink-0">
          {organization.name[0]}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white">
              {organization.name}
            </h2>
            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {organization.plan}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span>syncdesk.app/{organization.slug}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Created {organization.created}</span>
            </span>
          </div>
        </div>
      </div>

      <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
        {organization.status}
      </span>
    </div>
  );
};

export default OrganizaitonOverviewCard;