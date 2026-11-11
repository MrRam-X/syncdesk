import { type FC, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import AdminOrgs from '@/features/admin';
import { type NavItem } from '@/components/layout/Sidebar';
import { type ProjectOption } from '@/components/layout/Navbar';

const AdminOrgsPage: FC = () => {
  const [currentNav, setCurrentNav] = useState<NavItem>('dashboard');
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

  return (
    <AppShell
      currentNav={currentNav}
      onNavChange={handleNavChange}
      currentProject={currentProject}
      onSelectProject={handleSelectProject}
    >
      <AdminOrgs />
    </AppShell>
  );
};

export default AdminOrgsPage;