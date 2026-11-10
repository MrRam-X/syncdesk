Here is a comprehensive, module-wise development roadmap designed specifically for your vertical-slice strategy (building frontend and backend features together, module by module). 

Per your instructions, **no code is written yet**. This plan prioritizes setting up cloud infrastructure early, mocking pure HTML/Tailwind layouts for easy React decomposition, and building feature slices end-to-end.

---

### Phase 0: Foundation Setup, Git & "Smoke Test" Deployment
*Goal: Have an empty frontend, backend, and database fully connected and running live on the internet before building any features.*

1. **Repository & Directory Structure:**
   * Set up a clean monorepo or two linked repositories (`client/` and `server/`).
   * Initialize TypeScript, ESLint, and Prettier on both sides.
2. **Database Provisioning:**
   * Create a free instance on **Neon.tech**.
   * Connect Express to Neon via Drizzle ORM and run an initial dummy migration to test connectivity.
3. **Skeleton Deployment (The "Smoke Test"):**
   * Deploy the starter Express server to **Koyeb** (or Render with keep-alive).
   * Deploy the starter React app to **Vercel** (or Netlify).
   * Verify that the live frontend can hit a live `/api/health` endpoint on your backend, and the backend successfully queries the live Neon database.
   * Lock in CORS configurations so production and local development run smoothly.

---

### Phase 1: Design System Primitives & HTML/Tailwind Layout Wireframing
*Goal: Finalize responsive, accessible screen layouts using pure HTML + Tailwind CSS to define exact React component boundaries.*

1. **Establish the Visual Foundation:**
   * Define the enterprise color palette (neutrals, accent colors for task types, priority badges).
   * Set up Tailwind typography, spacing, and dark/light system variables.
2. **Pure HTML + Tailwind Wireframing (Page by Page):**
   * **App Shell:** Collapsible sidebar, top bar with project switcher, user profile dropdown, notification trigger.
   * **Kanban Board:** Columns, task card layout (priority tags, story points, assignee avatar, item key like `SYNC-101`), drag placeholders.
   * **Backlog & Sprint View:** Accordion sprint containers, backlog item list rows, quick-add input fields.
   * **Modals & Drawers:** Task detail slide-over drawer (activity history, comments, metadata controls).
3. **Component Decomposition Blueprint:**
   * Review the raw HTML/Tailwind together and identify exact reusable React components (`<Badge />`, `<TaskCard />`, `<SprintContainer />`, `<SlideOver />`, `<EmptyState />`).

---

### Phase 2: Module 1 — Authentication, Organization Registration & RBAC
*Roles involved: Admin, Owner, Employee (Supervisor, Coordinator, Contributor, Reader)*

1. **Backend:**
   * Drizzle models: `organizations`, `users`.
   * Endpoints: Owner registration (creates Org + Owner in a single database transaction), generic Login endpoint, JWT token generation with role/sub-role claims.
   * Auth & RBAC Express middleware to protect routes based on permissions.
2. **Frontend:**
   * HTML/Tailwind design sign-off for `/login` and `/register`.
   * React forms using React Hook Form + Zod.
   * Auth store (Zustand) and automatic token attachment via Axios/Fetch interceptor.
   * Protected Route wrappers that restrict access based on roles.

---

### Phase 3: Module 2 — Admin & Owner Portals (Tenant & User Management)
*Goal: Provide interfaces for the pre-seeded Admin to view organizations and for Owners to invite and manage employees.*

1. **Backend:**
   * Admin endpoints: List/inspect all organizations and their user counts.
   * Owner endpoints: CRUD employees for their organization, assigning sub-roles (`Project Supervisor`, `Coordinator`, `Contributor`, `Reader`).
2. **Frontend:**
   * HTML/Tailwind design sign-off for `/admin/orgs` and `/employees`.
   * Convert to React: Data tables with sorting, employee invite modal, role assignment dropdown.
   * TanStack Query integration for caching user lists.

