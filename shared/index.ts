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
