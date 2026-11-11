import { type FC, useState } from "react";
import { Plus } from "lucide-react";
import TasksMetricsBar from "./components/TasksMetricsBar";
import TasksFilterBar, {
  type WorkItemTypeFilter,
} from "./components/TasksFilterBar";
import TasksTable, { type TaskItemRow } from "./components/TasksTable";

interface TasksProps {
  onOpenNewTaskModal?: () => void;
  onSelectTask?: (task: TaskItemRow) => void;
}

const sampleWorkItems: TaskItemRow[] = [
  {
    id: "SYNC-101",
    type: "Story",
    title: "Integrate Stripe webhook verification for subscription renewals",
    project: "Payments Engine",
    projectKey: "SYNC",
    sprint: "Sprint 24.1",
    status: "In Progress",
    priority: "High",
    points: 8,
    assignee: { name: "Sarah Chen", initials: "SC", bg: "bg-emerald-600" },
  },
  {
    id: "SYNC-102",
    type: "Bug",
    title: "Fix card reordering race condition under simulated 3G latency",
    project: "Payments Engine",
    projectKey: "SYNC",
    sprint: "Sprint 24.1",
    status: "In Progress",
    priority: "Critical",
    points: 8,
    assignee: { name: "Alex Rivera", initials: "AR", bg: "bg-blue-600" },
  },
  {
    id: "MOB-42",
    type: "Task",
    title: "Integrate biometric FaceID unlock flow on iOS native app",
    project: "Mobile Banking App",
    projectKey: "MOB",
    sprint: "Sprint 12.0",
    status: "To Do",
    priority: "High",
    points: 5,
    assignee: { name: "Alex Rivera", initials: "AR", bg: "bg-blue-600" },
  },
  {
    id: "SYNC-108",
    type: "Task",
    title: "Create webhook secret validation middleware in Express",
    project: "Payments Engine",
    projectKey: "SYNC",
    sprint: "Sprint 24.1",
    status: "To Do",
    priority: "Medium",
    points: 2,
    assignee: { name: "John Doe", initials: "JD", bg: "bg-purple-600" },
  },
  {
    id: "SYNC-111",
    type: "Task",
    title: "Deploy webhook endpoint to staging sandbox for E2E validation",
    project: "Payments Engine",
    projectKey: "SYNC",
    sprint: "Sprint 24.1",
    status: "Deployed",
    priority: "Medium",
    points: 1,
    assignee: { name: "Alex Rivera", initials: "AR", bg: "bg-blue-600" },
  },
  {
    id: "SYNC-113",
    type: "Bug",
    title: "Simulate Stripe signature failure tests and retry logic",
    project: "Payments Engine",
    projectKey: "SYNC",
    sprint: "Sprint 24.1",
    status: "Testing",
    priority: "High",
    points: 2,
    assignee: { name: "Sarah Chen", initials: "SC", bg: "bg-emerald-600" },
  },
  {
    id: "AUTH-12",
    type: "Story",
    title: "Google and GitHub OAuth2 social login provider setup",
    project: "Authentication & SSO",
    projectKey: "AUTH",
    sprint: "Sprint 1.0",
    status: "To Do",
    priority: "High",
    points: 13,
    assignee: { name: "Elena Rostova", initials: "ER", bg: "bg-slate-700" },
  },
  {
    id: "SYNC-75",
    type: "Task",
    title: "Create PostgreSQL database schema for multi-tenant users",
    project: "Payments Engine",
    projectKey: "SYNC",
    sprint: "Sprint 23.4",
    status: "Done",
    priority: "High",
    points: 8,
    assignee: { name: "Alex Rivera", initials: "AR", bg: "bg-blue-600" },
  },
  {
    id: "DATA-04",
    type: "Story",
    title: "PostgreSQL change data capture pipeline streaming with Debezium",
    project: "Data Platform",
    projectKey: "DATA",
    sprint: "Backlog (Unassigned)",
    status: "To Do",
    priority: "Low",
    points: 5,
    assignee: null,
  },
];

const Tasks: FC<TasksProps> = ({
  onOpenNewTaskModal = () => {},
  onSelectTask = () => {},
}) => {
  const [items] = useState<TaskItemRow[]>(sampleWorkItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<WorkItemTypeFilter>("All");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Filtering Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || item.type === selectedType;
    const matchesProject =
      selectedProject === "All Projects" || item.project === selectedProject;
    const matchesStatus =
      selectedStatus === "All Statuses" || item.status === selectedStatus;

    return matchesSearch && matchesType && matchesProject && matchesStatus;
  });

  return (
    <div className="space-y-6 w-full">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Acme Corp</span>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Directory</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Task Items
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore, filter, and audit all stories, tasks, and bugs across every
            project repository.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewTaskModal}
          className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Work Item</span>
        </button>
      </div>

      {/* 1. Metrics Bar */}
      <TasksMetricsBar
        totalCount={items.length}
        storiesCount={items.filter((i) => i.type === "Story").length}
        tasksCount={items.filter((i) => i.type === "Task").length}
        bugsCount={items.filter((i) => i.type === "Bug").length}
      />

      {/* 2. Filter Bar */}
      <TasksFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      {/* 3. Universal Data Table */}
      <TasksTable items={filteredItems} onItemClick={onSelectTask} />
    </div>
  );
};

export default Tasks;
