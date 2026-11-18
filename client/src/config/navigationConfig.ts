import {
  LayoutDashboard,
  Kanban,
  Layers,
  Milestone,
  CheckSquare,
  Compass,
  Users,
  Building2,
  ShieldAlert,
  ShieldCheck,
  BadgeCheck,
  Code2,
  Eye,
  Workflow,
} from "lucide-react";
import type { NavItem } from "@/components/layout/Sidebar";
import { APP_ROUTE_NAMES } from "@/constants/appConstant";

export type SidebarNavigationConfigItem = {
  id: NavItem;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type SidebarNavigationConfig = {
  ADMIN: SidebarNavigationConfigItem[];
  OWNER: SidebarNavigationConfigItem[];
  EMPLOYEE: SidebarNavigationConfigItem[];
};

export const sidebarNavigationConfig: SidebarNavigationConfig = {
  ADMIN: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: `/${APP_ROUTE_NAMES.DASHBOARD}`,
      icon: LayoutDashboard,
    },
    {
      id: "organizations",
      label: "Organizations",
      path: `/${APP_ROUTE_NAMES.ORGANIZATIONS}`,
      icon: Building2,
    },
  ],
  OWNER: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: `/${APP_ROUTE_NAMES.DASHBOARD}`,
      icon: LayoutDashboard,
    },
    {
      id: "employees",
      label: "Employees",
      path: `/${APP_ROUTE_NAMES.EMPLOYEES}`,
      icon: Users,
    },
  ],
  EMPLOYEE: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: `/${APP_ROUTE_NAMES.DASHBOARD}`,
      icon: LayoutDashboard,
    },
    {
      id: "board",
      label: "Board",
      path: `/${APP_ROUTE_NAMES.BOARD}`,
      icon: Kanban,
    },
    {
      id: "projects",
      label: "Projects",
      path: `/${APP_ROUTE_NAMES.PROJECTS}`,
      icon: Layers,
    },
    {
      id: "sprints",
      label: "Sprints",
      path: `/${APP_ROUTE_NAMES.SPRINTS}`,
      icon: Milestone,
    },
    {
      id: "tasks",
      label: "Task Items",
      path: `/${APP_ROUTE_NAMES.TASKS}`,
      icon: CheckSquare,
    },
    {
      id: "planner",
      label: "Planner",
      path: `/${APP_ROUTE_NAMES.PLANNER}`,
      icon: Compass,
    },
  ],
};

export type BadgeRoleConfigItem = {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    className: string;
}

export type BadgeRoleConfig = {
    ADMIN: BadgeRoleConfigItem;
    OWNER: BadgeRoleConfigItem;
    EMPLOYEE: {
        PROJECT_SUPERVISOR: BadgeRoleConfigItem
        COORDINATOR: BadgeRoleConfigItem
        CONTRIBUTOR: BadgeRoleConfigItem
        READER: BadgeRoleConfigItem
    }
}

export const headerBadgeRoleConfig: BadgeRoleConfig = {
  ADMIN: {
    label: "System Super Admin",
    icon: ShieldAlert,
    className: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  },
  OWNER: {
    label: "Org Owner",
    icon: ShieldCheck,
    className: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  },
  EMPLOYEE: {
    PROJECT_SUPERVISOR: {
      label: "Project Supervisor",
      icon: BadgeCheck,
      className: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    },
    COORDINATOR: {
      label: "Co-ordinator",
      icon: Workflow,
      className: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    },
    CONTRIBUTOR: {
      label: "Contributor",
      icon: Code2,
      className: "bg-sky-500/10 border-sky-500/20 text-sky-400",
    },

    READER: {
      label: "Reader",
      icon: Eye,
      className: "bg-slate-500/10 border-slate-500/20 text-slate-400",
    },
  },
};
