import { type FC } from "react";
import { Bookmark, CheckSquare, Plus } from "lucide-react";
import Modal from "@/components/common/Modal";

export interface ChildTask {
  id: string;
  title: string;
  status: string;
  points: number;
  assignee: string;
}

export interface StoryDetailItem {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  points: number;
  sprint: string;
  assigneeName?: string;
  tasks: ChildTask[];
}

interface StoryDetailModalProps {
  story: StoryDetailItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddTaskToStory?: (storyId: string) => void;
}

const StoryDetailModal: FC<StoryDetailModalProps> = ({
  story,
  isOpen,
  onClose,
  onAddTaskToStory = () => {},
}) => {
  if (!story) return null;

  const handleAddTaskClick = () => {
    onAddTaskToStory(story.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={story.title}
      size="xl"
      icon={<Bookmark className="w-4 h-4 text-blue-400" />}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition cursor-pointer"
        >
          Close
        </button>
      }
    >
      <div className="space-y-6 text-xs">
        {/* Metadata Badges Row */}
        <div className="flex flex-wrap items-center gap-4 text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">ID:</span>
            <span className="font-mono text-blue-400 font-semibold">
              {story.id}
            </span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Sprint:</span>
            <strong className="text-slate-200">{story.sprint}</strong>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Priority:</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase">
              {story.priority}
            </span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Story Points:</span>
            <strong className="text-blue-400 font-mono">
              {story.points} pts
            </strong>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Assignee:</span>
            <strong className="text-slate-200">
              {story.assigneeName || "Unassigned"}
            </strong>
          </div>
        </div>

        {/* Description & Acceptance Criteria */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Description & Acceptance Criteria
          </label>
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 leading-relaxed text-xs">
            {story.description}
          </div>
        </div>

        {/* Linked Child Tasks */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Child Tasks ({story.tasks.length})</span>
            </label>
            <button
              type="button"
              onClick={handleAddTaskClick}
              className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Task</span>
            </button>
          </div>

          {story.tasks.length > 0 ? (
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
              {story.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-900 transition text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="font-mono text-slate-400 text-[11px]">
                      {task.id}
                    </span>
                    <span className="text-slate-200 truncate font-medium">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pl-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                      {task.status}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {task.points} pts
                    </span>
                    <div className="w-5 h-5 rounded-full bg-slate-700 text-white text-[9px] font-bold flex items-center justify-center">
                      {task.assignee}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-slate-800 rounded-lg text-center text-slate-500 text-xs italic">
              No child tasks created for this story yet.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default StoryDetailModal;
