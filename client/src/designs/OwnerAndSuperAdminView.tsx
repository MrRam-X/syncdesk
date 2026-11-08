import { useState } from 'react';
import {
  Users,
  Building2,
  ShieldCheck,
  ShieldAlert,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  UserPlus,
  X,
  Layers,
} from 'lucide-react';

export default function OwnerAndSuperAdminView() {
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Switcher between Owner Portal and Super Admin Portal
  const [portalMode, setPortalMode] = useState<'owner' | 'admin'>('owner');

  // Modal state for inviting new employee (Owner view)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Filter states
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  // Sample Employees Data (Owner View - Acme Corp)
  const employees = [
    {
      id: 'emp-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@acme.com',
      role: 'Project Supervisor',
      roleColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      status: 'Active',
      joined: 'Oct 12, 2026',
      projects: ['SYNC', 'MOB'],
      initials: 'AR',
      bg: 'bg-blue-600',
    },
    {
      id: 'emp-2',
      name: 'Sarah Chen',
      email: 'sarah.chen@acme.com',
      role: 'Coordinator',
      roleColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      status: 'Active',
      joined: 'Oct 14, 2026',
      projects: ['SYNC', 'AUTH'],
      initials: 'SC',
      bg: 'bg-emerald-600',
    },
    {
      id: 'emp-3',
      name: 'John Doe',
      email: 'john.doe@acme.com',
      role: 'Contributor',
      roleColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      status: 'Active',
      joined: 'Oct 18, 2026',
      projects: ['SYNC', 'MOB', 'DATA'],
      initials: 'JD',
      bg: 'bg-purple-600',
    },
    {
      id: 'emp-4',
      name: 'Elena Rostova',
      email: 'elena.rostova@acme.com',
      role: 'Reader',
      roleColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      status: 'Active',
      joined: 'Oct 22, 2026',
      projects: ['AUTH'],
      initials: 'ER',
      bg: 'bg-slate-700',
    },
    {
      id: 'emp-5',
      name: 'Marcus Vance',
      email: 'marcus.vance@acme.com',
      role: 'Contributor',
      roleColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      status: 'Invited',
      joined: 'Pending Invite',
      projects: ['SYNC', 'DATA'],
      initials: 'MV',
      bg: 'bg-amber-600',
    },
  ];

  // Sample Organizations Data (Super Admin View)
  const organizations = [
    {
      id: 'org-1',
      name: 'Acme Corporation',
      slug: 'acme-corp',
      ownerName: 'Sarah Vance',
      ownerEmail: 'owner@acme.com',
      ownerInitials: 'SV',
      usersCount: 24,
      projectsCount: 4,
      created: 'Oct 10, 2026',
      status: 'Active',
      plan: 'Enterprise Tier',
    },
    {
      id: 'org-2',
      name: 'Stripefin Technologies',
      slug: 'stripefin-tech',
      ownerName: 'David Kross',
      ownerEmail: 'david@stripefin.io',
      ownerInitials: 'DK',
      usersCount: 18,
      projectsCount: 3,
      created: 'Oct 15, 2026',
      status: 'Active',
      plan: 'Growth Tier',
    },
    {
      id: 'org-3',
      name: 'Nexus Health Systems',
      slug: 'nexus-health',
      ownerName: 'Dr. Clara Oswald',
      ownerEmail: 'clara@nexushealth.org',
      ownerInitials: 'CO',
      usersCount: 42,
      projectsCount: 7,
      created: 'Oct 20, 2026',
      status: 'Active',
      plan: 'Enterprise Tier',
    },
    {
      id: 'org-4',
      name: 'Vanguard Logistics',
      slug: 'vanguard-logistics',
      ownerName: 'Thomas Thorne',
      ownerEmail: 'thomas@vanguard.co',
      ownerInitials: 'TT',
      usersCount: 8,
      projectsCount: 1,
      created: 'Nov 02, 2026',
      status: 'Suspended',
      plan: 'Starter Tier',
    },
  ];

  // Filtered Employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.email.toLowerCase().includes(employeeSearch.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* ========================================================= */}
      {/* STATIC GLOBAL HEADER                                      */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 relative">
        
        {/* Left: Brand & Portal Mode Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-white select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
              S
            </div>
            <span>Syncdesk</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Top Switcher: Inspect Owner vs Admin View */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setPortalMode('owner')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                portalMode === 'owner'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Owner: /employees</span>
            </button>

            <button
              onClick={() => setPortalMode('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                portalMode === 'admin'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Super Admin: /admin/orgs</span>
            </button>
          </div>
        </div>

        {/* Right: Badge, Notifications & Profile Avatar */}
        <div className="flex items-center gap-3">
          {portalMode === 'owner' ? (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-medium text-purple-400">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Owner • Acme Corp</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-medium text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>System Super-Admin</span>
            </div>
          )}

          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition relative cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-2 pl-1 group cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition">
              {portalMode === 'owner' ? 'SV' : 'SA'}
            </div>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* BODY WRAPPER                                              */}
      {/* ========================================================= */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ========================================================= */}
        {/* COLLAPSIBLE SIDEBAR                                       */}
        {/* ========================================================= */}
        <aside
          className={`border-r border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between shrink-0 select-none transition-all duration-300 ease-in-out relative z-20 ${
            isSidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Vertical Tab Handle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-14 bg-slate-900 hover:bg-slate-800 border-y border-r border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-r-md flex items-center justify-center shadow-md transition-all duration-200 z-40 cursor-pointer group"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            )}
          </button>

          <div className="space-y-6">
            <div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSidebarCollapsed
                    ? 'max-h-0 opacity-0 -translate-y-1 mb-0'
                    : 'max-h-6 opacity-100 translate-y-0 mb-2'
                }`}
              >
                <div className="px-2.5 text-[10px] font-semibold tracking-wider uppercase text-slate-400 whitespace-nowrap">
                  {portalMode === 'owner' ? 'Owner Portal' : 'Administration'}
                </div>
              </div>

              <nav className="space-y-1">
                {portalMode === 'owner' ? (
                  <>
                    <button
                      className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-blue-600/15 text-blue-400 border border-blue-500/20"
                    >
                      <Users className="w-4 h-4 shrink-0" />
                      <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}>
                        Employees
                      </span>
                    </button>

                    <a href="#projects" className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors cursor-pointer">
                      <Layers className="w-4 h-4 shrink-0" />
                      <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}>
                        All Projects
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    <button
                      className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-rose-600/15 text-rose-400 border border-rose-500/20"
                    >
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}>
                        Organizations
                      </span>
                    </button>

                    <a href="#tenants" className="w-full flex items-center gap-3 py-2 px-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-colors cursor-pointer">
                      <Users className="w-4 h-4 shrink-0" />
                      <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}>
                        Global Users
                      </span>
                    </a>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Footer Workspace Info */}
          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 whitespace-nowrap">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
              <span className="font-mono text-[10px] text-slate-500">v1.0</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium truncate">
              {portalMode === 'owner' ? 'Acme Corp Workspace' : 'Root System Admin'}
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN CANVAS: OWNER VIEW OR ADMIN VIEW                     */}
        {/* ========================================================= */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950">
          
          {/* ------------------------------------------------------- */}
          {/* 1. OWNER PORTAL: EMPLOYEE DIRECTORY & SUB-ROLES         */}
          {/* ------------------------------------------------------- */}
          {portalMode === 'owner' && (
            <>
              {/* Header Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>Owner Portal</span>
                    <span>/</span>
                    <span className="text-blue-400 font-semibold">Employees</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-white mt-1">
                    Employee Directory & Access Control
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage team member sub-roles, project access permissions, and workplace accounts for Acme Corp.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Invite Employee</span>
                  </button>
                </div>
              </div>

              {/* KPI Counters Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-slate-400 text-xs">Total Employees</div>
                  <div className="text-xl font-bold font-mono text-white">{employees.length}</div>
                </div>

                <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-slate-400 text-xs">Project Supervisors</div>
                  <div className="text-xl font-bold font-mono text-blue-400">
                    {employees.filter((e) => e.role === 'Project Supervisor').length}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-slate-400 text-xs">Coordinators</div>
                  <div className="text-xl font-bold font-mono text-purple-400">
                    {employees.filter((e) => e.role === 'Coordinator').length}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-slate-400 text-xs">Contributors & Readers</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {employees.filter((e) => e.role === 'Contributor' || e.role === 'Reader').length}
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
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

              {/* Employee Roster Table */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Sub-Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Assigned Projects</th>
                      <th className="py-3 px-4">Joined Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-900/60 transition">
                        
                        {/* Employee Name & Email */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 ${emp.bg}`}>
                              {emp.initials}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-200">{emp.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{emp.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Sub-Role Badge */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${emp.roleColor}`}>
                            {emp.role}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <span className={emp.status === 'Active' ? 'text-slate-200' : 'text-amber-400'}>{emp.status}</span>
                          </span>
                        </td>

                        {/* Assigned Projects Badges */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {emp.projects.map((p) => (
                              <span key={p} className="px-1.5 py-0.2 rounded font-mono text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Joined Date */}
                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                          {emp.joined}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button className="text-blue-400 hover:text-blue-300 font-medium text-xs cursor-pointer mr-3">
                            Edit Role
                          </button>
                          <button className="text-slate-500 hover:text-rose-400 font-medium text-xs cursor-pointer">
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ------------------------------------------------------- */}
          {/* 2. SUPER ADMIN PORTAL: GLOBAL TENANTS DIRECTORY         */}
          {/* ------------------------------------------------------- */}
          {portalMode === 'admin' && (
            <>
              {/* Header Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-rose-400 font-semibold">Super-Admin</span>
                    <span>/</span>
                    <span className="text-slate-300">Tenants</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-white mt-1">
                    Multi-Tenant Organization Registry
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Inspect, manage, and audit all company organizations hosted on Syncdesk.
                  </p>
                </div>
              </div>

              {/* Global KPI Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs">Total Organizations</span>
                    <div className="text-2xl font-bold font-mono text-white">{organizations.length}</div>
                    <p className="text-[11px] text-slate-500">Registered enterprises</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs">Users Worldwide</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400">92 Users</div>
                    <p className="text-[11px] text-slate-500">Across all organizations</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs">Hosted Projects</span>
                    <div className="text-2xl font-bold font-mono text-purple-400">15 Projects</div>
                    <p className="text-[11px] text-slate-500">Active repositories</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Organization Directory Table */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                      <th className="py-3 px-4">Organization</th>
                      <th className="py-3 px-4">Owner Contact</th>
                      <th className="py-3 px-4">Users</th>
                      <th className="py-3 px-4">Projects</th>
                      <th className="py-3 px-4">Subscription</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {organizations.map((org) => (
                      <tr key={org.id} className="hover:bg-slate-900/60 transition">
                        
                        {/* Org Name & Slug */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                              {org.name[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{org.name}</div>
                              <div className="text-[11px] text-slate-500 font-mono">syncdesk.app/{org.slug}</div>
                            </div>
                          </div>
                        </td>

                        {/* Owner Contact */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {org.ownerInitials}
                            </div>
                            <div>
                              <div className="font-medium text-slate-200">{org.ownerName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{org.ownerEmail}</div>
                            </div>
                          </div>
                        </td>

                        {/* User Count */}
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {org.usersCount} users
                        </td>

                        {/* Projects Count */}
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {org.projectsCount} repos
                        </td>

                        {/* Tier */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            {org.plan}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            org.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {org.status}
                          </span>
                        </td>

                        {/* Admin Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button className="text-slate-400 hover:text-white transition font-medium text-xs cursor-pointer">
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* INVITE EMPLOYEE MODAL (Owner Portal Action)               */}
      {/* ========================================================= */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsInviteModalOpen(false)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Invite Team Member</h2>
                  <p className="text-[11px] text-slate-400">Add an employee to Acme Corp and configure sub-role permissions</p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsInviteModalOpen(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Liam Smith"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="liam.smith@acme.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assigned Sub-Role
                </label>
                <div className="relative">
                  <select
                    defaultValue="Contributor"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition"
                  >
                    <option value="Project Supervisor">Project Supervisor (Full project & task CRUD)</option>
                    <option value="Coordinator">Coordinator (Sprint, backlog & task CRUD)</option>
                    <option value="Contributor">Contributor (Update assigned tasks)</option>
                    <option value="Reader">Reader (Read-only spectator)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}