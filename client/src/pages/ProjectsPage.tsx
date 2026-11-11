import { type FC, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Projects from '@/features/projects';
import { type NavItem } from '@/components/layout/Sidebar';
import { type ProjectOption } from '@/components/layout/Navbar';

const ProjectsPage: FC = () => {
  const [currentNav, setCurrentNav] = useState<NavItem>('projects');
  const [currentProject, setCurrentProject] = useState<ProjectOption>({
    name: 'Payments Engine',
    key: 'SYNC',
    description: 'Stripe, PayPal & billing pipeline',
  });

  const handleNavChange = (nav: NavItem) => {
    setCurrentNav(nav);
  };

  const handleSelectProject = (project: ProjectOption) => {
    setCurrentProject(project);
  };

  const handleOpenBoard = (projectKey: string) => {
    alert(`Navigating to board for ${projectKey}`);
  };

  return (
    <AppShell
      currentNav={currentNav}
      onNavChange={handleNavChange}
      currentProject={currentProject}
      onSelectProject={handleSelectProject}
    >
      <Projects onOpenBoard={handleOpenBoard} />
    </AppShell>
  );
};

export default ProjectsPage;