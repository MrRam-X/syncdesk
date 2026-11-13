import { create } from "zustand";
import {
  type AuthUser,
  type UserRoleType,
  type EmployeeSubRoleType,
} from "@syncdesk/shared";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  isOwner: () => boolean;
  isAdmin: () => boolean;
  hasRole: (roles: UserRoleType[]) => boolean;
  hasSubRole: (subRoles: EmployeeSubRoleType[]) => boolean;
}

const getStoredToken = () => localStorage.getItem("syncdesk_token");
const getStoredUser = (): AuthUser | null => {
  const stored = localStorage.getItem("syncdesk_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),

  setAuth: (user: AuthUser, token: string) => {
    localStorage.setItem("syncdesk_token", token);
    localStorage.setItem("syncdesk_user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("syncdesk_token");
    localStorage.removeItem("syncdesk_user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  isOwner: () => get().user?.role === "OWNER",
  isAdmin: () => get().user?.role === "ADMIN",

  hasRole: (roles: UserRoleType[]) => {
    const user = get().user;
    if (!user) return false;
    return roles.includes(user.role);
  },

  hasSubRole: (subRoles: EmployeeSubRoleType[]) => {
    const user = get().user;
    if (!user) return false;
    // Admin and Owner bypass sub-role limitations
    if (user.role === "OWNER" || user.role === "ADMIN") return true;
    return !!user.subRole && subRoles.includes(user.subRole);
  },
}));