import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      "Unhandled runtime render error caught by ErrorBoundary:",
      error,
      errorInfo,
    );
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex-1 flex items-center justify-center min-h-[550px] p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/5">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Something went wrong loading this workspace
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                An unexpected render error occurred in this view. Your saved
                changes on the database are safe.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-rose-400 font-semibold">
                    {this.state.error.name}
                  </span>
                  <span>React Error Boundary</span>
                </div>
                <pre className="text-[10px] text-slate-500 font-mono overflow-x-auto leading-relaxed pt-1 max-h-28">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again (Reload)</span>
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-mono pt-2">
              Syncdesk Client v1.0 • Protected by React ErrorBoundary
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
