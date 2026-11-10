## Database Models

## Model 1: organizations
# Represents the company/tenant.

id: UUID (Primary Key)
name: VARCHAR(255) (e.g., "Acme Corp")
slug: VARCHAR(100) (Unique, e.g., "acme-corp")
created_at: TIMESTAMP

## Model 2: users
# Covers all system actors: System Admins, Org Owners, and Employees.

id: UUID (Primary Key)
org_id: UUID (Foreign Key →→ organizations.id, NULL for System Admin)
email: VARCHAR(255) (Unique)
password_hash: TEXT
full_name: VARCHAR(255)
avatar_url: TEXT (Nullable)
role: ENUM ('ADMIN', 'OWNER', 'EMPLOYEE')
sub_role: ENUM ('MANAGER', 'TEAM_LEAD', 'DEVELOPER', 'TESTER') — (Nullable for Admin and Owner)
is_active: BOOLEAN (Default: true, allows soft-disabling employees)
created_at: TIMESTAMP

## Model 3: projects
# Workspaces created inside an organization.

id: UUID (Primary Key)
org_id: UUID (Foreign Key →→ organizations.id)
name: VARCHAR(255) (e.g., "Mobile Banking App")
key: VARCHAR(10) (e.g., "MOB", "PAY" — used to prefix task codes like PAY-101)
description: TEXT (Nullable)
created_by: UUID (Foreign Key →→ users.id)
created_at: TIMESTAMP

## Model 4: project_members (Junction Table)
# Determines which employees have access to which projects.

id: UUID (Primary Key)
project_id: UUID (Foreign Key →→ projects.id ON DELETE CASCADE)
user_id: UUID (Foreign Key →→ users.id ON DELETE CASCADE)
joined_at: TIMESTAMP
Constraint: Unique on (project_id, user_id)

## Model 5: sprints (Iterations)
# Timeboxed sprint cycles tied to a project.

id: UUID (Primary Key)
project_id: UUID (Foreign Key →→ projects.id ON DELETE CASCADE)
name: VARCHAR(100) (e.g., "Sprint 1", "Sprint 24.2")
start_date: DATE
end_date: DATE
goal: TEXT (Nullable)
status: ENUM ('PLANNED', 'ACTIVE', 'COMPLETED')
created_at: TIMESTAMP

## Model 6: work_items (Tasks & Backlog Items)
# Unified table for Epics, Stories, Tasks, and Bugs.

id: UUID (Primary Key)
project_id: UUID (Foreign Key →→ projects.id ON DELETE CASCADE)
sprint_id: UUID (Foreign Key →→ sprints.id, NULL = Item is in Backlog)
parent_id: UUID (Foreign Key →→ work_items.id, Nullable, allows nesting Tasks under Stories)
item_number: INTEGER (Auto-incrementing counter per project, e.g., 101 →→ displayed as PAY-101)
title: VARCHAR(255)
description: TEXT (Markdown format)
type: ENUM ('EPIC', 'USER_STORY', 'TASK', 'BUG')
status: ENUM ('NEW', 'ACTIVE', 'RESOLVED', 'CLOSED')
priority: ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
story_points: INTEGER (Nullable)
order_index: FLOAT (For reordering items within a board column)
assignee_id: UUID (Foreign Key →→ users.id, Nullable)
reporter_id: UUID (Foreign Key →→ users.id)
created_at, updated_at: TIMESTAMP
