import { type FC } from "react";
import { Bookmark, CheckSquare, Bug } from "lucide-react";
import DataTable, { type Column } from "@/components/common/DataTable";

export interface TaskItemRow {
  id: string;
  type: "Story" | "Task" | "Bug";
  title: string;
  project: string;
  projectKey: string;
  sprint: string;
  status: string;
  priority: string;
  points: number;
  assignee: {
    name: string;
    initials: string;
    bg: string;
  } | null;
}

interface TasksTableProps {
  items: TaskItemRow[];
  onItemClick?: (item: TaskItemRow) => void;
}

const TasksTable: FC<TasksTableProps> = ({ items, onItemClick }) => {
  const getTypeIcon = (type: TaskItemRow["type"]) => {
    switch (type) {
      case "Story":
        return <Bookmark className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case "Task":
        return <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
      case "Bug":
        return <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Deployed":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Testing":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Done":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "High":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Medium":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const columns: Column<TaskItemRow>[] = [
    {
      header: "ID",
      width: "w-32",
      render: (row) => (
        <span className="font-mono font-semibold text-blue-400 flex items-center gap-2">
          {getTypeIcon(row.type)}
          <span>{row.id}</span>
        </span>
      ),
    },
    {
      header: "Title",
      render: (row) => (
        <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition line-clamp-1">
          {row.title}
        </span>
      ),
    },
    {
      header: "Project",
      width: "w-28",
      render: (row) => (
        <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
          {row.projectKey}
        </span>
      ),
    },
    {
      header: "Sprint",
      width: "w-36",
      render: (row) => (
        <span className="text-slate-400 font-mono text-[11px] truncate block">
          {row.sprint}
        </span>
      ),
    },
    {
      header: "Status",
      width: "w-32",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 border ${getStatusBadgeClass(
            row.status,
          )}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {row.status}
        </span>
      ),
    },
    {
      header: "Priority",
      width: "w-28",
      render: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${getPriorityBadgeClass(
            row.priority,
          )}`}
        >
          {row.priority}
        </span>
      ),
    },
    {
      header: "Points",
      width: "w-20",
      align: "right",
      render: (row) => (
        <span className="font-mono text-slate-400 text-[11px]">
          {row.points} pts
        </span>
      ),
    },
    {
      header: "Assignee",
      width: "w-44",
      render: (row) =>
        row.assignee ? (
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 ${row.assignee.bg}`}
            >
              {row.assignee.initials}
            </div>
            <span className="text-slate-300 font-medium truncate">
              {row.assignee.name}
            </span>
          </div>
        ) : (
          <span className="text-slate-500 italic">Unassigned</span>
        ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={items}
      keyExtractor={(item) => item.id}
      onRowClick={onItemClick}
      emptyMessage="No work items found matching your current filter criteria."
    />
  );
};

export default TasksTable;