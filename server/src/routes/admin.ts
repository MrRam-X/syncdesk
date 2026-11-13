import { type Response, Router } from "express";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { organizations, users, projects } from "../db/schema";
import {
  authenticateToken,
  requireRole,
  type AuthenticatedRequest,
} from "../middleware/auth";
import { CreateOrgSchema } from "@syncdesk/shared";

const adminRouter = Router();

// Require logged-in user with 'ADMIN' role
adminRouter.use(authenticateToken);
adminRouter.use(requireRole(["ADMIN"]));

// ==========================================
// 1. SUPER ADMIN DASHBOARD
// GET /api/admin/dashboard
// ==========================================
adminRouter.get(
  "/dashboard",
  async (_req: AuthenticatedRequest, res: Response) => {
    try {
      // Total Organizations count
      const [orgCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(organizations);

      // Total Worldwide Users
      const [userCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(users);

      // Total Projects across all orgs
      const [projectCount] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(projects);

      // Recent 4 Organizations
      const recentOrgs = await db
        .select({
          id: organizations.id,
          name: organizations.name,
          slug: organizations.slug,
          createdAt: organizations.createdAt,
        })
        .from(organizations)
        .orderBy(sql`${organizations.createdAt} desc`)
        .limit(4);

      return res.status(200).json({
        totalOrganizations: orgCount.count,
        totalUsers: userCount.count,
        totalProjects: projectCount.count,
        recentOrgs,
      });
    } catch (error) {
      console.error("Admin dashboard error:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch admin platform metrics" });
    }
  },
);

// ==========================================
// 2. LIST ALL ORGANIZATIONS (With User & Project Counts)
// GET /api/admin/orgs
// ==========================================
adminRouter.get("/orgs", async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const allOrgs = await db
      .select({
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
        createdAt: organizations.createdAt,
      })
      .from(organizations);

    // For each organization, fetch Owner info, user count, and project count
    const orgsWithDetails = await Promise.all(
      allOrgs.map(async (org) => {
        const [owner] = await db
          .select({
            fullName: users.fullName,
            email: users.email,
          })
          .from(users)
          .where(sql`${users.orgId} = ${org.id} AND ${users.role} = 'OWNER'`)
          .limit(1);

        const [uCount] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(users)
          .where(eq(users.orgId, org.id));

        const [pCount] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(projects)
          .where(eq(projects.orgId, org.id));

        return {
          ...org,
          ownerName: owner ? owner.fullName : "Unassigned",
          ownerEmail: owner ? owner.email : "N/A",
          usersCount: uCount.count,
          projectsCount: pCount.count,
          plan: "Enterprise Tier",
          status: "Active",
        };
      }),
    );

    return res.status(200).json({ organizations: orgsWithDetails });
  } catch (error) {
    console.error("Fetch organizations error:", error);
    return res.status(500).json({ error: "Failed to fetch organizations" });
  }
});

// ==========================================
// 3. PROVISION NEW TENANT & INITIAL OWNER
// POST /api/admin/orgs
// ==========================================
adminRouter.post("/orgs", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parseResult = CreateOrgSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const { name, slug, ownerName, ownerEmail, plan } = parseResult.data;

    // Check slug and email
    const existingSlug = await db
      .select()
      .from(organizations)
      .where(eq(organizations.slug, slug.toLowerCase()))
      .limit(1);

    if (existingSlug.length > 0) {
      return res
        .status(409)
        .json({ error: "Organization slug is already taken" });
    }

    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, ownerEmail.toLowerCase()))
      .limit(1);

    if (existingEmail.length > 0) {
      return res
        .status(409)
        .json({ error: "An account with this owner email already exists" });
    }

    // Default password for provisioned owner
    const initialPassword = "SyncdeskWelcome2026!";
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(initialPassword, salt);

    // Atomically create Org + Owner User
    const result = await db.transaction(async (tx) => {
      const [newOrg] = await tx
        .insert(organizations)
        .values({
          name,
          slug: slug.toLowerCase(),
        })
        .returning();

      const [newOwner] = await tx
        .insert(users)
        .values({
          orgId: newOrg.id,
          email: ownerEmail.toLowerCase(),
          passwordHash,
          fullName: ownerName,
          role: "OWNER",
          subRole: null,
          isActive: true,
        })
        .returning();

      return { newOrg, newOwner };
    });

    return res.status(201).json({
      message: "Organization provisioned successfully",
      organization: {
        id: result.newOrg.id,
        name: result.newOrg.name,
        slug: result.newOrg.slug,
        ownerName: result.newOwner.fullName,
        ownerEmail: result.newOwner.email,
        plan: plan || "Enterprise Tier",
        status: "Active",
      },
      initialCredentials: {
        email: result.newOwner.email,
        temporaryPassword: initialPassword,
      },
    });
  } catch (error) {
    console.error("Provision organization error:", error);
    return res.status(500).json({ error: "Failed to provision organization" });
  }
});

// ==========================================
// 4. CASCADE DELETE AN ORGANIZATION
// DELETE /api/admin/orgs/:id
// ==========================================
adminRouter.delete(
  "/orgs/:id",
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;

      // PostgreSQL ON DELETE CASCADE handles deleting related users, projects, sprints & tasks
      const [deleted] = await db
        .delete(organizations)
        .where(eq(organizations.id, id))
        .returning({ id: organizations.id, name: organizations.name });

      if (!deleted) {
        return res.status(404).json({ error: "Organization not found" });
      }

      return res.status(200).json({
        message: `Organization "${deleted.name}" and all related data deleted permanently`,
        deletedId: deleted.id,
      });
    } catch (error) {
      console.error("Delete organization error:", error);
      return res.status(500).json({ error: "Failed to delete organization" });
    }
  },
);

export default adminRouter;