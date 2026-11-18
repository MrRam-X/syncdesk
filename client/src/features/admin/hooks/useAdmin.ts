import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { type CreateOrgInput } from "@syncdesk/shared";

// ==========================================
// 1. STRICT DOMAIN & API CONTRACT INTERFACES
// ==========================================

export interface AdminDashboardRecentOrgs {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface AdminDashboardData {
  totalOrganizations: number;
  totalUsers: number;
  totalProjects: number;
  recentOrgs: AdminDashboardRecentOrgs[];
}

export interface AdminOrgItem {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  ownerName: string;
  ownerEmail: string;
  usersCount: number;
  projectsCount: number;
  plan: string;
  status: string;
}

export interface OrgDetailsData extends AdminOrgItem {
  projects?: {
    id: string;
    name: string;
    key: string;
  }[];
  databaseUsageMb?: number;
}

// Backend Response Schemas
export interface CreateOrgResponse {
  message: string;
  organization: {
    id: string;
    name: string;
    slug: string;
    ownerName: string;
    ownerEmail: string;
    plan: string;
    status: string;
  };
  initialCredentials: {
    email: string;
    temporaryPassword: string;
  };
}

export interface DeleteOrgResponse {
  message: string;
  deletedId: string;
}

export interface ApiErrorResponse {
  error?: string;
  details?: Record<string, string[]>;
}

// ==========================================
// 2. QUERY KEYS (Type-Safe Cache Identifiers)
// ==========================================
export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  orgs: () => [...adminKeys.all, "orgs"] as const,
  orgDetails: (id: string | null) => [...adminKeys.all, "orgs", id] as const,
};

// ==========================================
// 3. DASHBOARD QUERY HOOK
// ==========================================
export const useAdminDashboard = () => {
  return useQuery<AdminDashboardData, AxiosError<ApiErrorResponse>>({
    queryKey: adminKeys.dashboard(),
    queryFn: async () => {
      const res = await api.get<AdminDashboardData>("/api/admin/dashboard");
      return res.data;
    },
  });
};

// ==========================================
// 4. ORGANIZATIONS DIRECTORY QUERY HOOK
// ==========================================
export const useOrganizations = () => {
  return useQuery<AdminOrgItem[], AxiosError<ApiErrorResponse>>({
    queryKey: adminKeys.orgs(),
    queryFn: async () => {
      const res = await api.get<{ organizations: AdminOrgItem[] }>(
        "/api/admin/orgs",
      );
      return res.data.organizations;
    },
  });
};

// ==========================================
// 5. ORG DETAILS QUERY HOOK (With Cache Seeding)
// ==========================================
export const useOrganizationDetails = (orgId: string | null) => {
  const queryClient = useQueryClient();

  return useQuery<OrgDetailsData | null, AxiosError<ApiErrorResponse>>({
    queryKey: adminKeys.orgDetails(orgId),
    queryFn: async () => {
      if (!orgId) return null;
      const res = await api.get<{ organization: OrgDetailsData }>(
        `/api/admin/orgs/${orgId}`,
      );
      return res.data.organization;
    },
    enabled: !!orgId,
    // Instant cache seed without waiting for network request
    initialData: () => {
      if (!orgId) return undefined;
      const cachedOrgs = queryClient.getQueryData<AdminOrgItem[]>(
        adminKeys.orgs(),
      );
      const matched = cachedOrgs?.find((org) => org.id === orgId);
      if (!matched) return undefined;

      return {
        ...matched,
        projects: [],
        databaseUsageMb: 48,
      };
    },
  });
};

// ==========================================
// 6. STRICTLY-TYPED MUTATIONS HOOK
// ==========================================
export const useAdminMutations = () => {
  const queryClient = useQueryClient();

  // Create Organization Mutation
  const createOrgMutation = useMutation<
    CreateOrgResponse,
    AxiosError<ApiErrorResponse>,
    CreateOrgInput
  >({
    mutationFn: async (payload: CreateOrgInput) => {
      const res = await api.post<CreateOrgResponse>("/api/admin/orgs", payload);
      return res.data;
    },
    onSuccess: (data: CreateOrgResponse) => {
      toast.success(data.message || "Organization provisioned successfully");
      queryClient.invalidateQueries({ queryKey: adminKeys.orgs() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      const errorMessage =
        err.response?.data?.error ?? "Failed to provision organization";
      toast.error(errorMessage);
    },
  });

  // Delete Organization Mutation
  const deleteOrgMutation = useMutation<
    DeleteOrgResponse,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: async (orgId: string) => {
      const res = await api.delete<DeleteOrgResponse>(
        `/api/admin/orgs/${orgId}`,
      );
      return res.data;
    },
    onSuccess: (data: DeleteOrgResponse) => {
      toast.success(data.message || "Organization deleted permanently");
      queryClient.invalidateQueries({ queryKey: adminKeys.orgs() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      const errorMessage =
        err.response?.data?.error ?? "Failed to delete organization";
      toast.error(errorMessage);
    },
  });

  return {
    createOrg: createOrgMutation.mutateAsync,
    isCreatingOrg: createOrgMutation.isPending,
    deleteOrg: deleteOrgMutation.mutateAsync,
    isDeletingOrg: deleteOrgMutation.isPending,
  };
};