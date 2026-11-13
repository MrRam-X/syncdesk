import { type Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '../db';
import { users, organizations, projects, projectMembers } from '../db/schema';
import { authenticateToken, requireRole, type AuthenticatedRequest } from '../middleware/auth';
import { AddEmployeeSchema } from '@syncdesk/shared';

const ownerRouter = Router();

// Require logged-in user with 'OWNER' role for all routes in this file
ownerRouter.use(authenticateToken);
ownerRouter.use(requireRole(['OWNER']));

// ==========================================
// 1. OWNER DASHBOARD METRICS
// GET /api/owner/dashboard
// ==========================================
ownerRouter.get('/dashboard', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;

    // 1. Total employees in this organization
    const employeeRows = await db
      .select({
        id: users.id,
        subRole: users.subRole,
        isActive: users.isActive,
      })
      .from(users)
      .where(and(eq(users.orgId, orgId), eq(users.role, 'EMPLOYEE')));

    const totalWorkforce = employeeRows.length;
    const supervisors = employeeRows.filter((e) => e.subRole === 'PROJECT_SUPERVISOR').length;
    const coordinators = employeeRows.filter((e) => e.subRole === 'COORDINATOR').length;
    const contributors = employeeRows.filter((e) => e.subRole === 'CONTRIBUTOR').length;
    const readers = employeeRows.filter((e) => e.subRole === 'READER').length;

    // 2. Total projects in this organization
    const projectRows = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.orgId, orgId));

    return res.status(200).json({
      totalWorkforce,
      subRoleBreakdown: {
        supervisors,
        coordinators,
        contributors,
        readers,
      },
      totalProjects: projectRows.length,
      orgName: req.user!.orgName,
      orgSlug: req.user!.orgSlug,
    });
  } catch (error) {
    console.error('Owner dashboard error:', error);
    return res.status(500).json({ error: 'Failed to fetch owner dashboard metrics' });
  }
});

// ==========================================
// 2. GET ALL EMPLOYEES FOR THIS ORGANIZATION
// GET /api/owner/employees
// ==========================================
ownerRouter.get('/employees', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;

    const employeeList = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        subRole: users.subRole,
        isActive: users.isActive,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(and(eq(users.orgId, orgId), eq(users.role, 'EMPLOYEE')));

    return res.status(200).json({ employees: employeeList });
  } catch (error) {
    console.error('Fetch employees error:', error);
    return res.status(500).json({ error: 'Failed to fetch employee directory' });
  }
});

// ==========================================
// 3. REGISTER NEW EMPLOYEE (Auto-Generated Email)
// POST /api/owner/employees
// ==========================================
ownerRouter.post('/employees', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;

    const parseResult = AddEmployeeSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const { firstName, lastName, subRole, initialPassword } = parseResult.data;

    // Fetch the organization's slug to compute the email domain
    const [org] = await db
      .select({ slug: organizations.slug })
      .from(organizations)
      .where(eq(organizations.id, orgId))
      .limit(1);

    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Auto-generate email: firstname.lastname@orgslug.com
    const cleanFirst = firstName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const cleanLast = lastName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const generatedEmail = `${cleanFirst}.${cleanLast}@${org.slug}.com`;

    // Check for duplicate email
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, generatedEmail))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({
        error: `An employee with email ${generatedEmail} already exists.`,
      });
    }

    // Hash initial password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(initialPassword, salt);

    const [newEmployee] = await db
      .insert(users)
      .values({
        orgId,
        email: generatedEmail,
        passwordHash,
        fullName: `${firstName} ${lastName}`,
        role: 'EMPLOYEE',
        subRole,
        isActive: true,
      })
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        subRole: users.subRole,
        isActive: users.isActive,
        createdAt: users.createdAt,
      });

    return res.status(201).json({
      message: 'Employee registered successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Add employee error:', error);
    return res.status(500).json({ error: 'Failed to register employee' });
  }
});

