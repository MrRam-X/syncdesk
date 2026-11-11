import { type FC } from "react";
import { ChevronRight } from "lucide-react";
import StoryCard, { type StoryItem } from "./StoryCard";
import TaskCard, { type TaskItem } from "./TaskCard";
import DottedAddNewTaskCard from "./DottedAddNewTaskCard";

interface SwimlaneRowProps {
  story: StoryItem;
  tasks: TaskItem[];
  isExpanded: boolean;
  onToggleExpand: (storyId: string) => void;
  onAddNewTask: (storyId: string) => void;
}

const SwimlaneRow: FC<SwimlaneRowProps> = ({
  story,
  tasks,
  isExpanded,
  onToggleExpand,
  onAddNewTask,
}) => {
  const handleBarClick = () => {
    onToggleExpand(story.id);
  };

  const getPriorityBadgeClass = () => {
    switch (story.priority) {
      case "Critical":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "High":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Low":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  const todoTasks = tasks.filter((t) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const deployedTasks = tasks.filter((t) => t.status === "Deployed");
  const testingTasks = tasks.filter((t) => t.status === "Testing");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="w-full">
      {!isExpanded ? (
        /* COLLAPSED BAR: Title shown ONLY when collapsed */
        <div
          onClick={handleBarClick}
          className="w-full px-4 py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer transition select-none"
        >
          <div className="flex items-center gap-3">
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-mono text-xs text-blue-400 font-semibold">
              {story.id}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {story.title}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadgeClass()}`}
            >
              {story.priority}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {story.points} pts
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-mono">
              {tasks.length} Tasks
            </span>
          </div>
        </div>
      ) : (
        /* EXPANDED SWIMLANE: 6-column grid */
        <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl items-start">
          {/* Col 1: Story Card */}
          <StoryCard story={story} onCollapse={onToggleExpand} />

          {/* Col 2: To Do (with dotted new task card) */}
          <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              {todoTasks.map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </div>
            <DottedAddNewTaskCard storyId={story.id} onClick={onAddNewTask} />
          </div>

          {/* Col 3: In Progress */}
          <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((t) => <TaskCard key={t.id} task={t} />)
            ) : (
              <div className="flex items-center justify-center h-24 text-[11px] text-slate-600 italic">
                No tasks
              </div>
            )}
          </div>

          {/* Col 4: Deployed */}
          <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800">
            {deployedTasks.length > 0 ? (
              deployedTasks.map((t) => <TaskCard key={t.id} task={t} />)
            ) : (
              <div className="flex items-center justify-center h-24 text-[11px] text-slate-600 italic">
                No tasks
              </div>
            )}
          </div>

          {/* Col 5: Testing */}
          <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800">
            {testingTasks.length > 0 ? (
              testingTasks.map((t) => <TaskCard key={t.id} task={t} />)
            ) : (
              <div className="flex items-center justify-center h-24 text-[11px] text-slate-600 italic">
                No tasks
              </div>
            )}
          </div>

          {/* Col 6: Done */}
          <div className="space-y-2 min-h-[140px] p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800">
            {doneTasks.length > 0 ? (
              doneTasks.map((t) => <TaskCard key={t.id} task={t} />)
            ) : (
              <div className="flex items-center justify-center h-24 text-[11px] text-slate-600 italic">
                No tasks done
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwimlaneRow;
