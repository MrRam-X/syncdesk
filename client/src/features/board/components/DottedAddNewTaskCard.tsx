import { type FC } from 'react';
import { Plus } from 'lucide-react';

interface DottedAddNewTaskCardProps {
  storyId: string;
  onClick: (storyId: string) => void;
}

const DottedAddNewTaskCard: FC<DottedAddNewTaskCardProps> = ({ storyId, onClick }) => {
  const handleClick = () => {
    onClick(storyId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full py-2 px-3 mt-2 rounded-lg border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 text-xs text-slate-400 hover:text-blue-400 flex items-center justify-center gap-1.5 transition cursor-pointer select-none"
    >
      <Plus className="w-3.5 h-3.5" />
      <span>New Task</span>
    </button>
  );
};

export default DottedAddNewTaskCard;