import { type FC, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/features/dashboard";
import { type NavItem } from "@/components/layout/Sidebar";
import { type ProjectOption } from "@/components/layout/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { UserRole } from "@syncdesk/shared";
import AdminDashboard from "@/features/admin/dashboard";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE_NAMES } from "@/constants/appConstant";

const DashboardPage: FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
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
    navigate(`/${APP_ROUTE_NAMES.BOARD}`)
  };

  return (
    <AppShell
      currentNav={currentNav}
      onNavChange={handleNavChange}
      currentProject={currentProject}
      onSelectProject={handleSelectProject}
    >
      {user && user.role === UserRole.ADMIN ? (
        <AdminDashboard />
      ) : (
        <Dashboard onGoToBoard={handleGoToBoard} />
      )}
    </AppShell>
  );
};

export default DashboardPage;
