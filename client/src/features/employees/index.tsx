import { type FC, useState } from "react";
import {
  UserPlus,
  Search,
  ChevronDown,
  LayoutDashboard,
  Users,
} from "lucide-react";
import OwnerDashboardView from "./components/OwnerDashboardView";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEmployeeModal from "./components/AddEmployeeModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  TableSkeleton,
  CardGridSkeleton,
} from "@/components/feedback/Skeletons";
import {
  useEmployees,
  useOwnerDashboard,
  useOwnerMutations,
  type EmployeeData,
} from "./hooks/useOwner";

const Employees: FC = () => {
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useOwnerDashboard();
  const { data: employees = [], isLoading: isEmployeesLoading } =
    useEmployees();
  const { addEmployee, isAddingEmployee, toggleStatus, deleteEmployee } =
    useOwnerMutations();

  const [activeSubTab, setActiveSubTab] = useState<"dashboard" | "employees">(
    "dashboard",
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeData | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "All Roles" || emp.subRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      await deleteEmployee(employeeToDelete.id);
      if (selectedEmployeeId === employeeToDelete.id) {
        setSelectedEmployeeId(null);
      }
      setEmployeeToDelete(null);
    }
  };

  // 1. Employee Details View
  if (selectedEmployee) {
    return (
      <EmployeeDetails
        employee={{
          id: selectedEmployee.id,
          name: selectedEmployee.fullName,
          email: selectedEmployee.email,
          role: selectedEmployee.subRole,
          roleColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          status: selectedEmployee.isActive ? "Active" : "Deactivated",
          joined: new Date(selectedEmployee.createdAt).toLocaleDateString(),
          projects: ["SYNC"],
          initials: selectedEmployee.fullName.slice(0, 2).toUpperCase(),
          bg: "bg-blue-600",
        }}
        onBack={() => setSelectedEmployeeId(null)}
      />
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Top Header & Sub-Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Owner Portal</span>
            <span>/</span>
            <span className="text-purple-400 font-semibold">
              {dashboardData?.orgName || "Workspace"}
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Workforce Governance
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Sub-Tab Navigation */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveSubTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                activeSubTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Owner Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("employees")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                activeSubTab === "employees"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Employees Roster</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Tab 1: Dashboard View */}
      {activeSubTab === "dashboard" && (
        <>
          {isDashboardLoading ? (
            <CardGridSkeleton count={4} columns={4} />
          ) : (
            <OwnerDashboardView
              data={dashboardData}
              onViewRoster={() => setActiveSubTab("employees")}
            />
          )}
        </>
      )}

      {/* 3. Sub-Tab 2: Employees Directory */}
      {activeSubTab === "employees" && (
        <div className="space-y-4">
          <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs"
              />
            </div>

            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-8 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 rounded-lg px-3 pr-8 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
              >
                <option value="All Roles">All Sub-Roles</option>
                <option value="PROJECT_SUPERVISOR">Project Supervisor</option>
                <option value="COORDINATOR">Coordinator</option>
                <option value="CONTRIBUTOR">Contributor</option>
                <option value="READER">Reader</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {isEmployeesLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <EmployeeTable
              employees={filteredEmployees}
              onSelectEmployee={(emp) => setSelectedEmployeeId(emp.id)}
              onToggleStatus={(emp) =>
                toggleStatus({ id: emp.id, isActive: !emp.isActive })
              }
              onDeleteEmployee={(emp) => setEmployeeToDelete(emp)}
            />
          )}
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEmployee={addEmployee}
        isLoading={isAddingEmployee}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Employee"
        message={`Are you sure you want to remove "${employeeToDelete?.fullName}" from your organization? Assigned tasks will be unassigned automatically.`}
        confirmLabel="Remove Employee"
      />
    </div>
  );
};

export default Employees;