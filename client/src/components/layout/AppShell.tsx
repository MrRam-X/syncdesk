import { useState, type ReactNode } from "react";
import { Navbar, type ProjectOption } from "./Navbar";
import { Sidebar, type NavItem } from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
  currentNav: NavItem;
  onNavChange: (nav: NavItem) => void;
  currentProject?: ProjectOption;
  onSelectProject?: (proj: ProjectOption) => void;
}

const defaultProject: ProjectOption = {
  name: "Payments Engine",
  key: "SYNC",
  description: "Stripe, PayPal & billing pipeline",
};

const AppShell = ({
  children,
  currentNav,
  onNavChange,
  currentProject = defaultProject,
  onSelectProject = () => {},
}: AppShellProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar
        currentProject={currentProject}
        onSelectProject={onSelectProject}
      />

      {/* Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentNav={currentNav}
          onNavChange={onNavChange}
        />

        {/* Main Canvas with the pl-5 breathing gutter */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950 pl-5">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
