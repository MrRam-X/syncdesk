import { type FC } from "react";
import {
  ArrowLeft,
  Mail,
  Calendar,
  ShieldCheck,
  UserX,
  Pencil,
} from "lucide-react";
import { type EmployeeRowItem } from "./EmployeeTable";

interface EmployeeDetailsProps {
  employee: EmployeeRowItem;
  onBack: () => void;
  onEditRole?: () => void;
  onDeactivate?: () => void;
}

const EmployeeDetails: FC<EmployeeDetailsProps> = ({
  employee,
  onBack,
  onEditRole = () => {},
  onDeactivate = () => {},
}) => {
  return (
    <div className="space-y-6 w-full select-none">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
            title="Back to Employees"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Owner Portal</span>
              <span>/</span>
              <span>Employees</span>
              <span>/</span>
              <span className="text-blue-400 font-semibold">
                {employee.name}
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white mt-0.5">
              Employee Profile & Access Control
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onEditRole}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-xs font-semibold text-slate-300 transition cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-blue-400" />
            <span>Edit Sub-Role</span>
          </button>
          <button
            type="button"
            onClick={onDeactivate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-900/40 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-400 transition cursor-pointer"
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Deactivate</span>
          </button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full text-white text-lg font-bold flex items-center justify-center shrink-0 ${employee.bg}`}
          >
            {employee.initials}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-white">{employee.name}</h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${employee.roleColor}`}
              >
                {employee.role}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{employee.email}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Joined {employee.joined}</span>
              </span>
            </div>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Active Account
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl space-y-1">
          <div className="text-slate-400 text-xs">Assigned Repositories</div>
          <div className="text-2xl font-bold font-mono text-white">
            {employee.projects.length} Repos
          </div>
          <p className="text-[11px] text-blue-400">Has repository access</p>
        </div>

        <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl space-y-1">
          <div className="text-slate-400 text-xs">Active Tasks Assigned</div>
          <div className="text-2xl font-bold font-mono text-purple-400">
            4 Tasks
          </div>
          <p className="text-[11px] text-slate-500">
            2 in progress • 2 in review
          </p>
        </div>

        <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl space-y-1">
          <div className="text-slate-400 text-xs">Security & Scope</div>
          <div className="text-xl font-bold font-mono text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5" />
            <span>Verified</span>
          </div>
          <p className="text-[11px] text-slate-500">Acme Corp SSO Enabled</p>
        </div>
      </div>

      {/* Assigned Projects List */}
      <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Project Assignments
        </h3>
        <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
          {employee.projects.map((projKey) => (
            <div
              key={projKey}
              className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-900 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                  {projKey}
                </span>
                <span className="font-semibold text-slate-200">
                  {projKey === "SYNC"
                    ? "Payments Engine"
                    : projKey === "MOB"
                      ? "Mobile Banking App"
                      : "Authentication & SSO"}
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">
                Sub-Role: {employee.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;