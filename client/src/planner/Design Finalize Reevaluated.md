Here is the updated, comprehensive roadmap for **Phase 1: Design System & UI Wireframing**, broken down into sequential steps with their current statuses.

---

### Phase 1: Complete Roadmap & Status

#### Part A: Core Workspace & Board Layouts _(Completed)_

- **Step 1.1: Global App Shell & Kanban Taskboard** — _(✅ Completed)_
  - Zoom-proof grid layout, Azure DevOps story swimlanes, collapsible stories, top-left story chevron, dotted "+ New Task" button in _To Do_.
  - Slide-over Filter Drawer with search, assignee dropdown, multi-select types, and priority chips.
- **Step 1.2: Sprint Controls & Custom Dropdown** — _(✅ Completed)_
  - Custom scrollable sprint selector with dynamic status badges (_Active_, _Completed_, _Upcoming_, _Inactive_).
  - Create/Edit Sprint Modal connected to the header Pencil icon and dropdown button.
- **Step 1.3: Backlog Tab View** — _(✅ Completed)_
  - 4-column table (**ID**, **Title**, **Status**, **Assigned To**) reflecting the selected sprint.
  - "+ New Story" button connected to the dedicated Create Story Modal form.
- **Step 1.4: Story Detail & Child Tasks Modal** — _(✅ Completed)_
  - Click-to-inspect modal displaying acceptance criteria, points, priority, sprint, and child tasks list.
- **Step 1.5: Collapsible Sidebar Mechanics** — _(✅ Completed)_
  - Fluid width transition with text sliding/fading to prevent text popping.
  - Sleek vertical rectangular handle fused to the border.
- **Step 1.6: Team Members Tab View** — _(✅ Completed)_
  - Added as the 3rd header tab (_Task Board_, _Backlog_, _Team Members_), displaying project members and their assigned sub-roles.

---

#### Part B: Header Micro-Interactions & Popups _(✅ Completed)_

- **Step 1.7: Header Dropdowns & Popups Suite** — _(✅ Completed)_
  1. **Custom Project Selection Dropdown:** Replaces the static project button in the top left with a scrollable custom menu (styled like the sprint dropdown, without the "create" button).
  2. **Notifications Popover:** Click the Bell icon to open a sleek popover displaying recent alerts (task assignment, status update, mention, sprint started) with "Mark all as read".
  3. **User Profile Popover:** Click the top-right avatar (`AR`) to open a profile menu showing User Name, Email, Organization, Active Sub-role badge (`Project Supervisor`), Settings link, Theme toggle placeholder, and Logout button.

---

#### Part C: Full-Page Workspace Views (Sidebar Navigation Views)

- **Step 1.8: All Projects Screen (`Projects` in sidebar)** — _(✅ Completed)_
  - Grid of project cards (Title, Key like `SYNC`, Description, Active sprint summary).
  - **Stacked Member Avatars:** If $>4$ members, display the first 3 overlapping avatars followed by a `+N` indicator badge.
  - "+ New Project" action button.
  - Project Details Screen "About this project" Section: Top card with project overview and an Edit button (Pencil icon).
  - Left Column (Project Stats): Dedicated cards for Backlogs Items (in planning), Active Work Items (tasks/stories/bugs in progress), and Sprints Iterations (active & planned).
  - Right Column (Project Members): Complete member roster showing circular initials avatars, member names, emails, and exact sub-role badges (Project Supervisor, Coordinator, Contributor, Reader), plus an "+ Invite Member" button.
- **Step 1.9: Dashboard Screen (`Dashboard` in sidebar)** — _(✅ Completed)_
  - High-level executive overview:
    - Quick KPI stat cards: _My Assigned Tasks_, _Active Sprint Velocity_, _Open Critical Bugs_, _Total Points Committed_.
    - Recent Workspace Activity timeline.
    - Quick sprint progress bar.
- **Step 1.10: Global Sprints Screen (`Sprints` in sidebar)** — _(✅ Completed)_
  - Comprehensive list of all sprints across the entire organization.
  - Control bar with a **Project filter dropdown** to view sprints for all projects or isolate a specific one.
  - Table/card view showing Sprint name, Project badge, Date range, Status (_Active_, _Planned_, _Completed_), and completed vs. total story points.
- **Step 1.11: Task Items Screen (`Task Items` in sidebar)** — _(✅ Completed)_
  - Universal work items explorer table across all projects and sprints.
  - Multi-column table with quick filters for Type (_Story_, _Task_, _Bug_), Status, Assignee, and Priority.
- **Step 1.12: Personal Planner & Notebook Screen (`Planner` in sidebar)** — _(✅ Completed)_
  - Dedicated developer scratchpad / personal notebook.
  - Left sidebar for saved notes/checklists; right canvas featuring a rich markdown-style text editor for sprint notes, daily standup prep, and task checklists.

---

#### Part D: Enterprise Tenant Portals & Auth

- **Step 1.13: Owner & Admin Management Portals** — _(📋 Upcoming)_
  - **Owner Portal (`/employees`):** Employee roster table with sub-role badges (_Project Supervisor_, _Coordinator_, _Contributor_, _Reader_), actions menu, and "+ Invite Employee" modal.
  - **Admin Portal (`/admin/orgs`):** Super-admin view listing all company tenants, Owners, and user counts.
- **Step 1.14: Authentication Screens** — _(✅ Completed)_
  - Minimalist, enterprise-grade Login view.
  - Organization Owner Registration view (creating Org + Owner credentials).

---

#### Part E: Tooling & Component Decomposition

- **Step 1.15: Phase 1 Wrap-up & `shadcn/ui` Setup** — _(📋 End of Phase 1)_
  - Configure TypeScript path aliases (`@/*`).
  - Initialize `shadcn/ui` design tokens in CSS.
  - Break down the approved HTML blueprints into modular React component files (`<Navbar />`, `<Sidebar />`, `<TaskCard />`, `<Modal />`, etc.) ready for Phase 2 data and API integration.

---

### Review & Selection

This covers all the new UI requirements.

Shall we start with **Step 1.7 (The Header Popups Suite: Custom Project Dropdown, Notifications Popover, and Profile Popover)**?

## MY OBSERVATION FOR DESIGNS

1. Search Results view
2.
