import { type FC } from "react";
import MultiTenantQuotas from "./components/MultiTenantQuotas";
import OrganizaitonOverviewCard from "./components/OrganizaitonOverviewCard";
import TopNavigation from "./components/TopNavigation";
import OrganizationOwnerContactInfo from "./components/OrganizationOwnerContactInfo";
import type { OrganizationRowItem } from "../organization/components/OrganizationTable";
import { useNavigate } from "react-router-dom";

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

const OrganizationDetailsView: FC = () => {
  const navigate = useNavigate();
  const backButtonClickHandler = () => {
    navigate(-1)
  };

  const deleteButtonClickHandler = () => {
    alert("Delete button clicked");
  };

  return (
    <div className="space-y-6 w-full select-none">
      {/* Top Navigation & Breadcrumb */}
      <TopNavigation
        onBack={backButtonClickHandler}
        onRequestDelete={deleteButtonClickHandler}
        organization={initialOrganizations[0]}
      />

      {/* Organization Overview Card */}
      <OrganizaitonOverviewCard organization={initialOrganizations[0]} />

      {/* Multi-Tenant Quotas */}
      <MultiTenantQuotas organization={initialOrganizations[0]} />

      {/* Owner Contact Information */}
      <OrganizationOwnerContactInfo organization={initialOrganizations[0]} />
    </div>
  );
};

export default OrganizationDetailsView;