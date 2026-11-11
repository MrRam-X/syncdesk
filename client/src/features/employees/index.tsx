import { type FC, useState } from "react";
import {
  UserPlus,
  Search,
  ChevronDown,
  LayoutDashboard,
  Users,
} from "lucide-react";
import OwnerDashboardView from "./components/OwnerDashboardView";
import EmployeeTable, {
  type EmployeeRowItem,
} from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEmployeeModal, {
  type NewEmployeeData,
} from "./components/AddEmployeeModal";

const sampleEmployees: EmployeeRowItem[] = [
  {
    id: "emp-1",
    name: "Alex Rivera",
    email: "alex.rivera@acme.com",
    role: "Project Supervisor",
    roleColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    status: "Active",
    joined: "Oct 12, 2026",
    projects: ["SYNC", "MOB"],
    initials: "AR",
    bg: "bg-blue-600",
  },
  {
    id: "emp-2",
    name: "Sarah Chen",
    email: "sarah.chen@acme.com",
    role: "Coordinator",
    roleColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    status: "Active",
    joined: "Oct 14, 2026",
    projects: ["SYNC", "AUTH"],
    initials: "SC",
    bg: "bg-emerald-600",
  },
  {
    id: "emp-3",
    name: "John Doe",
    email: "john.doe@acme.com",
    role: "Contributor",
    roleColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    status: "Active",
    joined: "Oct 18, 2026",
    projects: ["SYNC", "MOB"],
    initials: "JD",
    bg: "bg-purple-600",
  },
  {
    id: "emp-4",
    name: "Elena Rostova",
    email: "elena.rostova@acme.com",
    role: "Reader",
    roleColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    status: "Active",
    joined: "Oct 22, 2026",
    projects: ["AUTH"],
    initials: "ER",
    bg: "bg-slate-700",
  },
  {
    id: "emp-5",
    name: "Marcus Vance",
    email: "marcus.vance@acme.com",
    role: "Contributor",
    roleColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    status: "Active",
    joined: "Nov 01, 2026",
    projects: ["SYNC", "DATA"],
    initials: "MV",
    bg: "bg-amber-600",
  },
];

const Employees: FC = () => {
  const [employees, setEmployees] =
    useState<EmployeeRowItem[]>(sampleEmployees);
  const [activeSubTab, setActiveSubTab] = useState<"dashboard" | "employees">(
    "dashboard",
  );
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeRowItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddEmployee = (data: NewEmployeeData) => {
    const newEmp: EmployeeRowItem = {
      id: `emp-${Date.now()}`,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role,
      roleColor:
        data.role === "Project Supervisor"
          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
          : data.role === "Coordinator"
            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
            : data.role === "Reader"
              ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
              : "bg-sky-500/10 text-sky-400 border-sky-500/20",
      status: "Active",
      joined: "Just now",
      projects: ["SYNC"],
      initials: `${data.firstName[0]}${data.lastName[0]}`.toUpperCase(),
      bg: "bg-indigo-600",
    };
    setEmployees([newEmp, ...employees]);
  };

  // 1. Employee Details View
  if (selectedEmployee) {
    return (
      <EmployeeDetails
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
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
            <span className="text-purple-400 font-semibold">Acme Corp</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Workforce Governance
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Sub-Tab Switcher */}
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

      {/* 2. Sub-Tab 1: Owner Dashboard */}
      {activeSubTab === "dashboard" && (
        <OwnerDashboardView
          totalEmployees={employees.length}
          onViewRoster={() => setActiveSubTab("employees")}
        />
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
                <option value="Project Supervisor">Project Supervisor</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Contributor">Contributor</option>
                <option value="Reader">Reader</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <EmployeeTable
            employees={filteredEmployees}
            onSelectEmployee={setSelectedEmployee}
          />
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;