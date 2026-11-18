import { type FC } from "react";
import type { OrganizationRowItem } from "../organization/components/OrganizationTable";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE_NAMES } from "@/constants/appConstant";
import OperationsStatCardContainer from "./components/OperationsStatCardContainer";
import PlanwiseTenatsContainer from "./components/PlanwiseTenatsContainer";
import RecentTenantsContainer from "./components/RecentTenantsContainer";
import { useAdminDashboard, type AdminDashboardData } from "../hooks/useAdmin";

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

const AdminDashboard: FC = () => {
  const navigate = useNavigate();

  const redirectToOrganizationsPage = () => {
    navigate(`/${APP_ROUTE_NAMES.ORGANIZATIONS}`);
  };

  const {
    data: adminDashboardData = {} as AdminDashboardData,
    isLoading: isAdminDashboardDataLoading,
    isError,
    error,
  } = useAdminDashboard();
  console.log({ adminDashboardData });

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
      </div>
      <div className="space-y-6 w-full select-none">
        {/* Platform Operations Stat Cards */}
        <OperationsStatCardContainer
          isLoading={isAdminDashboardDataLoading}
          totalAccounts={adminDashboardData.totalUsers}
          totalOrgs={adminDashboardData.totalOrganizations}
          totalProjects={adminDashboardData.totalProjects}
        />

        {/* Two Column Grid: Plan Distribution & Recent Onboardings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Tenancy Plan Breakdown */}
          <PlanwiseTenatsContainer />

          {/* Right: Recent Tenant Onboardings */}
          <RecentTenantsContainer
            isLoading={isAdminDashboardDataLoading}
            recentOrgs={adminDashboardData.recentOrgs}
            onViewAllOrgs={redirectToOrganizationsPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;