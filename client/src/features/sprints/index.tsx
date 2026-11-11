import { type FC, useState } from "react";
import SprintStatsBar from "./components/SprintStatsBar";
import SprintFilterBar, {
  type SprintStatusFilter,
} from "./components/SprintFilterBar";
import SprintCardRow, { type SprintItem } from "./components/SprintCardRow";
import SprintModal, {
  type SprintFormData,
} from "@/components/common/sprints/SprintModal";

interface SprintsProps {
  onGoToBoard?: (projectKey: string) => void;
}

const sampleSprints: SprintItem[] = [
  {
    id: "sp-1",
    name: "Sprint 24.1",
    project: "Payments Engine",
    projectKey: "SYNC",
    status: "Active",
    startDate: "Oct 20, 2026",
    endDate: "Nov 3, 2026",
    daysLeft: "6 Days Left",
    goal: "Integrate Stripe webhook verification and token rotation architecture.",
    completedPoints: 19,
    totalPoints: 28,
    itemsCount: 8,
  },
  {
    id: "sp-2",
    name: "Sprint 12.0",
    project: "Mobile Banking App",
    projectKey: "MOB",
    status: "Active",
    startDate: "Oct 25, 2026",
    endDate: "Nov 8, 2026",
    daysLeft: "11 Days Left",
    goal: "Native biometric FaceID unlock and offline transaction caching.",
    completedPoints: 32,
    totalPoints: 42,
    itemsCount: 12,
  },
  {
    id: "sp-3",
    name: "Sprint 24.2",
    project: "Payments Engine",
    projectKey: "SYNC",
    status: "Planned",
    startDate: "Nov 4, 2026",
    endDate: "Nov 18, 2026",
    daysLeft: "Starts in 7 Days",
    goal: "Automated database snapshot backups and payment retry engine.",
    completedPoints: 0,
    totalPoints: 15,
    itemsCount: 5,
  },
  {
    id: "sp-4",
    name: "Sprint 1.0",
    project: "Authentication & SSO",
    projectKey: "AUTH",
    status: "Planned",
    startDate: "Nov 1, 2026",
    endDate: "Nov 15, 2026",
    daysLeft: "Starts in 4 Days",
    goal: "Initial Google and GitHub OAuth identity provider integration.",
    completedPoints: 0,
    totalPoints: 21,
    itemsCount: 6,
  },
  {
    id: "sp-5",
    name: "Sprint 23.4",
    project: "Payments Engine",
    projectKey: "SYNC",
    status: "Completed",
    startDate: "Oct 6, 2026",
    endDate: "Oct 19, 2026",
    daysLeft: "Ended Oct 19",
    goal: "Database schema design and initial Vite monorepo scaffolding.",
    completedPoints: 24,
    totalPoints: 24,
    itemsCount: 7,
  },
];

const Sprints: FC<SprintsProps> = ({ onGoToBoard = () => {} }) => {
  const [sprints, setSprints] = useState<SprintItem[]>(sampleSprints);
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedStatus, setSelectedStatus] =
    useState<SprintStatusFilter>("All");
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);

  const filteredSprints = sprints.filter((sprint) => {
    const matchesProject =
      selectedProject === "All Projects" || sprint.project === selectedProject;
    const matchesStatus =
      selectedStatus === "All" || sprint.status === selectedStatus;
    return matchesProject && matchesStatus;
  });

  const handleCreateSprint = (data: SprintFormData) => {
    const newSprint: SprintItem = {
      id: `sp-${Date.now()}`,
      name: data.name,
      project: "Payments Engine",
      projectKey: "SYNC",
      status:
        data.status === "ACTIVE"
          ? "Active"
          : data.status === "COMPLETED"
            ? "Completed"
            : "Planned",
      startDate: data.startDate || "Nov 15, 2026",
      endDate: data.endDate || "Nov 29, 2026",
      daysLeft: "Planned",
      goal: data.goal,
      completedPoints: 0,
      totalPoints: 20,
      itemsCount: 0,
    };
    setSprints([newSprint, ...sprints]);
  };

  const handleStartSprint = (sprintId: string) => {
    setSprints((prev) =>
      prev.map((s) =>
        s.id === sprintId
          ? { ...s, status: "Active", daysLeft: "14 Days Left" }
          : s,
      ),
    );
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Acme Corp</span>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Iterations</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Sprints
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor timelines, sprint goals, and velocity completion across all
            projects.
          </p>
        </div>
      </div>

      {/* 1. Metric Rollups */}
      <SprintStatsBar />

      {/* 2. Filter Bar */}
      <SprintFilterBar
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        onOpenCreateSprint={() => setIsSprintModalOpen(true)}
      />

      {/* 3. Sprints Directory List */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
        {filteredSprints.map((sprint) => (
          <SprintCardRow
            key={sprint.id}
            sprint={sprint}
            onGoToBoard={onGoToBoard}
            onStartSprint={handleStartSprint}
          />
        ))}

        {filteredSprints.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs italic">
            No sprints match the selected filter criteria.
          </div>
        )}
      </div>

      {/* Create Sprint Modal */}
      <SprintModal
        isOpen={isSprintModalOpen}
        onClose={() => setIsSprintModalOpen(false)}
        mode="create"
        onSubmitSprint={handleCreateSprint}
      />
    </div>
  );
};

export default Sprints;
