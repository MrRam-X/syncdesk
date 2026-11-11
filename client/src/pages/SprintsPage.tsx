import { type FC, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Sprints from "@/features/sprints";
import { type NavItem } from "@/components/layout/Sidebar";
import { type ProjectOption } from "@/components/layout/Navbar";

const SprintsPage: FC = () => {
  const [currentNav, setCurrentNav] = useState<NavItem>("sprints");
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

  const handleGoToBoard = (projectKey: string) => {
    alert(`Navigating to board for ${projectKey}...`);
  };

  return (
    <AppShell
      currentNav={currentNav}
      onNavChange={handleNavChange}
      currentProject={currentProject}
      onSelectProject={handleSelectProject}
    >
      <Sprints onGoToBoard={handleGoToBoard} />
    </AppShell>
  );
};

export default SprintsPage;
