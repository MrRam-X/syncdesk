import { type FC, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Tasks from "@/features/tasks";
import { type NavItem } from "@/components/layout/Sidebar";
import { type ProjectOption } from "@/components/layout/Navbar";

const TasksPage: FC = () => {
  const [currentNav, setCurrentNav] = useState<NavItem>("tasks");
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
      <Tasks
        onOpenNewTaskModal={() => alert("New work item modal")}
        onSelectTask={(task) => alert(`Selected task ${task.id}`)}
      />
    </AppShell>
  );
};

export default TasksPage;