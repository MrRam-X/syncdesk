import { type FC } from "react";
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export interface SprintItem {
  id: string;
  name: string;
  project: string;
  projectKey: string;
  status: "Active" | "Planned" | "Completed";
  startDate: string;
  endDate: string;
  daysLeft: string;
  goal: string;
  completedPoints: number;
  totalPoints: number;
  itemsCount: number;
}

interface SprintCardRowProps {
  sprint: SprintItem;
  onGoToBoard?: (projectKey: string) => void;
  onStartSprint?: (sprintId: string) => void;
}

const SprintCardRow: FC<SprintCardRowProps> = ({
  sprint,
  onGoToBoard = () => {},
  onStartSprint = () => {},
}) => {
  const percentage =
    sprint.totalPoints > 0
      ? Math.round((sprint.completedPoints / sprint.totalPoints) * 100)
      : 0;

  const getStatusBadge = () => {
    switch (sprint.status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Planned":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      default:
        return "bg-slate-500/15 text-slate-300 border-slate-600/30";
    }
  };

  const getProgressBarColor = () => {
    switch (sprint.status) {
      case "Completed":
        return "bg-emerald-500";
      case "Active":
        return "bg-blue-500";
      default:
        return "bg-slate-700";
    }
  };

  return (
    <div className="p-5 hover:bg-slate-900/60 transition group flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs select-none">
      {/* Left: Metadata, Title, Goal & Dates */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {sprint.projectKey}
          </span>

          <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition">
            {sprint.name}
          </h3>

          <span className="text-xs text-slate-400">({sprint.project})</span>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge()}`}
          >
            {sprint.status}
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-1">
          <strong className="text-slate-300 font-medium">Goal: </strong>
          {sprint.goal}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {sprint.startDate} – {sprint.endDate}
            </span>
          </span>
          <span>•</span>
          <span
            className={
              sprint.status === "Active"
                ? "text-emerald-400 font-semibold"
                : "text-slate-400"
            }
          >
            {sprint.daysLeft}
          </span>
        </div>
      </div>

      {/* Right: Progress Bar & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 lg:w-80">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">Velocity</span>
            <span className="font-mono text-white font-bold">
              {sprint.completedPoints} / {sprint.totalPoints} pts ({percentage}
              %)
            </span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="text-[10px] text-slate-500 font-mono text-right">
            {sprint.itemsCount} work items linked
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {sprint.status === "Active" ? (
            <button
              type="button"
              onClick={() => onGoToBoard(sprint.projectKey)}
              className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <span>Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : sprint.status === "Planned" ? (
            <button
              type="button"
              onClick={() => onStartSprint(sprint.id)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              Start
            </button>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Done
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SprintCardRow;
