### 1. UX & Resilience Approach (Summary)

* **Skeleton Loaders (No Generic Spinners):** Render layout-matched skeleton columns and cards on initial load to eliminate Cumulative Layout Shift (CLS).
* **Cold Start Grace Banner:** If the initial request takes $>2.5$ seconds, display a polite banner (*"Waking up free cloud instance, takes ~3s..."*) so recruiters know the app is working.
* **`isLoading` vs. `isFetching` Separation:** Skeletons only display on first load (`isLoading`). Background updates (`isFetching`) happen silently behind the scenes without flickering the UI.
* **Auto-Retries with Exponential Backoff:** Failed API queries automatically retry twice (1s, then 2s) to handle database wake-up delays cleanly.
* **Optimistic UI with Automatic Rollback:** Dragged cards instantly snap to their new position in the UI. If the backend fails, TanStack Query reverts the card to its original position and raises a toast notification.
* **React Error Boundaries:** Board views are wrapped in Error Boundaries to capture runtime errors and provide a clean fallback UI with a *"Try Again"* button instead of a blank white screen.
* **Socket.io "Shoulder Tap" Sync:** Mutations trigger a lightweight WebSocket ping to the room, which tells TanStack Query to refresh data in the background for all active viewers.

---

### 2. Complete Tech Stack & Libraries

#### Frontend (React)
| Library / Tool | Purpose |
| :--- | :--- |
| **Vite + React + TypeScript** | Core framework and build tool; provides fast development and end-to-end type safety. |
| **Tailwind CSS** | Utility-first styling for fast, clean, enterprise UI layouts. |
| **`shadcn/ui` (Radix Primitives)** | Accessible, headless UI components (modals, dropdown menus, avatar badges, tooltips). |
| **`@tanstack/react-query`** | Server state management, HTTP caching, request deduplication, optimistic updates, and background refetching. |
| **`zustand`** | Minimal client-side store for UI-only state (sidebar collapsed state, active filters, selected sprint). |
| **`@dnd-kit/core` & `@dnd-kit/sortable`** | High-performance, accessible drag-and-drop for Kanban board columns and task reordering. |
| **`sonner`** | Modern, stacked toast notifications for success confirmations and rollback/error alerts. |
| **`react-hook-form` + `zod`** | High-performance form handling with strict schema validation for creating and editing work items. |
| **`socket.io-client`** | Connects to the backend via WebSockets to listen for board change events. |
| **`lucide-react`** | Clean, lightweight icon set suited for developer tools and project management UIs. |

#### Backend (Node.js)
| Library / Tool | Purpose |
| :--- | :--- |
| **Node.js + Express (TypeScript)** | Core REST API server framework. |
| **`socket.io`** | Real-time WebSocket server handling project "Rooms" and broadcasting change pings. |
| **`http` (Node built-in)** | Combines the Express HTTP app and Socket.io server onto a single port. |
| **`drizzle-orm` (or `pg`)** | Lightweight, type-safe SQL query client with minimal memory overhead (ideal for free tiers). |
| **`zod`** | Validates incoming REST API payloads (`req.body`) to prevent malformed data from reaching the database. |
| **`cors` + `dotenv`** | Manages cross-origin security rules (allowing your frontend domain) and environment variables. |

#### Database
| Database | Purpose |
| :--- | :--- |
| **PostgreSQL** | Relational database holding projects, sprints, work items, and fractional order indexes. |

---

### 3. Deployment Strategy & Free-Tier Providers

```
[ Frontend: Vercel ]  ──────────>  [ Backend: Koyeb ]  ──────────>  [ DB: Neon ]
  • React + Vite                     • Express + Socket.io            • Serverless Postgres
  • Free global CDN                  • Native WebSocket support       • 0.5 GB Free tier
  • Auto HTTPS                       • ~2-4s cold start               • Never auto-deleted
```

| Component | Cloud Provider | Free-Tier Plan & Strategy |
| :--- | :--- | :--- |
| **Frontend** | **Vercel** | Free Hobby plan. Deploys directly from your GitHub repo. Fast worldwide CDN with automatic HTTPS. |
| **Backend** | **Koyeb** *(Recommended)* | Free web instance (512MB RAM). Supports persistent WebSockets natively, wakes up in **~2–4 seconds** (far faster than Render), and doesn't require a credit card. |
| **Backend (Alternative)** | **Render** *(Fallback)* | Free Web Service. If you choose Render, set up a free 12-minute keep-alive ping on `cron-job.org` targeting `/health` to eliminate the 50-second cold start. |
| **Database** | **Neon.tech** | Free Serverless Postgres. Provides 0.5 GiB storage, scales to zero when idle, wakes up in ~1 second, and **does not delete data after 30 days**. |