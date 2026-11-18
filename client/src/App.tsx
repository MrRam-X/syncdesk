import { type FC, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";
import { ColdStartBanner } from "@/components/feedback/ColdStartBanner";
import { queryClient } from "@/lib/queryClient";

// Route Guards
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Page Controllers
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import BoardPage from "@/pages/BoardPage";
import ProjectsPage from "@/pages/ProjectsPage";
import SprintsPage from "@/pages/SprintsPage";
import TasksPage from "@/pages/TasksPage";
import PlannerPage from "@/pages/PlannerPage";
import EmployeesPage from "@/pages/EmployeesPage";
import AdminOrganizationsPage from "@/pages/AdminOrganizationsPage";
import AdminOrganizationDetailsPage from "@/pages/AdminOrganizationDetailsPage";
import { APP_ROUTE_NAMES } from "./constants/appConstant";

const App: FC = () => {
  const [showColdStart, setShowColdStart] = useState(false);
  const {
    LOGIN,
    REGISTER_ORG,
    BOARD,
    DASHBOARD,
    EMPLOYEES,
    ORGANIZATIONS,
    ORG_DETAILS,
    PLANNER,
    PROJECTS,
    SPRINTS,
    TASKS,
  } = APP_ROUTE_NAMES;
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            {/* Public Authentication Routes */}
            <Route path={`/${LOGIN}`} element={<LoginPage />} />
            <Route path={`/${REGISTER_ORG}`} element={<RegisterPage />} />

            {/* Protected Workspace Routes (Must be logged in) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to={`/${DASHBOARD}`} replace />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${DASHBOARD}`}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${BOARD}`}
              element={
                <ProtectedRoute>
                  <BoardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${PROJECTS}`}
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${SPRINTS}`}
              element={
                <ProtectedRoute>
                  <SprintsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${TASKS}`}
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${PLANNER}`}
              element={
                <ProtectedRoute>
                  <PlannerPage />
                </ProtectedRoute>
              }
            />

            {/* Role-Guarded Portals */}
            <Route
              path={`/${EMPLOYEES}`}
              element={
                <ProtectedRoute allowedRoles={["OWNER"]}>
                  <EmployeesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`/${ORGANIZATIONS}`}
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminOrganizationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path={`${ORG_DETAILS}/:id`}
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminOrganizationDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to={`/${DASHBOARD}`} replace />} />
          </Routes>
        </ErrorBoundary>
        {/* Global Stacked Toaster */}
        <Toaster richColors position="bottom-right" theme="dark" />

        {/* Floating Cold Start Grace Banner
         **NOTE: Integration happens in Phase 3,4
         */}
        <ColdStartBanner
          isVisible={showColdStart}
          onClose={() => setShowColdStart(false)}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;