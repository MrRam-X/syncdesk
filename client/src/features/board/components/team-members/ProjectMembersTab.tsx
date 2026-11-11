import { type FC } from "react";
import { Users, Plus } from "lucide-react";
import DataTable, { type Column } from "@/components/common/DataTable";

export interface ProjectMemberRow {
  email: string;
  name: string;
  role: string;
  badgeColor: string;
  initials: string;
  bg: string;
}

interface ProjectMembersTabProps {
  projectName?: string;
  members: ProjectMemberRow[];
  onAssignMember?: () => void;
  onRemoveMember?: (email: string) => void;
}

const ProjectMembersTab: FC<ProjectMembersTabProps> = ({
  projectName = "Payments Engine",
  members,
  onAssignMember = () => {},
  onRemoveMember = () => {},
}) => {
  const handleAssignClick = () => {
    onAssignMember();
  };

  const handleRemoveClick = (email: string) => {
    onRemoveMember(email);
  };

  const columns: Column<ProjectMemberRow>[] = [
    {
      header: "Member",
      render: (m) => (
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${m.bg}`}
          >
            {m.initials}
          </div>
          <span className="font-semibold text-slate-200">{m.name}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      render: (m) => (
        <span className="font-mono text-slate-400">{m.email}</span>
      ),
    },
    {
      header: "Project Sub-Role",
      render: (m) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${m.badgeColor}`}
        >
          {m.role}
        </span>
      ),
    },
    {
      header: "Actions",
      align: "right",
      render: (m) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveClick(m.email);
          }}
          className="text-slate-400 hover:text-rose-400 transition text-[11px] font-medium cursor-pointer"
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Project Members • {projectName}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Team members assigned to contribute, coordinate, or supervise this
            repository.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAssignClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Assign Member</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={members}
        keyExtractor={(m) => m.email}
        emptyMessage="No members assigned to this project yet."
      />
    </div>
  );
};

export default ProjectMembersTab;
