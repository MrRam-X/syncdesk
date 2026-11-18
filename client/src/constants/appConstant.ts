export const BASE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_URL = {
  LOGIN: `${BASE_API_URL}/api/auth/login`,
  REGISTER_OWNER: `${BASE_API_URL}/api/auth/register-owner`,
};

export const APP_ROUTE_NAMES = {
  LOGIN: 'login',
  REGISTER_ORG: 'register-org',
  DASHBOARD: "dashboard",
  BOARD: "board",
  PROJECTS: "projects",
  SPRINTS: "sprints",
  TASKS: "tasks",
  PLANNER: "planner",
  ORGANIZATIONS: "organizations",
  ORG_DETAILS: "org-details",
  EMPLOYEES: "employees",
};
