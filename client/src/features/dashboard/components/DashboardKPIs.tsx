import { type FC } from "react";
import { CheckSquare, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import StatCard from "@/components/common/StatCard";

interface DashboardKPIsProps {
  assignedCount?: number;
  velocityPercentage?: number;
  completedPoints?: number;
  totalPoints?: number;
  criticalBlockersCount?: number;
  daysRemaining?: number;
}

const DashboardKPIs: FC<DashboardKPIsProps> = ({
  assignedCount = 4,
  velocityPercentage = 68,
  completedPoints = 19,
  totalPoints = 28,
  criticalBlockersCount = 1,
  daysRemaining = 6,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Assigned to Me"
        value={assignedCount}
        subtitle={
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="text-blue-400 font-semibold">2 in progress</span>
            <span>•</span>
            <span>2 in review/todo</span>
          </div>
        }
        icon={<CheckSquare className="w-5 h-5" />}
        color="blue"
      />

      <StatCard
        title="Active Sprint Velocity"
        value={`${velocityPercentage}%`}
        subtitle={
          <div className="text-[11px] text-emerald-400 font-medium">
            {completedPoints} of {totalPoints} Story Pts completed
          </div>
        }
        icon={<TrendingUp className="w-5 h-5" />}
        color="emerald"
      />

      <StatCard
        title="Critical Blockers"
        value={criticalBlockersCount}
        subtitle="SYNC-102 (Race condition)"
        icon={<AlertTriangle className="w-5 h-5" />}
        color="rose"
      />

      <StatCard
        title="Sprint 24.1 Timeline"
        value={`${daysRemaining} Days`}
        subtitle="Ends Nov 3, 2026"
        icon={<Clock className="w-5 h-5" />}
        color="purple"
      />
    </div>
  );
};

export default DashboardKPIs;
