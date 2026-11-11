import { type FC } from 'react';
import { Bookmark } from 'lucide-react';
import DataTable, { type Column } from '@/components/common/DataTable';

export interface BacklogRowItem {
  id: string;
  title: string;
  status: string;
  points: number;
  tasksCount: number;
  assignee: {
    name: string;
    initials: string;
    bg: string;
  } | null;
}

interface BacklogTableProps {
  stories: BacklogRowItem[];
  onSelectStory: (story: BacklogRowItem) => void;
}

const BacklogTable: FC<BacklogTableProps> = ({ stories, onSelectStory }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Ready':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const columns: Column<BacklogRowItem>[] = [
    {
      header: 'ID',
      width: 'w-32',
      render: (row) => (
        <span className="font-mono font-semibold text-blue-400 flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5 shrink-0" />
          <span>{row.id}</span>
        </span>
      ),
    },
    {
      header: 'Title',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-200 group-hover:text-blue-400 transition">
            {row.title}
          </div>
          {row.tasksCount > 0 && (
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {row.tasksCount} child tasks linked
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      width: 'w-40',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 border ${getStatusBadge(
            row.status
          )}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {row.status}
        </span>
      ),
    },
    {
      header: 'Assigned To',
      width: 'w-52',
      render: (row) =>
        row.assignee ? (
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 ${row.assignee.bg}`}
            >
              {row.assignee.initials}
            </div>
            <span className="text-slate-300 font-medium">{row.assignee.name}</span>
          </div>
        ) : (
          <span className="text-slate-500 italic">Unassigned</span>
        ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={stories}
      keyExtractor={(row) => row.id}
      onRowClick={onSelectStory}
      emptyMessage="No backlog items found for this sprint iteration."
    />
  );
};

export default BacklogTable;