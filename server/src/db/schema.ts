import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";

// ENUMS
export const userRoleEnum = pgEnum("user_role", ["ADMIN", "OWNER", "EMPLOYEE"]);
export const employeeSubRoleEnum = pgEnum("employee_sub_role", [
  "PROJECT_SUPERVISOR",
  "COORDINATOR",
  "CONTRIBUTOR",
  "READER",
]);
export const sprintStatusEnum = pgEnum("sprint_status", [
  "PLANNED",
  "ACTIVE",
  "COMPLETED",
]);
export const workItemTypeEnum = pgEnum("work_item_type", [
  "EPIC",
  "USER_STORY",
  "TASK",
  "BUG",
]);
export const workItemStatusEnum = pgEnum("work_item_status", [
  "NEW",
  "TO_DO",
  "IN_PROGRESS",
  "DEPLOYED",
  "TESTING",
  "DONE",
]);
export const workItemPriorityEnum = pgEnum("work_item_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

// 1. ORGANIZATIONS
export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. USERS
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").references(() => organizations.id, {
    onDelete: "cascade",
  }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").notNull(),
  subRole: employeeSubRoleEnum("sub_role"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. PROJECTS
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  key: varchar("key", { length: 10 }).notNull(),
  description: text("description"),
  createdBy: uuid("created_by")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. PROJECT MEMBERS
export const projectMembers = pgTable(
  "project_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (t) => ({
    unq: unique().on(t.projectId, t.userId),
  }),
);

// 5. SPRINTS
export const sprints = pgTable("sprints", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  goal: text("goal"),
  status: sprintStatusEnum("status").default("PLANNED").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. WORK ITEMS
export const workItems = pgTable("work_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  sprintId: uuid("sprint_id").references(() => sprints.id, {
    onDelete: "set null",
  }),
  parentId: uuid("parent_id"),
  itemNumber: integer("item_number").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: workItemTypeEnum("type").default("TASK").notNull(),
  status: workItemStatusEnum("status").default("NEW").notNull(),
  priority: workItemPriorityEnum("priority").default("MEDIUM").notNull(),
  storyPoints: integer("story_points"),
  orderIndex: doublePrecision("order_index").notNull(),
  assigneeId: uuid("assignee_id").references(() => users.id, {
    onDelete: "set null",
  }),
  reporterId: uuid("reporter_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
