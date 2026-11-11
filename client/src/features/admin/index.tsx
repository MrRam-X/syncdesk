import { type FC, useState } from "react";
import { Plus, LayoutDashboard, Building2 } from "lucide-react";
import AdminDashboardView from "./components/AdminDashboardView";
import OrganizationTable, {
  type OrganizationRowItem,
} from "./components/OrganizationTable";
import OrganizationDetails from "./components/OrganizationDetails";
import AddOrgModal, { type NewOrgData } from "./components/AddOrgModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const initialOrganizations: OrganizationRowItem[] = [
  {
    id: "org-1",
    name: "Acme Corporation",
    slug: "acme-corp",
    ownerName: "Sarah Vance",
    ownerEmail: "owner@acme.com",
    ownerInitials: "SV",
    usersCount: 24,
    projectsCount: 4,
    created: "Oct 10, 2026",
    status: "Active",
    plan: "Enterprise Tier",
  },
  {
    id: "org-2",
    name: "Stripefin Technologies",
    slug: "stripefin-tech",
    ownerName: "David Kross",
    ownerEmail: "david@stripefin.io",
    ownerInitials: "DK",
    usersCount: 18,
    projectsCount: 3,
    created: "Oct 15, 2026",
    status: "Active",
    plan: "Growth Tier",
  },
  {
    id: "org-3",
    name: "Nexus Health Systems",
    slug: "nexus-health",
    ownerName: "Dr. Clara Oswald",
    ownerEmail: "clara@nexushealth.org",
    ownerInitials: "CO",
    usersCount: 42,
    projectsCount: 7,
    created: "Oct 20, 2026",
    status: "Active",
    plan: "Enterprise Tier",
  },
  {
    id: "org-4",
    name: "Vanguard Logistics",
    slug: "vanguard-logistics",
    ownerName: "Thomas Thorne",
    ownerEmail: "thomas@vanguard.co",
    ownerInitials: "TT",
    usersCount: 8,
    projectsCount: 1,
    created: "Nov 02, 2026",
    status: "Suspended",
    plan: "Starter Tier",
  },
];

const AdminOrgs: FC = () => {
  const [organizations, setOrganizations] =
    useState<OrganizationRowItem[]>(initialOrganizations);
  const [activeSubTab, setActiveSubTab] = useState<
    "dashboard" | "organizations"
  >("dashboard");
  const [selectedOrg, setSelectedOrg] = useState<OrganizationRowItem | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<OrganizationRowItem | null>(
    null,
  );

  const handleAddOrg = (data: NewOrgData) => {
    const newOrg: OrganizationRowItem = {
      id: `org-${Date.now()}`,
      name: data.name,
      slug: data.slug,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerInitials: data.ownerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      usersCount: 1,
      projectsCount: 0,
      created: "Just now",
      status: "Active",
      plan: data.plan,
    };
    setOrganizations([newOrg, ...organizations]);
  };

  const handleConfirmDelete = () => {
    if (orgToDelete) {
      setOrganizations((prev) => prev.filter((o) => o.id !== orgToDelete.id));
      if (selectedOrg?.id === orgToDelete.id) {
        setSelectedOrg(null);
      }
      setOrgToDelete(null);
    }
  };

  // 1. Organization Details View
  if (selectedOrg) {
    return (
      <OrganizationDetails
        organization={selectedOrg}
        onBack={() => setSelectedOrg(null)}
        onRequestDelete={() => setOrgToDelete(selectedOrg)}
      />
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header Info & Sub-Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-rose-400 font-semibold">Super-Admin</span>
            <span>/</span>
            <span className="text-slate-300">System Governance</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Multi-Tenant Administration
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
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("organizations")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                activeSubTab === "organizations"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Organizations</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Organization</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Tab 1: Dashboard View */}
      {activeSubTab === "dashboard" && (
        <AdminDashboardView
          totalOrgs={organizations.length}
          recentOrgs={organizations.slice(0, 4)}
          onViewAllOrgs={() => setActiveSubTab("organizations")}
        />
      )}

      {/* 3. Sub-Tab 2: Organizations Directory */}
      {activeSubTab === "organizations" && (
        <OrganizationTable
          organizations={organizations}
          onSelectOrg={setSelectedOrg}
          onRequestDelete={setOrgToDelete}
        />
      )}

      {/* Add Org Modal */}
      <AddOrgModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddOrg={handleAddOrg}
      />

      {/* Generic Destructive Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!orgToDelete}
        onClose={() => setOrgToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Organization"
        message={`Are you sure you want to permanently delete "${orgToDelete?.name}"? All hosted projects, sprints, work items, and employee accounts will be permanently destroyed.`}
      />
    </div>
  );
};

export default AdminOrgs;