import { type FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Route Guards
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Page Controllers
import DashboardPage from '@/pages/DashboardPage';
import BoardPage from '@/pages/BoardPage';
import ProjectsPage from '@/pages/ProjectsPage';
import SprintsPage from '@/pages/SprintsPage';
import TasksPage from '@/pages/TasksPage';
import PlannerPage from '@/pages/PlannerPage';
import EmployeesPage from '@/pages/EmployeesPage';
import AdminOrgsPage from '@/pages/AdminOrgsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Workspace Routes (Must be logged in) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sprints"
          element={
            <ProtectedRoute>
              <SprintsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <PlannerPage />
            </ProtectedRoute>
          }
        />

        {/* Role-Guarded Portals */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={['OWNER']}>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orgs"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminOrgsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Global Stacked Toaster */}
      <Toaster richColors position="bottom-right" theme="dark" />
    </BrowserRouter>
  );
};

export default App;