// ==========================================
// 4. GET EMPLOYEE DETAILS BY ID
// GET /api/owner/employees/:id
// ==========================================
ownerRouter.get('/employees/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;
    const { id } = req.params;

    const [emp] = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        subRole: users.subRole,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(and(eq(users.id, id), eq(users.orgId, orgId)))
      .limit(1);

    if (!emp) {
      return res.status(404).json({ error: 'Employee not found in your organization' });
    }

    // Query projects this employee is member of
    const assignedProjects = await db
      .select({
        projectId: projects.id,
        name: projects.name,
        key: projects.key,
      })
      .from(projectMembers)
      .innerJoin(projects, eq(projectMembers.projectId, projects.id))
      .where(eq(projectMembers.userId, id));

    return res.status(200).json({
      employee: emp,
      assignedProjects,
    });
  } catch (error) {
    console.error('Get employee details error:', error);
    return res.status(500).json({ error: 'Failed to fetch employee details' });
  }
});

// ==========================================
// 5. UPDATE EMPLOYEE SUB-ROLE
// PATCH /api/owner/employees/:id/role
// ==========================================
ownerRouter.patch('/employees/:id/role', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;
    const { id } = req.params;
    const { subRole } = req.body;

    const validRoles = ['PROJECT_SUPERVISOR', 'COORDINATOR', 'CONTRIBUTOR', 'READER'];
    if (!validRoles.includes(subRole)) {
      return res.status(400).json({ error: `Invalid sub-role. Must be one of: ${validRoles.join(', ')}` });
    }

    const [updated] = await db
      .update(users)
      .set({ subRole })
      .where(and(eq(users.id, id), eq(users.orgId, orgId)))
      .returning({
        id: users.id,
        fullName: users.fullName,
        subRole: users.subRole,
      });

    if (!updated) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Sub-role updated', employee: updated });
  } catch (error) {
    console.error('Update sub-role error:', error);
    return res.status(500).json({ error: 'Failed to update sub-role' });
  }
});

// ==========================================
// 6. TOGGLE EMPLOYEE ACTIVE STATUS
// PATCH /api/owner/employees/:id/status
// ==========================================
ownerRouter.patch('/employees/:id/status', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ error: 'isActive must be a boolean' });
    }

    const [updated] = await db
      .update(users)
      .set({ isActive })
      .where(and(eq(users.id, id), eq(users.orgId, orgId)))
      .returning({
        id: users.id,
        fullName: users.fullName,
        isActive: users.isActive,
      });

    if (!updated) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee status updated', employee: updated });
  } catch (error) {
    console.error('Update status error:', error);
    return res.status(500).json({ error: 'Failed to update employee status' });
  }
});

// ==========================================
// 7. DELETE AN EMPLOYEE
// DELETE /api/owner/employees/:id
// ==========================================
ownerRouter.delete('/employees/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orgId = req.user!.orgId!;
    const { id } = req.params;

    // 1. Verify employee exists within this organization and is not an Owner/Admin
    const [targetUser] = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        role: users.role,
      })
      .from(users)
      .where(and(eq(users.id, id), eq(users.orgId, orgId)))
      .limit(1);

    if (!targetUser) {
      return res.status(404).json({ error: 'Employee not found in your organization' });
    }

    if (targetUser.role === 'OWNER') {
      return res.status(400).json({ error: 'Owners cannot be deleted through the employee endpoint' });
    }

    // 2. Delete from PostgreSQL
    // (Cascade deletes project_members; work_items.assignee_id is set to NULL automatically)
    const [deleted] = await db
      .delete(users)
      .where(and(eq(users.id, id), eq(users.orgId, orgId)))
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
      });

    return res.status(200).json({
      message: `Employee "${deleted.fullName}" has been removed from the organization`,
      deletedId: deleted.id,
    });
  } catch (error) {
    console.error('Delete employee error:', error);
    return res.status(500).json({ error: 'Failed to delete employee' });
  }
});

export default ownerRouter;