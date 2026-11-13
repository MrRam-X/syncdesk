import { z } from "zod";

// Health Check Interface
export interface HealthResponse {
  status: "ok" | "error";
  timestamp: string;
  database: string;
}

// ==========================================
// AUTHENTICATION SCHEMAS & TYPES
// ==========================================

export const UserRole = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  EMPLOYEE: "EMPLOYEE",
} as const;

export const EmployeeSubRole = {
  PROJECT_SUPERVISOR: "PROJECT_SUPERVISOR",
  COORDINATOR: "COORDINATOR",
  CONTRIBUTOR: "CONTRIBUTOR",
  READER: "READER",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
export type EmployeeSubRoleType =
  (typeof EmployeeSubRole)[keyof typeof EmployeeSubRole];

// Owner + Organization Registration Schema
export const RegisterOwnerSchema = z.object({
  orgName: z.string().min(2, "Organization name must be at least 2 characters"),
  orgSlug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterOwnerInput = z.infer<typeof RegisterOwnerSchema>;

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// Authenticated User Context in Responses / JWT
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRoleType;
  subRole: EmployeeSubRoleType | null;
  orgId: string | null;
  orgName?: string;
  orgSlug?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// =============================
// Owner and Super Admin Action
// =============================

// Add Employee Schema (Owner Action)
export const AddEmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  subRole: z.enum([
    EmployeeSubRole.PROJECT_SUPERVISOR,
    EmployeeSubRole.COORDINATOR,
    EmployeeSubRole.CONTRIBUTOR,
    EmployeeSubRole.READER,
  ]),
  initialPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AddEmployeeInput = z.infer<typeof AddEmployeeSchema>;

// Provision Organization Schema (Super Admin Action)
export const CreateOrgSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  ownerEmail: z.string().email('Invalid owner email address'),
  plan: z.string().default('Enterprise Tier'),
});

export type CreateOrgInput = z.infer<typeof CreateOrgSchema>;