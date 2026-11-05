import { useEffect, useState } from "react";
import {
  Activity,
  Database,
  Server,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { HealthResponse } from "@syncdesk/shared";

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${apiUrl}/api/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: HealthResponse) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Syncdesk Engine
            </h1>
            <p className="text-xs text-slate-400">
              Phase 0 • Smoke Test Verification
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Frontend Status */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium">Frontend Client</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Ready (Vite)
            </span>
          </div>

          {/* Backend Status */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium">Express API</span>
            </div>
            {loading ? (
              <span className="text-xs text-slate-400 animate-pulse">
                Checking...
              </span>
            ) : error ? (
              <span className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
                <AlertCircle className="w-4 h-4" /> Offline
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Live
              </span>
            )}
          </div>

          {/* Database Status */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium">PostgreSQL (Neon)</span>
            </div>
            {loading ? (
              <span className="text-xs text-slate-400 animate-pulse">
                Checking...
              </span>
            ) : health?.status === "ok" ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
                <AlertCircle className="w-4 h-4" /> Disconnected
              </span>
            )}
          </div>
        </div>

        {health && (
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            DB Details: {health.database}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
