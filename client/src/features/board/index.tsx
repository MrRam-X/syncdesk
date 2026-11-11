import { type FC, useState } from "react";
import BoardHeader, { type BoardSubTab } from "./components/BoardHeader";
import BoardColumnHeader from "./components/BoardColumnHeader";
import SwimlaneRow from "./components/SwimlaneRow";
import FilterDrawer from "./components/FilterDrawer";
import { type StoryItem } from "./components/StoryCard";
import { type TaskItem } from "./components/TaskCard";

interface BoardProps {
  projectName?: string;
  onOpenNewStoryModal?: () => void;
  onOpenEditSprintModal?: () => void;
  onOpenCreateSprintModal?: () => void;
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

const Board: FC<BoardProps> = ({
  projectName = "Payments Engine",
  onOpenNewStoryModal = () => {},
  onOpenEditSprintModal = () => {},
  onOpenCreateSprintModal = () => {},
}) => {
  const [selectedSprint, setSelectedSprint] = useState("Sprint 24.1 (Active)");
  const [activeTab, setActiveTab] = useState<BoardSubTab>("taskboard");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStories, setExpandedStories] = useState<
    Record<string, boolean>
  >({
    "SYNC-101": true,
  });

  const storyIds = sampleStories.map((s) => s.id);
  const areAllCollapsed = storyIds.every((id) => !expandedStories[id]);

  const handleToggleStory = (storyId: string) => {
    setExpandedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
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

  const handleAddNewTask = (storyId: string) => {
    alert(`Add task to parent story: ${storyId}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Board Header & Controls */}
      <BoardHeader
        projectName={projectName}
        selectedSprint={selectedSprint}
        onSelectSprint={setSelectedSprint}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
        onOpenNewStoryModal={onOpenNewStoryModal}
        onOpenEditSprintModal={onOpenEditSprintModal}
        onOpenCreateSprintModal={onOpenCreateSprintModal}
      />

      {/* Swimlane Taskboard Grid Canvas */}
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
                onAddNewTask={handleAddNewTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Slide-Over Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
};

export default Board;
