import { Server, X } from "lucide-react";

interface ColdStartBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ColdStartBanner({ isVisible, onClose }: ColdStartBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300 select-none">
      <div className="p-3 bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md text-xs">
        <div className="relative">
          <Server className="w-4 h-4 text-blue-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute -top-0.5 -right-0.5 animate-ping" />
        </div>

        <div className="space-y-0.5">
          <div className="font-semibold text-slate-200">
            Waking up free cloud instance...
          </div>
          <div className="text-[11px] text-slate-400">
            Connecting to Neon DB & Render (takes ~3s on first load).
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800 transition cursor-pointer ml-1"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
