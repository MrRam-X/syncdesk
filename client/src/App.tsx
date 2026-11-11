import { type FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

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
        {/* Core Workspace Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/sprints" element={<SprintsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/planner" element={<PlannerPage />} />

        {/* Portals */}
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/admin/orgs" element={<AdminOrgsPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Global Stacked Toaster */}
      <Toaster richColors position="bottom-right" theme="dark" />
    </BrowserRouter>
  );
};

export default App;