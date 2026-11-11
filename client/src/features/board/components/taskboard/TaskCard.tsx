import { type FC } from "react";
import { CheckSquare, Rocket, FlaskConical } from "lucide-react";

export interface TaskItem {
  id: string;
  title: string;
  points: number;
  status: "To Do" | "In Progress" | "Deployed" | "Testing" | "Done";
  assigneeInitials: string;
  assigneeBg?: string;
  type?: "task" | "bug";
}

interface TaskCardProps {
  task: TaskItem;
  onClick?: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, onClick }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "Deployed":
        return <Rocket className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case "Testing":
        return <FlaskConical className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case "Done":
        return (
          <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        );
      default:
        return <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
    }
  };

  return (
    <article
      onClick={onClick}
      className={`p-3 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-slate-700 transition cursor-grab active:cursor-grabbing select-none ${
        task.status === "Done" ? "opacity-80 hover:opacity-100" : ""
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
        <span className="flex items-center gap-1">
          {getStatusIcon()}
          <span
            className={
              task.status === "Done" ? "line-through text-slate-500" : ""
            }
          >
            {task.id}
          </span>
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          {task.points} pts
        </span>
      </div>

      <h5
        className={`text-xs font-medium mb-2 line-clamp-2 ${
          task.status === "Done"
            ? "text-slate-400 line-through"
            : "text-slate-200"
        }`}
      >
        {task.title}
      </h5>

      <div className="flex items-center justify-end">
        <div
          className={`w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${
            task.assigneeBg || "bg-blue-600"
          }`}
        >
          {task.assigneeInitials}
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
