import { type FC } from "react";
import { CheckSquare, Bookmark, Bug } from "lucide-react";
import StatCard from "@/components/common/StatCard";

interface TasksMetricsBarProps {
  totalCount: number;
  storiesCount: number;
  tasksCount: number;
  bugsCount: number;
}

const TasksMetricsBar: FC<TasksMetricsBarProps> = ({
  totalCount,
  storiesCount,
  tasksCount,
  bugsCount,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard
        title="Total Work Items"
        value={totalCount}
        subtitle="Across all repositories"
        icon={<CheckSquare className="w-5 h-5" />}
        color="blue"
      />

      <StatCard
        title="User Stories"
        value={storiesCount}
        subtitle="Feature requirements"
        icon={<Bookmark className="w-5 h-5" />}
        color="sky"
      />

      <StatCard
        title="Tasks"
        value={tasksCount}
        subtitle="Technical assignments"
        icon={<CheckSquare className="w-5 h-5" />}
        color="purple"
      />

      <StatCard
        title="Active Bugs"
        value={bugsCount}
        subtitle="Defects requiring triage"
        icon={<Bug className="w-5 h-5" />}
        color="rose"
      />
    </div>
  );
};

export default TasksMetricsBar;