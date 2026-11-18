import StatCard from "@/components/common/StatCard";
import { CardGridSkeleton } from "@/components/feedback/Skeletons";
import { Building2, Users, Briefcase, Server } from "lucide-react";
import { type FC } from "react";

interface OperationsStatCardContainerProps {
  isLoading: boolean;
  totalOrgs: number;
  totalAccounts: number;
  totalProjects: number;
}

const OperationsStatCardContainer: FC<OperationsStatCardContainerProps> = ({
  isLoading,
  totalOrgs,
  totalAccounts,
  totalProjects,
}) => {
  if (isLoading) {
    return <CardGridSkeleton count={4} columns={4} />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Enterprises"
        value={`${totalOrgs} Tenancies`}
        subtitle={
          <span className="text-emerald-400 font-medium">
            +2 joined this month
          </span>
        }
        icon={<Building2 className="w-5 h-5" />}
        color="blue"
      />

      <StatCard
        title="Worldwide Users"
        value={`${totalAccounts} Accounts`}
        subtitle="Active across 106 projects"
        icon={<Users className="w-5 h-5" />}
        color="emerald"
      />

      {/* <StatCard
        title="PostgreSQL (Neon)"
        value="Connected"
        subtitle={
          <span className="text-emerald-400 font-medium">
            SSL Pool • 0.12 GB / 0.5 GB
          </span>
        }
        icon={<Database className="w-5 h-5" />}
        color="purple"
      /> */}

      <StatCard
        title="Total Projects"
        value={`${totalProjects} projects`}
        subtitle={
          <span className="text-emerald-400 font-medium">
            10 newly created
          </span>
        }
        icon={<Briefcase className="w-5 h-5" />}
        color="blue"
      />

      <StatCard
        title="Express Server"
        value="Live (Render)"
        subtitle="Ping cron keep-alive 24/7"
        icon={<Server className="w-5 h-5" />}
        color="rose"
      />
    </div>
  );
};

export default OperationsStatCardContainer;