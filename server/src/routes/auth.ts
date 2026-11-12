import { type Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { organizations, users } from "../db/schema";
import {
  RegisterOwnerSchema,
  LoginSchema,
  type AuthUser,
  type AuthResponse,
} from "@syncdesk/shared";
import {
  authenticateToken,
  type AuthenticatedRequest,
} from "../middleware/auth";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// Helper: Sign JWT Token
const generateToken = (user: AuthUser): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
};

// ==========================================
// 1. REGISTER OWNER & CREATE ORGANIZATION
// POST /api/auth/register-owner
// ==========================================
authRouter.post("/register-owner", async (req, res: Response) => {
  try {
    const parseResult = RegisterOwnerSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const { orgName, orgSlug, fullName, email, password } = parseResult.data;

    // Check if email already registered
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists" });
    }

    // Check if organization slug already taken
    const existingOrg = await db
      .select()
      .from(organizations)
      .where(eq(organizations.slug, orgSlug.toLowerCase()))
      .limit(1);

    if (existingOrg.length > 0) {
      return res
        .status(409)
        .json({ error: "This organization URL slug is already taken" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Database Transaction: Create Org + Create Owner User atomically
    const result = await db.transaction(async (tx) => {
      const [newOrg] = await tx
        .insert(organizations)
        .values({
          name: orgName,
          slug: orgSlug.toLowerCase(),
        })
        .returning();

      const [newUser] = await tx
        .insert(users)
        .values({
          orgId: newOrg.id,
          email: email.toLowerCase(),
          passwordHash,
          fullName,
          role: "OWNER",
          subRole: null,
          isActive: true,
        })
        .returning();

      return { newOrg, newUser };
    });

    const authUser: AuthUser = {
      id: result.newUser.id,
      email: result.newUser.email,
      fullName: result.newUser.fullName,
      role: result.newUser.role,
      subRole: result.newUser.subRole,
      orgId: result.newOrg.id,
      orgName: result.newOrg.name,
      orgSlug: result.newOrg.slug,
    };

    const token = generateToken(authUser);
    const response: AuthResponse = { token, user: authUser };

    return res.status(201).json(response);
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during registration" });
  }
});

// ==========================================
// 2. COMMON LOGIN
// POST /api/auth/login
// ==========================================
authRouter.post("/login", async (req, res: Response) => {
  try {
    const parseResult = LoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parseResult.data;

    // Query user and join organization details
    const foundUsers = await db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        fullName: users.fullName,
        role: users.role,
        subRole: users.subRole,
        isActive: users.isActive,
        orgId: users.orgId,
        orgName: organizations.name,
        orgSlug: organizations.slug,
      })
      .from(users)
      .leftJoin(organizations, eq(users.orgId, organizations.id))
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (foundUsers.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = foundUsers[0];

    if (!user.isActive) {
      return res
        .status(403)
        .json({
          error: "Your account has been deactivated. Contact your Owner.",
        });
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      subRole: user.subRole,
      orgId: user.orgId,
      orgName: user.orgName || undefined,
      orgSlug: user.orgSlug || undefined,
    };

    const token = generateToken(authUser);
    const response: AuthResponse = { token, user: authUser };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during login" });
  }
});

// ==========================================
// 3. GET CURRENT AUTHENTICATED USER CONTEXT
// GET /api/auth/me
// ==========================================
authRouter.get(
  "/me",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    return res.status(200).json({ user: req.user });
  },
);

export default authRouter;
