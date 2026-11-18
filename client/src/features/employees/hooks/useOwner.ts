import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { type AddEmployeeInput } from '@syncdesk/shared';

export interface EmployeeData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  subRole: 'PROJECT_SUPERVISOR' | 'COORDINATOR' | 'CONTRIBUTOR' | 'READER';
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
}

export interface OwnerDashboardData {
  totalWorkforce: number;
  subRoleBreakdown: {
    supervisors: number;
    coordinators: number;
    contributors: number;
    readers: number;
  };
  totalProjects: number;
  orgName?: string;
  orgSlug?: string;
}

export const useOwnerDashboard = () => {
  return useQuery({
    queryKey: ['owner', 'dashboard'],
    queryFn: async () => {
      const res = await api.get<OwnerDashboardData>('/api/owner/dashboard');
      return res.data;
    },
  });
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ['owner', 'employees'],
    queryFn: async () => {
      const res = await api.get<{ employees: EmployeeData[] }>('/api/owner/employees');
      return res.data.employees;
    },
  });
};

export const useEmployeeDetails = (employeeId: string | null) => {
  return useQuery({
    queryKey: ['owner', 'employee', employeeId],
    queryFn: async () => {
      if (!employeeId) return null;
      const res = await api.get<{
        employee: EmployeeData;
        assignedProjects: { projectId: string; name: string; key: string }[];
      }>(`/api/owner/employees/${employeeId}`);
      return res.data;
    },
    enabled: !!employeeId,
  });
};

export const useOwnerMutations = () => {
  const queryClient = useQueryClient();

  const addEmployeeMutation = useMutation({
    mutationFn: async (data: AddEmployeeInput) => {
      const res = await api.post('/api/owner/employees', data);
      return res.data;
    },
    onSuccess: (data: any) => {
      toast.success(data.message || 'Employee registered successfully');
      queryClient.invalidateQueries({ queryKey: ['owner', 'employees'] });
      queryClient.invalidateQueries({ queryKey: ['owner', 'dashboard'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to add employee');
    },
  });

  const updateSubRoleMutation = useMutation({
    mutationFn: async ({ id, subRole }: { id: string; subRole: string }) => {
      const res = await api.patch(`/api/owner/employees/${id}/role`, { subRole });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Sub-role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['owner', 'employees'] });
      queryClient.invalidateQueries({ queryKey: ['owner', 'dashboard'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to update sub-role');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await api.patch(`/api/owner/employees/${id}/status`, { isActive });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Employee status updated');
      queryClient.invalidateQueries({ queryKey: ['owner', 'employees'] });
      queryClient.invalidateQueries({ queryKey: ['owner', 'dashboard'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to update status');
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/owner/employees/${id}`);
      return res.data;
    },
    onSuccess: (data: any) => {
      toast.success(data.message || 'Employee deleted');
      queryClient.invalidateQueries({ queryKey: ['owner', 'employees'] });
      queryClient.invalidateQueries({ queryKey: ['owner', 'dashboard'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to delete employee');
    },
  });

  return {
    addEmployee: addEmployeeMutation.mutateAsync,
    isAddingEmployee: addEmployeeMutation.isPending,
    updateSubRole: updateSubRoleMutation.mutateAsync,
    toggleStatus: toggleStatusMutation.mutateAsync,
    deleteEmployee: deleteEmployeeMutation.mutateAsync,
  };
};