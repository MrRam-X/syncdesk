import { type FC } from "react";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const FilterDrawer: FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="relative w-80 max-w-full bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Board Filters</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6 text-xs">
          {/* Active Filters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                Active Filters
              </label>
              <button
                type="button"
                className="text-[10px] text-blue-400 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]">
                Sprint 24.1
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Search */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
              Keyword Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search title, ID..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
              Assignee
            </label>
            <div className="relative">
              <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none appearance-none cursor-pointer">
                <option value="">All Members</option>
                <option value="alex">Alex Rivera</option>
                <option value="sarah">Sarah Chen</option>
                <option value="john">John Doe</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
              Priority
            </label>
            <div className="space-y-1.5">
              {["Critical", "High", "Medium", "Low"].map((priority) => (
                <label
                  key={priority}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-800/50 cursor-pointer text-slate-300"
                >
                  <input type="checkbox" className="accent-blue-500 rounded" />
                  <span>{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
