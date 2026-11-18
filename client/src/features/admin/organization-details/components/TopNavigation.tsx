import { type FC } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import type { OrganizationRowItem } from "../../organization/components/OrganizationTable";

interface TopNavigationProps {
  organization: OrganizationRowItem;
  onBack: () => void;
  onRequestDelete: () => void;
}

const TopNavigation: FC<TopNavigationProps> = ({
  onBack,
  onRequestDelete,
  organization,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
          title="Back to Organizations"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-rose-400 font-semibold">Super-Admin</span>
            <span>/</span>
            <span>Tenants</span>
            <span>/</span>
            <span className="text-white font-semibold">
              {organization.slug}
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-0.5">
            Tenant Architecture & Governance
          </h1>
        </div>
      </div>

      <button
        type="button"
        onClick={onRequestDelete}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-900/40 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-400 transition cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete Tenant</span>
      </button>
    </div>
  );
};

export default TopNavigation;