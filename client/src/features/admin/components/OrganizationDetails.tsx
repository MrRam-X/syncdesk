import { type FC } from "react";
import { ArrowLeft, Calendar, Trash2 } from "lucide-react";
import { type OrganizationRowItem } from "./OrganizationTable";

interface OrganizationDetailsProps {
  organization: OrganizationRowItem;
  onBack: () => void;
  onRequestDelete: () => void;
}

const OrganizationDetails: FC<OrganizationDetailsProps> = ({
  organization,
  onBack,
  onRequestDelete,
}) => {
  return (
    <div className="space-y-6 w-full select-none">
      {/* Top Navigation & Breadcrumb */}
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

      {/* Organization Overview Card */}
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

      {/* Multi-Tenant Quotas */}
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
          <div className="text-slate-400 text-xs">
            Database Partition (Neon)
          </div>
          <div className="text-2xl font-bold font-mono text-purple-400">
            48 MB
          </div>
          <p className="text-[11px] text-emerald-400">
            SSL Connection pool active
          </p>
        </div>
      </div>

      {/* Owner Contact Information */}
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
    </div>
  );
};

export default OrganizationDetails;
