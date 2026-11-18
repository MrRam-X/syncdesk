import { type FC } from "react";

const PlanwiseTenatsContainer: FC = () => {
  return (
    <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
        Tenancy Plan Breakdown
      </h2>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <span className="font-semibold text-purple-400">Enterprise Tier</span>
          <span className="font-mono font-bold text-white">2 Companies</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <span className="font-semibold text-blue-400">Growth Tier</span>
          <span className="font-mono font-bold text-white">1 Company</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <span className="font-semibold text-slate-400">Starter Tier</span>
          <span className="font-mono font-bold text-white">1 Company</span>
        </div>
      </div>
    </div>
  );
};

export default PlanwiseTenatsContainer;