---

### Phase 4: Module 3 — Project Management & Workspace Context
*Goal: Allow Project Supervisors and Owners to create projects and assign team members.*

1. **Backend:**
   * Drizzle models: `projects`, `project_members`.
   * Endpoints: Project CRUD, project key generation (`MOB`, `PAY`), member assignment/unassignment.
2. **Frontend:**
   * HTML/Tailwind design sign-off for `/projects` and the Member Assignment modal.
   * React componentization: Project grid/list, Project Switcher dropdown in the global header, Member multi-select.
   * Zustand store to track the currently active project across the entire application.

---

### Phase 5: Module 4 — Sprints & Backlog Management
*Goal: Manage the planning phase—creating sprints and populating the product backlog.*

1. **Backend:**
   * Drizzle models: `sprints`, `work_items`.
   * Endpoints: Sprint CRUD (Planned, Active, Completed), Work Item CRUD (creating an item with `sprint_id = NULL` puts it in the Backlog; assigning a `sprint_id` moves it to that sprint).
2. **Frontend:**
   * HTML/Tailwind design sign-off for the Backlog/Sprint page.
   * React componentization: Sprint container accordions, backlog item list, inline task creation.
   * Assigning items from Backlog to Sprints via dropdowns and initial drag interactions.

---

### Phase 6: Module 5 — The Task Board (Kanban, Drag & Drop, Optimistic UI)
*Goal: Build the flagship feature—the interactive board with instant client updates and failure rollback.*

1. **Backend:**
   * Endpoint: `PATCH /api/work-items/:id` accepting `status` and `orderIndex`.
   * LexoRank/floating-point reordering calculation in the database.
2. **Frontend:**
   * HTML/Tailwind layout refinement for the 4-column board (*New*, *Active*, *Resolved*, *Closed*).
   * Integrate `@dnd-kit`: Column containers, draggable cards, collision detection algorithms.
   * TanStack Query `useMutation` with **Optimistic Updates**: card drops immediately, previous snapshot saved, rollback on network failure.
   * Toast notification system via `sonner` for error alerts and status confirmations.
   * Slide-over task detail drawer for editing descriptions, story points, and assignees.

---

### Phase 7: Module 6 — Real-Time Engine (Socket.io Integration)
*Goal: Enable instantaneous multi-client board synchronization.*

1. **Backend:**
   * Wrap Express with Node `http.createServer`.
   * Socket.io room logic: clients join `project:{id}` rooms upon navigation.
   * Emit `BOARD_UPDATED` broadcast on successful task/sprint mutations.
2. **Frontend:**
   * Implement the `useBoardSocket(projectId)` hook.
   * Trigger `queryClient.invalidateQueries` when a socket ping is received.
   * Verification test: Open two different browsers side-by-side, move a card in one, and watch the second browser update smoothly in real time.

---

### Phase 8: Hardening, Free-Tier UX Optimization & Portfolio Polish
*Goal: Ensure the project runs reliably for recruiters and showcases high engineering standards.*

1. **UX Hardening for Cloud Free Tiers:**
   * Skeletons: Board column and task card skeleton loaders.
   * Cold Start Grace Banner: Detects if initial fetch exceeds 2.5s and displays a wake-up status note.
   * React Error Boundaries wrapping main views with a "Try Again" fallback.
2. **Database Seeding Script:**
   * A single command (`npm run seed`) that generates a fully populated demo organization with realistic projects, active sprints, sample bugs, and user stories.
3. **Portfolio Presentation:**
   * Write an enterprise-grade `README.md` containing an architecture diagram, tech stack breakdown, GIFs of real-time multi-window sync, and live demo links with pre-filled test credentials for recruiters.

---

### Review & Sign-Off

Review this structure. Once you are satisfied with the milestones, we can proceed to **Phase 0** and walk through the initial project setup, repository scaffolding, and cloud smoke-test step-by-step.