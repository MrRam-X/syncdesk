import { type FC } from "react";
import { Search, Plus, Pin } from "lucide-react";

export interface NoteItem {
  id: string;
  title: string;
  category: string;
  tagColor: string;
  updated: string;
  pinned: boolean;
  preview: string;
}

interface NotesExplorerProps {
  notes: NoteItem[];
  activeNoteId: string;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const NotesExplorer: FC<NotesExplorerProps> = ({
  notes,
  activeNoteId,
  onSelectNote,
  onNewNote,
  searchQuery,
  onSearchChange,
}) => {
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-80 border-r border-slate-800 bg-slate-950/60 flex flex-col shrink-0 select-none">
      {/* Search & New Note Row */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notes..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="button"
            onClick={onNewNote}
            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer"
            title="New Scratchpad Note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-mono">
          <span>{notes.length} Saved Notes</span>
          <span>Markdown Enabled</span>
        </div>
      </div>

      {/* Saved Notes Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={`p-3.5 cursor-pointer transition flex flex-col justify-between space-y-2 ${
              activeNoteId === note.id
                ? "bg-slate-900 border-l-2 border-blue-500"
                : "hover:bg-slate-900/40 text-slate-300"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${note.tagColor}`}
                >
                  {note.category}
                </span>
                {note.pinned && (
                  <Pin className="w-3 h-3 text-amber-400 shrink-0 rotate-45" />
                )}
              </div>

              <h3 className="text-xs font-bold text-white line-clamp-1">
                {note.title}
              </h3>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {note.preview}
              </p>
            </div>

            <div className="text-[10px] text-slate-500 font-mono">
              Updated {note.updated}
            </div>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="p-6 text-center text-slate-500 text-xs italic">
            No notes match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesExplorer;