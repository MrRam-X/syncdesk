import { type ReactNode } from "react";

export type StatColor = 'blue' | 'emerald' | 'purple' | 'rose' | 'amber' | 'sky';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string | ReactNode;
  icon: ReactNode;
  color?: StatColor;
}

const colorStyles: Record<StatColor, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
}: StatCardProps) => {
  return (
    <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between shadow-sm">
      <div className="space-y-0.5">
        <span className="text-xs text-slate-400 font-medium">{title}</span>
        <div className="text-2xl font-bold font-mono text-white tracking-tight">
          {value}
        </div>
        {subtitle && (
          <div className="text-[11px] text-slate-400">{subtitle}</div>
        )}
      </div>

      <div className={`p-2.5 rounded-xl border shrink-0 ${colorStyles[color]}`}>
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
