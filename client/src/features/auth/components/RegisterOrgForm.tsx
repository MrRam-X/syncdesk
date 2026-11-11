import { type FC, type FormEvent, useState } from "react";
import {
  Building2,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface RegisterOrgFormProps {
  onSuccessRegister?: (data: {
    orgName: string;
    slug: string;
    ownerEmail: string;
  }) => void;
  onNavigateToLogin?: () => void;
}

const RegisterOrgForm: FC<RegisterOrgFormProps> = ({
  onSuccessRegister = () => {},
  onNavigateToLogin = () => {},
}) => {
  const [orgName, setOrgName] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOrgNameChange = (val: string) => {
    setOrgName(val);
    setOrgSlug(val.toLowerCase().trim().replace(/\s+/g, "-"));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSuccessRegister({ orgName, slug: orgSlug, ownerEmail: email });
  };

  return (
    <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6 select-none">
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
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Organization Name */}
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
              onChange={(e) => handleOrgNameChange(e.target.value)}
              placeholder="e.g., Acme Corporation"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
            />
          </div>
        </div>

        {/* Workspace URL Slug */}
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

        {/* Owner Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Owner Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g., Sarah Vance"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
            />
          </div>
        </div>

        {/* Owner Work Email */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Owner Email (Root Account)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah.vance@acme.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Master Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition text-xs font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 mt-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <span>Create Organization & Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Login Switcher */}
      <div className="text-center text-xs text-slate-400 pt-1">
        Already registered an organization?{" "}
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="text-blue-400 font-semibold hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterOrgForm;