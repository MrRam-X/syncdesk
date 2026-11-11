import { type FC } from "react";
import { Bold, Italic, List, CheckSquare, Code, Trash2 } from "lucide-react";
import { type NoteItem } from "./NotesExplorer";

export interface ChecklistItem {
  text: string;
  done: boolean;
}

interface MarkdownCanvasProps {
  note: NoteItem;
  onUpdateTitle: (newTitle: string) => void;
  onDeleteNote: (noteId: string) => void;
  checklist: ChecklistItem[];
  onToggleChecklistItem: (idx: number) => void;
}

const MarkdownCanvas: FC<MarkdownCanvasProps> = ({
  note,
  onUpdateTitle,
  onDeleteNote,
  checklist,
  onToggleChecklistItem,
}) => {
  const handleDeleteClick = () => {
    onDeleteNote(note.id);
  };

  const completedCount = checklist.filter((i) => i.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Note Header & Formatting Toolbar */}
      <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/30 flex flex-wrap items-center justify-between gap-3 shrink-0 select-none">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${note.tagColor}`}
          >
            {note.category}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Last modified {note.updated}
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 border border-slate-800 rounded-lg p-1 bg-slate-900/60">
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <div className="h-3 w-px bg-slate-800 mx-0.5" />
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Checklist"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <div className="h-3 w-px bg-slate-800 mx-0.5" />
          <button
            type="button"
            onClick={handleDeleteClick}
            className="p-1 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition cursor-pointer"
            title="Delete Note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Note Content Canvas */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl">
        {/* Title Input */}
        <input
          type="text"
          value={note.title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          className="w-full bg-transparent text-2xl font-extrabold text-white focus:outline-none placeholder-slate-600 border-b border-transparent focus:border-slate-800 pb-2 transition"
        />

        {/* Interactive Standup Checklist */}
        <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase text-[10px] tracking-wider text-blue-400">
              Standup Action Items ({completedCount}/{checklist.length}{" "}
              Complete)
            </span>
            <span className="font-mono text-[11px]">
              {progressPercent}% Done
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {checklist.map((item, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => onToggleChecklistItem(idx)}
                  className="mt-0.5 accent-blue-500 rounded"
                />
                <span
                  className={
                    item.done ? "line-through text-slate-500" : "text-slate-200"
                  }
                >
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Code Snippet Block */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Signature Verification RFC snippet:</span>
            <span className="text-slate-500">TypeScript / Node.js</span>
          </div>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
            {`// Validate incoming payload with HMAC SHA256 timing-safe compare
const expectedSignature = crypto
  .createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET)
  .update(payload, 'utf8')
  .digest('hex');

if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
  throw new Error('Invalid signature. Potential replay attack blocked.');
}`}
          </pre>
        </div>

        {/* Freeform Writing Scratchpad */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Freeform Standup Thoughts & Next Actions
          </label>
          <textarea
            rows={5}
            defaultValue={`- Need to ask Marcus if Neon serverless autoscaling will be enabled during tomorrow's load test.\n- Confirm with Elena regarding OAuth2 refresh token expiration window (set to 7 days vs 14 days).\n- Clean up dnd-kit collision detection sensors for mobile touch devices.`}
            className="w-full bg-slate-900/30 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 leading-relaxed font-sans resize-none transition"
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownCanvas;