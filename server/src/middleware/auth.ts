import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  type UserRoleType,
  type EmployeeSubRoleType,
  type AuthUser,
} from "@syncdesk/shared";

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// 1. Verify Bearer Token Middleware
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
    return next();
  } catch {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// 2. Require Main Role Guard (e.g. ['ADMIN', 'OWNER'])
export const requireRole = (allowedRoles: UserRoleType[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Forbidden: requires one of the following roles: ${allowedRoles.join(", ")}`,
      });
    }

    return next();
  };
};

// 3. Require Sub-Role Guard (For employees: Supervisor, Coordinator, etc.)
export const requireSubRole = (allowedSubRoles: EmployeeSubRoleType[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Owner and Admin bypass sub-role limitations
    if (req.user.role === "OWNER" || req.user.role === "ADMIN") {
      return next();
    }

    if (!req.user.subRole || !allowedSubRoles.includes(req.user.subRole)) {
      return res.status(403).json({
        error: `Forbidden: requires one of the following sub-roles: ${allowedSubRoles.join(", ")}`,
      });
    }

    return next();
  };
};
