import { type FC } from "react";
import { Kanban } from "lucide-react";

interface SprintHealthWidgetProps {
  sprintName?: string;
  goal?: string;
  completedPoints?: number;
  totalPoints?: number;
  onGoToBoard?: () => void;
}

const SprintHealthWidget: FC<SprintHealthWidgetProps> = ({
  sprintName = "Sprint 24.1",
  goal = "Stripe webhook verification and OAuth2 token rotation architecture.",
  completedPoints = 19,
  totalPoints = 28,
  onGoToBoard = () => {},
}) => {
  const percentage = Math.round((completedPoints / totalPoints) * 100);

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
        {sprintName} Health
      </h2>

      <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">{sprintName}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
            <strong className="text-slate-300">Goal: </strong>
            {goal}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Completion</span>
            <strong className="text-white font-mono">
              {completedPoints} / {totalPoints} pts ({percentage}%)
            </strong>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full w-[45%]"
              title="Done (12 pts)"
            />
            <div
              className="bg-blue-500 h-full w-[23%]"
              title="In Progress (7 pts)"
            />
            <div
              className="bg-slate-700 h-full w-[32%]"
              title="Remaining (9 pts)"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Done
              (12)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Active
              (7)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" /> To Do
              (9)
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onGoToBoard}
            className="w-full py-2 rounded-lg bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Go to Task Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SprintHealthWidget;
