import { type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  headerAction?: ReactNode;
}

const AuthLayout = ({ children, headerAction }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Minimal Branding Header */}
      <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/70 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5 font-bold text-base tracking-tight text-white select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
            S
          </div>
          <span className="text-lg">Syncdesk</span>
        </div>

        {headerAction && <div>{headerAction}</div>}
      </header>

      {/* Main Centered Form Card Canvas */}
      <div className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Minimal Footer */}
      <footer className="h-12 border-t border-slate-800 px-6 flex items-center justify-between text-[11px] text-slate-500 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>All cloud systems operational</span>
        </div>
        <div>
          <span>Syncdesk Enterprise v1.0 • Portfolio Release</span>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout
