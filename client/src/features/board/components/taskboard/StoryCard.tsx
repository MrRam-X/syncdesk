import { type FC } from "react";
import { Bookmark, ChevronDown } from "lucide-react";

export interface StoryItem {
  id: string;
  title: string;
  points: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  assigneeName: string;
  assigneeInitials: string;
  assigneeBg?: string;
  tasksCount?: number;
}

interface StoryCardProps {
  story: StoryItem;
  onCollapse: (storyId: string) => void;
}

const StoryCard: FC<StoryCardProps> = ({ story, onCollapse }) => {
  const handleCollapseClick = () => {
    onCollapse(story.id);
  };

  return (
    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg shadow-sm space-y-3 select-none">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCollapseClick}
            className="p-1 -ml-1 rounded hover:bg-slate-850 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            title="Collapse Story"
          >
            <ChevronDown className="w-4 h-4 text-blue-400" />
          </button>
          <span className="flex items-center gap-1 font-mono text-blue-400 font-semibold">
            <Bookmark className="w-3.5 h-3.5" />
            {story.id}
          </span>
        </div>

        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">
          Story
        </span>
      </div>

      <h4 className="text-xs font-semibold text-slate-100 leading-snug line-clamp-2">
        {story.title}
      </h4>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          {story.points} pts
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">
            {story.assigneeName}
          </span>
          <div
            className={`w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${
              story.assigneeBg || "bg-emerald-600"
            }`}
          >
            {story.assigneeInitials}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
