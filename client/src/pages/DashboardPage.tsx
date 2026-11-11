import { type FC, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/features/dashboard";
import { type NavItem } from "@/components/layout/Sidebar";
import { type ProjectOption } from "@/components/layout/Navbar";

const DashboardPage: FC = () => {
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

  const handleGoToBoard = () => {
    alert("Navigating to task board...");
  };

  return (
    <AppShell
      currentNav={currentNav}
      onNavChange={handleNavChange}
      currentProject={currentProject}
      onSelectProject={handleSelectProject}
    >
      <Dashboard onGoToBoard={handleGoToBoard} />
    </AppShell>
  );
};

export default DashboardPage;
