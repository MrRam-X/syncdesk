import { type FC } from "react";
import type { OrganizationRowItem } from "../../organization/components/OrganizationTable";

interface OrganizationOwnerContactInfoProps {
  organization: OrganizationRowItem;
}

const OrganizationOwnerContactInfo: FC<OrganizationOwnerContactInfoProps> = ({
  organization,
}) => {
  return (
    <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
        Designated Organization Owner
      </h3>
      <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
            {organization.ownerInitials}
          </div>
          <div>
            <div className="font-semibold text-white">
              {organization.ownerName}
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              {organization.ownerEmail}
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-semibold">
          Root Owner Account
        </span>
      </div>
    </div>
  );
};

export default OrganizationOwnerContactInfo;