import { type FC } from 'react';
import { Clock, TrendingUp, Milestone } from 'lucide-react';
import StatCard from '@/components/common/StatCard';

interface SprintStatsBarProps {
  activeCount?: number;
  pointsInProgress?: number;
  itemsInProgress?: number;
  plannedPoints?: number;
  plannedSprintsCount?: number;
}

const SprintStatsBar: FC<SprintStatsBarProps> = ({
  activeCount = 2,
  pointsInProgress = 70,
  itemsInProgress = 20,
  plannedPoints = 36,
  plannedSprintsCount = 2,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Active Iterations"
        value={`${activeCount} Sprints`}
        subtitle={<span className="text-emerald-400 font-medium">Currently in flight</span>}
        icon={<Clock className="w-5 h-5" />}
        color="emerald"
      />

      <StatCard
        title="Points in Progress"
        value={`${pointsInProgress} Story Pts`}
        subtitle={`Across ${itemsInProgress} work items`}
        icon={<TrendingUp className="w-5 h-5" />}
        color="blue"
      />

      <StatCard
        title="Planned Backlog Pool"
        value={`${plannedPoints} Story Pts`}
        subtitle={<span className="text-sky-400 font-medium">{plannedSprintsCount} upcoming sprints queued</span>}
        icon={<Milestone className="w-5 h-5" />}
        color="sky"
      />
    </div>
  );
};

export default SprintStatsBar;