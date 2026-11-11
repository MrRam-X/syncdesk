import { type FC } from "react";
import DataTable, { type Column } from "@/components/common/DataTable";

export interface OrganizationRowItem {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  ownerInitials: string;
  usersCount: number;
  projectsCount: number;
  created: string;
  status: string;
  plan: string;
}

interface OrganizationTableProps {
  organizations: OrganizationRowItem[];
  onSelectOrg: (org: OrganizationRowItem) => void;
  onRequestDelete: (org: OrganizationRowItem) => void;
}

const OrganizationTable: FC<OrganizationTableProps> = ({
  organizations,
  onSelectOrg,
  onRequestDelete,
}) => {
  const columns: Column<OrganizationRowItem>[] = [
    {
      header: "Organization",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0">
            {row.name[0]}
          </div>
          <div>
            <div className="font-semibold text-white group-hover:text-rose-400 transition">
              {row.name}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              syncdesk.app/{row.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Owner Contact",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {row.ownerInitials}
          </div>
          <div>
            <div className="font-medium text-slate-200">{row.ownerName}</div>
            <div className="text-[10px] text-slate-400 font-mono">
              {row.ownerEmail}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Users",
      render: (row) => (
        <span className="font-mono text-slate-300">{row.usersCount} users</span>
      ),
    },
    {
      header: "Projects",
      render: (row) => (
        <span className="font-mono text-slate-300">
          {row.projectsCount} repos
        </span>
      ),
    },
    {
      header: "Subscription",
      render: (row) => (
        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
          {row.plan}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            row.status === "Active"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectOrg(row);
            }}
            className="text-slate-400 hover:text-white transition font-medium text-xs cursor-pointer"
          >
            Inspect
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestDelete(row);
            }}
            className="text-slate-500 hover:text-rose-400 transition font-medium text-xs cursor-pointer"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={organizations}
      keyExtractor={(org) => org.id}
      onRowClick={onSelectOrg}
      emptyMessage="No organizations found in registry."
    />
  );
};

export default OrganizationTable;