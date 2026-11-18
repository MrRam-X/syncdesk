import { type FC } from "react";
import DataTable, { type Column } from "@/components/common/DataTable";
import { type EmployeeData } from "../hooks/useOwner";

interface EmployeeTableProps {
  employees: EmployeeData[];
  onSelectEmployee: (emp: EmployeeData) => void;
  onEditRole?: (emp: EmployeeData) => void;
  onToggleStatus?: (emp: EmployeeData) => void;
  onDeleteEmployee?: (emp: EmployeeData) => void;
}

const roleBadges: Record<string, string> = {
  PROJECT_SUPERVISOR: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  COORDINATOR: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  CONTRIBUTOR: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  READER: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const roleLabels: Record<string, string> = {
  PROJECT_SUPERVISOR: "Project Supervisor",
  COORDINATOR: "Coordinator",
  CONTRIBUTOR: "Contributor",
  READER: "Reader",
};

const EmployeeTable: FC<EmployeeTableProps> = ({
  employees,
  onSelectEmployee,
  onEditRole = () => {},
  onToggleStatus = () => {},
  onDeleteEmployee = () => {},
}) => {
  const columns: Column<EmployeeData>[] = [
    {
      header: "Employee",
      render: (row) => {
        const initials = row.fullName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 bg-blue-600">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-slate-200 group-hover:text-blue-400 transition">
                {row.fullName}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {row.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Sub-Role",
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${roleBadges[row.subRole] || "bg-slate-800 text-slate-400"}`}
        >
          {roleLabels[row.subRole] || row.subRole}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className="flex items-center gap-1.5 text-[11px]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${row.isActive ? "bg-emerald-400" : "bg-rose-400"}`}
          />
          <span className={row.isActive ? "text-slate-200" : "text-rose-400"}>
            {row.isActive ? "Active" : "Deactivated"}
          </span>
        </span>
      ),
    },
    {
      header: "Joined Date",
      render: (row) => (
        <span className="font-mono text-slate-400 text-[11px]">
          {new Date(row.createdAt).toLocaleDateString()}
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
              onEditRole(row);
            }}
            className="text-blue-400 hover:text-blue-300 font-medium text-xs cursor-pointer"
          >
            Edit Role
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(row);
            }}
            className="text-slate-400 hover:text-amber-400 font-medium text-xs cursor-pointer"
          >
            {row.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteEmployee(row);
            }}
            className="text-slate-500 hover:text-rose-400 font-medium text-xs cursor-pointer"
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
      data={employees}
      keyExtractor={(emp) => emp.id}
      onRowClick={onSelectEmployee}
      emptyMessage="No employees found in your organization."
    />
  );
};

export default EmployeeTable;