import { type FC } from "react";
import DataTable, { type Column } from "@/components/common/DataTable";

export interface EmployeeRowItem {
  id: string;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  status: string;
  joined: string;
  projects: string[];
  initials: string;
  bg: string;
}

interface EmployeeTableProps {
  employees: EmployeeRowItem[];
  onSelectEmployee: (emp: EmployeeRowItem) => void;
  onEditRole?: (empId: string) => void;
  onDeactivate?: (empId: string) => void;
}

const EmployeeTable: FC<EmployeeTableProps> = ({
  employees,
  onSelectEmployee,
  onEditRole = () => {},
  onDeactivate = () => {},
}) => {
  const columns: Column<EmployeeRowItem>[] = [
    {
      header: "Employee",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 ${row.bg}`}
          >
            {row.initials}
          </div>
          <div>
            <div className="font-semibold text-slate-200 group-hover:text-blue-400 transition">
              {row.name}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Sub-Role",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${row.roleColor}`}
        >
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className="flex items-center gap-1.5 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-200">{row.status}</span>
        </span>
      ),
    },
    {
      header: "Assigned Projects",
      render: (row) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {row.projects.map((p) => (
            <span
              key={p}
              className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700"
            >
              {p}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Joined Date",
      accessor: "joined",
      render: (row) => (
        <span className="font-mono text-slate-400 text-[11px]">
          {row.joined}
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
              onEditRole(row.id);
            }}
            className="text-blue-400 hover:text-blue-300 font-medium text-xs cursor-pointer"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeactivate(row.id);
            }}
            className="text-slate-500 hover:text-rose-400 font-medium text-xs cursor-pointer"
          >
            Deactivate
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={employees}
      keyExtractor={(emp) => emp.id}
      onRowClick={onSelectEmployee}
      emptyMessage="No employees found matching filter criteria."
    />
  );
};

export default EmployeeTable;