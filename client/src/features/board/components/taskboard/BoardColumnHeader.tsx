import { type FC } from "react";
import { ChevronsUpDown } from "lucide-react";

interface BoardColumnHeaderProps {
  areAllCollapsed: boolean;
  onToggleAll: () => void;
}

const BoardColumnHeader: FC<BoardColumnHeaderProps> = ({
  areAllCollapsed,
  onToggleAll,
}) => {
  const handleToggleClick = () => {
    onToggleAll();
  };

  return (
    <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 px-4 pb-2 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
      <button
        type="button"
        onClick={handleToggleClick}
        className="flex items-center gap-2 px-2 py-1 -ml-2 rounded-md hover:bg-slate-850 hover:text-slate-200 transition text-left text-slate-300 font-semibold cursor-pointer"
        title="Toggle collapse on all stories"
      >
        <ChevronsUpDown className="w-4 h-4 text-blue-400 shrink-0" />
        <span>{areAllCollapsed ? "Expand All" : "Collapse All"}</span>
      </button>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-slate-500" />
        <span>To Do</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span>In Progress</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-500" />
        <span>Deployed</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-500" />
        <span>Testing</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>Done</span>
      </div>
    </div>
  );
};

export default BoardColumnHeader;
