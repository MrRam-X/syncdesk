import { SingleCardListSkeleton } from "@/components/feedback/Skeletons";
import { type FC } from "react";
import type { AdminDashboardRecentOrgs } from "../../hooks/useAdmin";

export interface OrgSummaryItem {
  id: string;
  name: string;
  ownerName: string;
  created: string;
}

interface RecentTenantsContainerProps {
  isLoading: boolean;
  recentOrgs: AdminDashboardRecentOrgs[];
  onViewAllOrgs: () => void;
}

const RecentTenantsContainer: FC<RecentTenantsContainerProps> = ({
  isLoading,
  recentOrgs,
  onViewAllOrgs,
}) => {
  return (
    <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Recent Tenant Onboardings
        </h2>
        <button
          type="button"
          onClick={onViewAllOrgs}
          className="text-xs text-rose-400 hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      {isLoading ? (
        <SingleCardListSkeleton rows={4} />
      ) : (
        <div className="space-y-2 text-xs">
          {recentOrgs.map((org) => (
            <div
              key={org.id}
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-white">{org.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Contact: info@{org.slug}.com
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                {org.createdAt}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTenantsContainer;