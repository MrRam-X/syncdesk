import AppShell from "@/components/layout/AppShell";
import type { ProjectOption } from "@/components/layout/Navbar";
import type { NavItem } from "@/components/layout/Sidebar";
import OrganizationDetailsView from "@/features/admin/organization-details";
import React, { useState } from "react";

const AdminOrganizationDetailsPage = () => {
  const [currentNav, setCurrentNav] = useState<NavItem>("dashboard");
  const [currentProject, setCurrentProject] = useState<ProjectOption>({
    name: "Payments Engine",
    key: "SYNC",
    description: "Stripe, PayPal & billing pipeline",
  });

  const handleNavChange = (nav: NavItem) => {
    setCurrentNav(nav);
  };

  const handleSelectProject = (project: ProjectOption) => {
    setCurrentProject(project);
  };

  return (
    <AppShell
      currentNav={currentNav}
      onNavChange={handleNavChange}
      currentProject={currentProject}
      onSelectProject={handleSelectProject}
    >
      <OrganizationDetailsView />
    </AppShell>
  );
};

export default AdminOrganizationDetailsPage;
