import { type FC, useState } from "react";
import { Plus } from "lucide-react";
import DashboardKPIs from "./components/DashboardKPIs";
import PriorityTasksList, {
  type PriorityTask,
} from "./components/PriorityTasksList";
import SprintHealthWidget from "./components/SprintHealthWidget";
import ActivityFeed from "./components/ActivityFeed";
import FirstTimeUserDashboard from "./components/FirstTimeUserDashboard";

interface DashboardProps {
  isFirstTimeUser?: boolean;
  onGoToBoard?: () => void;
  onBrowseProjects?: () => void;
}

const samplePriorityTasks: PriorityTask[] = [
  {
    id: "SYNC-110",
    project: "SYNC",
    title: "Implement customer.subscription.updated webhook handler",
    status: "In Progress",
    statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    priority: "High",
    priorityColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    points: 3,
  },
  {
    id: "SYNC-111",
    project: "SYNC",
    title: "Deploy webhook endpoint to staging sandbox for E2E validation",
    status: "Deployed",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    priority: "Medium",
    priorityColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    points: 1,
  },
  {
    id: "SYNC-102",
    project: "SYNC",
    title: "Fix card reordering race condition under simulated 3G latency",
    status: "In Progress",
    statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    priority: "Critical",
    priorityColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    points: 8,
  },
  {
    id: "MOB-42",
    project: "MOB",
    title: "Integrate biometric FaceID unlock flow on iOS app",
    status: "To Do",
    statusColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    priority: "High",
    priorityColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    points: 5,
  },
];

const Dashboard: FC<DashboardProps> = ({
  isFirstTimeUser = false,
  onGoToBoard = () => {},
  onBrowseProjects = () => {},
}) => {
  const [tasks] = useState<PriorityTask[]>(samplePriorityTasks);

  if (isFirstTimeUser) {
    return <FirstTimeUserDashboard onBrowseProjects={onBrowseProjects} />;
  }

  return (
    <div className="space-y-8 w-full">
      {/* Welcome Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Acme Corp</span>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Overview</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Good morning, Alex Rivera
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Here is a summary of active iterations, team velocity, and your
            assigned priorities today.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Quick work item")}
          className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Work Item</span>
        </button>
      </div>

      {/* 1. KPI Metric Cards */}
      <DashboardKPIs />

      {/* 2. Tasks List + Sprint Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <PriorityTasksList
            tasks={tasks}
            onTaskClick={(id) => alert(`Clicked task ${id}`)}
          />
        </div>

        <div>
          <SprintHealthWidget onGoToBoard={onGoToBoard} />
        </div>
      </div>

      {/* 3. Activity Feed */}
      <ActivityFeed />
    </div>
  );
};

export default Dashboard;
