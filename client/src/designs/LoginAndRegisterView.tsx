import { useState } from 'react';
import {
  Building2,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function LoginAndRegisterView() {
  // Toggle between 'login' and 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states for preview
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgSlug, setOrgSlug] = useState('');

  // Quick Demo Role Autofill (Super useful for recruiters testing your portfolio)
  const handleQuickDemo = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('DemoPassword123!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* ========================================================= */}
      {/* MINIMAL TOP BAR                                           */}
      {/* ========================================================= */}
      <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5 font-bold text-base tracking-tight text-white select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black">
            S
          </div>
          <span className="text-lg">Syncdesk</span>
        </div>

        {/* View Switcher Pill for Inspection */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          <button
            onClick={() => setAuthMode('login')}
            className={`px-3 py-1 rounded-md transition cursor-pointer ${
              authMode === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login View
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`px-3 py-1 rounded-md transition cursor-pointer ${
              authMode === 'register'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Org (Owner)
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN AUTH CONTAINER                                       */}
      {/* ========================================================= */}
      <div className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-md space-y-6">
          
          {/* ------------------------------------------------------- */}
          {/* VIEW 1: COMMON LOGIN FORM (All Role Types)              */}
          {/* ------------------------------------------------------- */}
          {authMode === 'login' && (
            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Header */}
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

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Logged in as: ${email}`);
                }}
                className="space-y-4 text-xs"
              >
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.rivera@acme.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Password
                    </label>
                    <a href="#forgot" className="text-[11px] text-blue-400 hover:text-blue-300">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-9 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Primary Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Sign in to Syncdesk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick Demo Credentials Autofill (Portfolio Advantage) */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="block text-[10px] uppercase font-bold text-slate-500 text-center tracking-wider">
                  Quick Demo Role Autofill
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('alex.rivera@acme.com')}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-950 text-slate-300 hover:text-blue-400 transition text-left cursor-pointer truncate"
                  >
                    <span className="font-semibold block truncate">Alex Rivera</span>
                    <span className="text-[10px] text-slate-500 font-mono">Supervisor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('owner@acme.com')}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-950 text-slate-300 hover:text-blue-400 transition text-left cursor-pointer truncate"
                  >
                    <span className="font-semibold block truncate">Sarah Vance</span>
                    <span className="text-[10px] text-purple-400 font-mono">Org Owner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('sarah.chen@acme.com')}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-950 text-slate-300 hover:text-blue-400 transition text-left cursor-pointer truncate"
                  >
                    <span className="font-semibold block truncate">Sarah Chen</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Coordinator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin@syncdesk.internal')}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-blue-500/50 hover:bg-slate-950 text-slate-300 hover:text-blue-400 transition text-left cursor-pointer truncate"
                  >
                    <span className="font-semibold block truncate">System Admin</span>
                    <span className="text-[10px] text-rose-400 font-mono">Super Admin</span>
                  </button>
                </div>
              </div>

              {/* Bottom Switcher */}
              <div className="text-center text-xs text-slate-400 pt-1">
                Are you an Organization Owner?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                  Register your company
                </button>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------- */}
          {/* VIEW 2: ORGANIZATION ONBOARDING & OWNER REGISTRATION    */}
          {/* ------------------------------------------------------- */}
          {authMode === 'register' && (
            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Header */}
              <div className="space-y-1.5 text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Owner Onboarding</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Create your organization
                </h1>
                <p className="text-xs text-slate-400">
                  Register your company workspace and create your Owner credentials
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Registered ${orgName} with Owner: ${email}`);
                }}
                className="space-y-4 text-xs"
              >
                {/* 1. Organization Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Organization Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => {
                        setOrgName(e.target.value);
                        setOrgSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                      }}
                      placeholder="e.g., Acme Corporation"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
                    />
                  </div>
                </div>

                {/* 2. Organization Slug / URL */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Workspace URL Identifier
                  </label>
                  <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 overflow-hidden text-xs">
                    <span className="px-3 py-2.5 bg-slate-900 border-r border-slate-800 text-slate-500 font-mono text-[11px]">
                      syncdesk.app/
                    </span>
                    <input
                      type="text"
                      required
                      value={orgSlug}
                      onChange={(e) => setOrgSlug(e.target.value)}
                      placeholder="acme-corp"
                      className="w-full bg-transparent px-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="h-px bg-slate-800 my-2" />

                {/* 3. Owner Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Owner Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sarah Vance"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
                    />
                  </div>
                </div>

                {/* 4. Owner Work Email */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Owner Email (Login Account)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="sarah.vance@acme.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
                    />
                  </div>
                </div>

                {/* 5. Password */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Master Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Minimum 8 characters"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 mt-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Create Organization & Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Bottom Switcher */}
              <div className="text-center text-xs text-slate-400 pt-1">
                Already registered an organization?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* MINIMAL FOOTER                                            */}
      {/* ========================================================= */}
      <footer className="h-12 border-t border-slate-800/80 px-6 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
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