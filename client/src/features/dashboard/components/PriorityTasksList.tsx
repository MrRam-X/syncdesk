import { type FC } from "react";
import { ArrowRight } from "lucide-react";

export interface PriorityTask {
  id: string;
  project: string;
  title: string;
  status: string;
  statusColor: string;
  priority: string;
  priorityColor: string;
  points: number;
}

interface PriorityTasksListProps {
  tasks: PriorityTask[];
  onViewAllClick?: () => void;
  onTaskClick?: (taskId: string) => void;
}

const PriorityTasksList: FC<PriorityTasksListProps> = ({
  tasks,
  onViewAllClick = () => {},
  onTaskClick = () => {},
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            My Priority Work Items
          </h2>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
            {tasks.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onViewAllClick}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition cursor-pointer"
        >
          <span>View all my tasks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick(task.id)}
            className="p-3.5 hover:bg-slate-900/60 transition group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 shrink-0">
                {task.project}
              </span>
              <span className="font-mono text-blue-400 font-semibold shrink-0">
                {task.id}
              </span>
              <span className="font-medium text-slate-200 truncate group-hover:text-blue-400 transition">
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${task.statusColor}`}
              >
                {task.status}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${task.priorityColor}`}
              >
                {task.priority}
              </span>
              <span className="font-mono text-slate-400 text-[11px] w-10 text-right">
                {task.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityTasksList;
