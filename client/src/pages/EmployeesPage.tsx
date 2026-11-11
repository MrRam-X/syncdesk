import { type FC, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Employees from "@/features/employees";
import { type NavItem } from "@/components/layout/Sidebar";
import { type ProjectOption } from "@/components/layout/Navbar";

const EmployeesPage: FC = () => {
  const [currentNav, setCurrentNav] = useState<NavItem>("projects");
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
      <Employees />
    </AppShell>
  );
};

export default EmployeesPage;