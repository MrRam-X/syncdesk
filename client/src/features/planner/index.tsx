import { type FC, useState } from 'react';
import { Save } from 'lucide-react';
import NotesExplorer, { type NoteItem } from './components/NotesExplorer';
import MarkdownCanvas, { type ChecklistItem } from './components/MarkdownCanvas';

const sampleNotes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Sprint 24.1 Standup Notes & Blockers',
    category: 'Standup',
    tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    updated: 'Just now',
    pinned: true,
    preview: 'Discuss Redis lock race condition in card reordering. Sync with Sarah on webhook secret verification...',
  },
  {
    id: 'note-2',
    title: 'Stripe Webhook Signature Verification RFC',
    category: 'Architecture',
    tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    updated: 'Yesterday',
    pinned: true,
    preview: 'Ensure timing-safe comparison on HMAC SHA256 digests. Return 400 on malformed payloads before database writes...',
  },
  {
    id: 'note-3',
    title: 'PostgreSQL Migration Checklist (Neon)',
    category: 'Checklist',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    updated: 'Oct 28, 2026',
    pinned: false,
    preview: 'Run drizzle-kit generate, verify SSL pool connections, check index performance on work_items table...',
  },
  {
    id: 'note-4',
    title: 'Sprint 24.2 Backlog Grooming Ideas',
    category: 'Ideas',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    updated: 'Oct 25, 2026',
    pinned: false,
    preview: 'Propose automated retry queues using BullMQ, export CSV velocity reports for management...',
  },
];

const sampleChecklist: ChecklistItem[] = [
  { text: 'Verify Stripe webhook secret validation in staging sandbox', done: true },
  { text: 'Simulate network latency drops for optimistic UI rollback', done: true },
  { text: 'Review PR for Redis distributed lock race condition (SYNC-102)', done: true },
  { text: 'Discuss story point capacity with Sarah for upcoming Sprint 24.2', done: false },
];

const Planner: FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(sampleNotes);
  const [activeNoteId, setActiveNoteId] = useState('note-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(sampleChecklist);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleSelectNote = (id: string) => {
    setActiveNoteId(id);
  };

  const handleNewNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Untitled Scratchpad',
      category: 'General',
      tagColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      updated: 'Just now',
      pinned: false,
      preview: 'Empty note content...',
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateTitle = (newTitle: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNoteId ? { ...n, title: newTitle, updated: 'Just now' } : n))
    );
  };

  const handleDeleteNote = (id: string) => {
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (remaining.length > 0) {
      setActiveNoteId(remaining[0].id);
    }
  };

  const handleToggleChecklistItem = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 border border-slate-800 rounded-2xl h-[calc(100vh-120px)] shadow-sm">
      {/* Top Action Header */}
      <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-900/40 select-none">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Personal</span>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Scratchpad</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white mt-0.5">
            Developer Planner
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Save className="w-3.5 h-3.5 text-emerald-400" />
          <span>Auto-saved to cloud</span>
        </div>
      </div>

      {/* Two-Panel Body */}
      <div className="flex-1 flex overflow-hidden">
        <NotesExplorer
          notes={notes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          onNewNote={handleNewNote}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <MarkdownCanvas
          note={activeNote}
          onUpdateTitle={handleUpdateTitle}
          onDeleteNote={handleDeleteNote}
          checklist={checklist}
          onToggleChecklistItem={handleToggleChecklistItem}
        />
      </div>
    </div>
  );
};

export default Planner;