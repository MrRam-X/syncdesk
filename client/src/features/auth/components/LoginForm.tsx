import { type FC } from "react";
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import useLoginForm from "../hooks/useLoginForm";
import { ButtonSpinner } from "@/components/feedback/Skeletons";

const LoginForm: FC = () => {
  const {
    isLoading,
    loginFormInput,
    showPassword,
    onLoginFormInputDataChange,
    handleShowPasswordIconClick,
    handleQuickDemo,
    handleSubmit,
    handleNavigateToRegister,
  } = useLoginForm();

  return (
    <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6 select-none">
      <div className="space-y-1.5 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Work OS</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Sign in to your workspace
        </h1>
        <p className="text-xs text-slate-400">
          Enter your organization email and password to access your boards
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Work Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              name="email"
              value={loginFormInput.email}
              onChange={onLoginFormInputDataChange}
              placeholder="owner@acme.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <a
              href="#forgot"
              className="text-[11px] text-blue-400 hover:text-blue-300"
            >
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={loginFormInput.password}
              onChange={onLoginFormInputDataChange}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-9 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs font-mono"
            />
            <button
              type="button"
              onClick={handleShowPasswordIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          {isLoading ? (
            <>
              <ButtonSpinner className="w-3.5 h-3.5"/>
              <span>Signing in...</span>
            </>
          ) : <>
              <span>Sign in to Syncdesk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>}
        </button>
      </form>

      {/* Quick Demo Credentials Autofill */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <span className="block text-[10px] uppercase font-bold text-slate-500 text-center tracking-wider">
          Quick Demo Role Autofill
        </span>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => handleQuickDemo("owner@acme.com")}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-950 text-slate-300 hover:text-blue-400 transition text-left cursor-pointer truncate"
          >
            <span className="font-semibold block truncate">Sarah Vance</span>
            <span className="text-[10px] text-purple-400 font-mono">
              Org Owner
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo("alex.rivera@acme.com")}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-950 text-slate-300 hover:text-blue-400 transition text-left cursor-pointer truncate"
          >
            <span className="font-semibold block truncate">Alex Rivera</span>
            <span className="text-[10px] text-blue-400 font-mono">
              Supervisor
            </span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 pt-1">
        Are you an Organization Owner?{" "}
        <button
          type="button"
          onClick={handleNavigateToRegister}
          className="text-blue-400 font-semibold hover:underline cursor-pointer"
        >
          Register your company
        </button>
      </div>
    </div>
  );
};

export default LoginForm;