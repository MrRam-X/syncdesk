import { type FC, useState } from "react";

// Shared Header
import BoardHeader, { type BoardSubTab } from "./components/BoardHeader";

// Tab 1: Task Board Components
import BoardColumnHeader from "./components/taskboard/BoardColumnHeader";
import SwimlaneRow from "./components/taskboard/SwimlaneRow";
import FilterDrawer from "./components/taskboard/FilterDrawer";
import { type StoryItem } from "./components/taskboard/StoryCard";
import { type TaskItem } from "./components/taskboard/TaskCard";

// Tab 2: Backlog Components
import BacklogTable, {
  type BacklogRowItem,
} from "./components/backlog/BacklogTable";
import StoryDetailModal, {
  type StoryDetailItem,
} from "./components/backlog/StoryDetailModal";
import CreateStoryModal from "./components/backlog/CreateStoryModal";

// Tab 3: Team Members Component
import ProjectMembersTab, {
  type ProjectMemberRow,
} from "./components/team-members/ProjectMembersTab";

// Sprint Modal
import SprintModal, {
  type SprintFormData,
} from "@/components/common/sprints/SprintModal";

interface BoardProps {
  projectName?: string;
}

const sampleStories: StoryItem[] = [
  {
    id: "SYNC-101",
    title: "Integrate Stripe webhook verification for subscription renewals",
    points: 8,
    priority: "High",
    assigneeName: "Sarah Chen",
    assigneeInitials: "SC",
    assigneeBg: "bg-emerald-600",
  },
  {
    id: "SYNC-98",
    title:
      "Implement OAuth2 multi-tenant authentication and session management",
    points: 13,
    priority: "Critical",
    assigneeName: "Alex Rivera",
    assigneeInitials: "AR",
    assigneeBg: "bg-blue-600",
  },
];

const sampleTasks: Record<string, TaskItem[]> = {
  "SYNC-101": [
    {
      id: "SYNC-108",
      title: "Create webhook secret validation middleware",
      points: 2,
      status: "To Do",
      assigneeInitials: "JD",
      assigneeBg: "bg-purple-600",
    },
    {
      id: "SYNC-110",
      title: "Implement customer.subscription.updated handler",
      points: 3,
      status: "In Progress",
      assigneeInitials: "AR",
      assigneeBg: "bg-blue-600",
    },
    {
      id: "SYNC-111",
      title: "Deploy webhook endpoint to staging sandbox",
      points: 1,
      status: "Deployed",
      assigneeInitials: "AR",
      assigneeBg: "bg-blue-600",
    },
    {
      id: "SYNC-113",
      title: "Simulate Stripe signature failure tests",
      points: 2,
      status: "Testing",
      assigneeInitials: "SC",
      assigneeBg: "bg-emerald-600",
    },
  ],
  "SYNC-98": [
    {
      id: "SYNC-114",
      title: "Build JWT refresh token rotation mechanism",
      points: 5,
      status: "To Do",
      assigneeInitials: "JD",
      assigneeBg: "bg-purple-600",
    },
    {
      id: "SYNC-75",
      title: "Create PostgreSQL database schema for multi-tenant users",
      points: 8,
      status: "Done",
      assigneeInitials: "AR",
      assigneeBg: "bg-blue-600",
    },
  ],
};

const sampleBacklogRows: BacklogRowItem[] = [
  {
    id: "SYNC-101",
    title: "Integrate Stripe webhook verification for subscription renewals",
    status: "In Progress",
    points: 8,
    tasksCount: 4,
    assignee: { name: "Sarah Chen", initials: "SC", bg: "bg-emerald-600" },
  },
  {
    id: "SYNC-98",
    title:
      "Implement OAuth2 multi-tenant authentication and session management",
    status: "In Progress",
    points: 13,
    tasksCount: 2,
    assignee: { name: "Alex Rivera", initials: "AR", bg: "bg-blue-600" },
  },
  {
    id: "SYNC-104",
    title: "Design customer billing and invoice download portal",
    status: "Ready",
    points: 5,
    tasksCount: 0,
    assignee: { name: "John Doe", initials: "JD", bg: "bg-purple-600" },
  },
];

const sampleMembers: ProjectMemberRow[] = [
  {
    name: "Alex Rivera",
    email: "alex.rivera@acme.com",
    role: "Project Supervisor",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    bg: "bg-blue-600",
    initials: "AR",
  },
  {
    name: "Sarah Chen",
    email: "sarah.chen@acme.com",
    role: "Coordinator",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    bg: "bg-emerald-600",
    initials: "SC",
  },
  {
    name: "John Doe",
    email: "john.doe@acme.com",
    role: "Contributor",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    bg: "bg-purple-600",
    initials: "JD",
  },
  {
    name: "Elena Rostova",
    email: "elena.rostova@acme.com",
    role: "Reader",
    badgeColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    bg: "bg-slate-700",
    initials: "ER",
  },
];

const Board: FC<BoardProps> = ({ projectName = "Payments Engine" }) => {
  const [selectedSprint, setSelectedSprint] = useState("Sprint 24.1 (Active)");
  const [activeTab, setActiveTab] = useState<BoardSubTab>("taskboard");

  // Filter drawer
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Story modals
  const [isNewStoryModalOpen, setIsNewStoryModalOpen] = useState(false);
  const [selectedStoryDetail, setSelectedStoryDetail] =
    useState<StoryDetailItem | null>(null);

  // Sprint Modal State (Encapsulated here)
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [sprintModalMode, setSprintModalMode] = useState<"create" | "edit">(
    "create",
  );

  // Swimlane expand/collapse
  const [expandedStories, setExpandedStories] = useState<
    Record<string, boolean>
  >({
    "SYNC-101": true,
  });

  const storyIds = sampleStories.map((s) => s.id);
  const areAllCollapsed = storyIds.every((id) => !expandedStories[id]);

  const handleToggleStory = (storyId: string) => {
    setExpandedStories((prev) => ({ ...prev, [storyId]: !prev[storyId] }));
  };

  const handleToggleAll = () => {
    if (areAllCollapsed) {
      const allOpen: Record<string, boolean> = {};
      storyIds.forEach((id) => (allOpen[id] = true));
      setExpandedStories(allOpen);
    } else {
      setExpandedStories({});
    }
  };

  const handleSelectBacklogStory = (row: BacklogRowItem) => {
    setSelectedStoryDetail({
      id: row.id,
      title: row.title,
      description:
        "Validate incoming Stripe webhook signatures using HMAC SHA256 before updating database rows.",
      status: row.status,
      priority: "High",
      points: row.points,
      sprint: selectedSprint,
      assigneeName: row.assignee?.name,
      tasks: [
        {
          id: `${row.id}-T1`,
          title: "Verify signature middleware",
          status: "To Do",
          points: 2,
          assignee: "JD",
        },
        {
          id: `${row.id}-T2`,
          title: "Implement subscription handler",
          status: "In Progress",
          points: 3,
          assignee: "AR",
        },
      ],
    });
  };

  // Sprint Modal Handlers
  const handleOpenCreateSprint = () => {
    setSprintModalMode("create");
    setIsSprintModalOpen(true);
  };

  const handleOpenEditSprint = () => {
    setSprintModalMode("edit");
    setIsSprintModalOpen(true);
  };

  const handleCloseSprintModal = () => {
    setIsSprintModalOpen(false);
  };

  const handleSubmitSprint = (data: SprintFormData) => {
    console.log("Sprint saved:", data);
    setIsSprintModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Shared Board Header */}
      <BoardHeader
        projectName={projectName}
        selectedSprint={selectedSprint}
        onSelectSprint={setSelectedSprint}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
        onOpenNewStoryModal={() => setIsNewStoryModalOpen(true)}
        onOpenEditSprintModal={handleOpenEditSprint}
        onOpenCreateSprintModal={handleOpenCreateSprint}
      />

      {/* Tab 1: Task Board */}
      {activeTab === "taskboard" && (
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          <div className="w-fit min-w-full space-y-4">
            <BoardColumnHeader
              areAllCollapsed={areAllCollapsed}
              onToggleAll={handleToggleAll}
            />

            {sampleStories.map((story) => (
              <SwimlaneRow
                key={story.id}
                story={story}
                tasks={sampleTasks[story.id] || []}
                isExpanded={!!expandedStories[story.id]}
                onToggleExpand={handleToggleStory}
                onAddNewTask={(id) => alert(`Add task to ${id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Backlog */}
      {activeTab === "backlog" && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
            <div>
              <h2 className="text-sm font-bold text-white">
                Backlog Stories in {selectedSprint}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any row to view full acceptance criteria and tasks.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Total: {sampleBacklogRows.length} Stories
            </span>
          </div>

          <BacklogTable
            stories={sampleBacklogRows}
            onSelectStory={handleSelectBacklogStory}
          />
        </div>
      )}

      {/* Tab 3: Team Members */}
      {activeTab === "team-members" && (
        <div className="flex-1 overflow-y-auto p-6">
          <ProjectMembersTab
            projectName={projectName}
            members={sampleMembers}
            onAssignMember={() => alert("Assign member")}
            onRemoveMember={(email) => alert(`Remove ${email}`)}
          />
        </div>
      )}

      {/* Modals & Drawers */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CreateStoryModal
        isOpen={isNewStoryModalOpen}
        onClose={() => setIsNewStoryModalOpen(false)}
        selectedSprintDefault={selectedSprint}
      />

      <StoryDetailModal
        story={selectedStoryDetail}
        isOpen={!!selectedStoryDetail}
        onClose={() => setSelectedStoryDetail(null)}
      />

      {/* Consuming SprintModal directly inside the Board feature */}
      <SprintModal
        key={`${sprintModalMode}-${isSprintModalOpen}`}
        isOpen={isSprintModalOpen}
        onClose={handleCloseSprintModal}
        mode={sprintModalMode}
        onSubmitSprint={handleSubmitSprint}
      />
    </div>
  );
};

export default Board;
