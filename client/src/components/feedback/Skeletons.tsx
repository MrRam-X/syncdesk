// =========================================================
// 1. KANBAN BOARD SWIMLANE SKELETON (Flagship Board View)
// =========================================================
const KanbanBoardSkeleton = () => {
  return (
    <div className="w-fit min-w-full space-y-4 select-none animate-pulse">
      
      {/* Column Header Skeletons (6 Columns) */}
      <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 px-4 pb-2 border-b border-slate-800">
        {['Story', 'To Do', 'In Progress', 'Deployed', 'Testing', 'Done'].map((col, idx) => (
          <div key={`${idx}-${col}`} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <div className="h-3 w-20 bg-slate-800 rounded" />
          </div>
        ))}
      </div>

      {/* Swimlane 1 Skeleton (Expanded State) */}
      <div className="grid grid-cols-[280px_repeat(5,minmax(220px,1fr))] gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl items-start">
        
        {/* Left: Story Card Skeleton */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-16 bg-slate-800 rounded font-mono" />
            <div className="h-3.5 w-10 bg-slate-800 rounded" />
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full bg-slate-800 rounded" />
            <div className="h-3.5 w-4/5 bg-slate-800 rounded" />
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="h-3 w-12 bg-slate-800 rounded" />
            <div className="w-5 h-5 rounded-full bg-slate-800" />
          </div>
        </div>

        {/* 5 Task Columns Skeletons */}
        {[1, 2, 3, 4, 5].map((colIdx) => (
          <div
            key={colIdx}
            className="space-y-2.5 p-2 bg-slate-950/40 rounded-lg border border-dashed border-slate-800 min-h-[140px]"
          >
            {colIdx <= 3 && (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-14 bg-slate-800 rounded" />
                  <div className="h-3 w-8 bg-slate-800 rounded" />
                </div>
                <div className="h-3.5 w-full bg-slate-800 rounded" />
                <div className="flex justify-end pt-1">
                  <div className="w-4 h-4 rounded-full bg-slate-800" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Swimlane 2 Skeleton (Collapsed State) */}
      <div className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded bg-slate-800" />
          <div className="h-3.5 w-16 bg-slate-800 rounded" />
          <div className="h-3.5 w-72 bg-slate-800 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-12 bg-slate-800 rounded-full" />
          <div className="h-3.5 w-12 bg-slate-800 rounded" />
        </div>
      </div>

    </div>
  );
}

// =========================================================
// 2. REUSABLE TABLE SKELETON (Backlog, Tasks, Employees, Orgs)
// =========================================================
interface TableSkeletonProps {
  rows?: number;
  cols?: number;
  showHeader?: boolean;
}

const TableSkeleton = ({ rows = 5, showHeader = true }: TableSkeletonProps) => {
  return (
    <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm animate-pulse select-none">
      
      {/* Optional Table Header */}
      {showHeader && (
        <div className="p-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="h-3 w-28 bg-slate-800 rounded" />
          <div className="h-3 w-40 bg-slate-800 rounded" />
          <div className="h-3 w-24 bg-slate-800 rounded" />
          <div className="h-3 w-20 bg-slate-800 rounded" />
        </div>
      )}

      {/* Repeating Table Rows */}
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="p-4 flex items-center justify-between gap-4">
          
          {/* Avatar + Main Title text */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-800 shrink-0" />
            <div className="space-y-1.5 flex-1 max-w-sm">
              <div className="h-3.5 w-full bg-slate-800 rounded" />
              <div className="h-2.5 w-2/3 bg-slate-800/80 rounded" />
            </div>
          </div>

          {/* Status Badge Placeholder */}
          <div className="h-5 w-24 bg-slate-800 rounded-full shrink-0" />

          {/* Date / Metadata Placeholder */}
          <div className="h-3 w-20 bg-slate-800 rounded shrink-0 hidden sm:block" />

          {/* Action Placeholder */}
          <div className="h-3 w-12 bg-slate-800 rounded shrink-0" />
        </div>
      ))}

    </div>
  );
}

// =========================================================
// 3. REUSABLE CARD GRID SKELETON (Projects, Dashboard KPIs)
// =========================================================
interface CardGridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

const CardGridSkeleton = ({ count = 3, columns = 3 }: CardGridSkeletonProps) => {
  const colClass =
    columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
      ? 'grid-cols-1 lg:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-5 animate-pulse select-none ${colClass}`}>
      {Array.from({ length: count }).map((_, cIdx) => (
        <div
          key={cIdx}
          className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            {/* Tag / Key row */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-14 bg-slate-800 rounded" />
              <div className="h-4 w-20 bg-slate-800 rounded-full" />
            </div>

            {/* Title */}
            <div className="h-4 w-3/4 bg-slate-800 rounded" />

            {/* 2-line Description */}
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-slate-800 rounded" />
              <div className="h-3 w-4/5 bg-slate-800 rounded" />
            </div>
          </div>

          {/* Footer Line: Count + Avatars */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="h-3 w-20 bg-slate-800 rounded" />
            <div className="flex items-center -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-slate-800 ring-2 ring-slate-900" />
              <div className="w-6 h-6 rounded-full bg-slate-800 ring-2 ring-slate-900" />
              <div className="w-6 h-6 rounded-full bg-slate-800 ring-2 ring-slate-900" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =========================================================
// 4. INLINE BUTTON SPINNER (For Mutation Actions)
// =========================================================
interface ButtonSpinnerProps {
  className?: string;
}

const ButtonSpinner = ({ className = 'w-3.5 h-3.5' }: ButtonSpinnerProps) => {
  return (
    <svg
      className={`animate-spin text-current shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export {
  KanbanBoardSkeleton,
  TableSkeleton,
  CardGridSkeleton,
  ButtonSpinner
}