import { AlertTriangle, Trash2 } from "lucide-react";
import Modal from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete Permanently",
  cancelLabel = "Cancel",
  isDestructive = true,
}: ConfirmDialogProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      icon={
        <div className="p-1 text-rose-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-lg text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {isDestructive && <Trash2 className="w-3.5 h-3.5" />}
            <span>{confirmLabel}</span>
          </button>
        </>
      }
    >
      <div className="space-y-3 text-xs">
        <p className="text-slate-300 leading-relaxed">{message}</p>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400 font-mono">
          Action is irreversible. Cascade records on PostgreSQL will execute.
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
