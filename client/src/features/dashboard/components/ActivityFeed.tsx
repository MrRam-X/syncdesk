import { type FC } from "react";
import {
  Rocket,
  Bookmark,
  MessageSquare,
  Milestone,
  CheckSquare,
} from "lucide-react";

export interface ActivityItem {
  avatar: string;
  bg: string;
  user: string;
  action: string;
  item: string;
  detail: string;
  time: string;
  iconType: "rocket" | "bookmark" | "message" | "milestone" | "check";
  color: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
}

const defaultActivities: ActivityItem[] = [
  {
    avatar: "SC",
    bg: "bg-emerald-600",
    user: "Sarah Chen",
    action: "moved task",
    item: "SYNC-111",
    detail: "to Deployed sandbox",
    time: "12m ago",
    iconType: "rocket",
    color: "text-purple-400",
  },
  {
    avatar: "AR",
    bg: "bg-blue-600",
    user: "Alex Rivera",
    action: "updated description and criteria on story",
    item: "SYNC-101",
    detail: "Integrate Stripe webhook verification",
    time: "45m ago",
    iconType: "bookmark",
    color: "text-blue-400",
  },
  {
    avatar: "JD",
    bg: "bg-purple-600",
    user: "John Doe",
    action: "commented on task",
    item: "MOB-42",
    detail: '"FaceID entitlements configured for sandbox build"',
    time: "2h ago",
    iconType: "message",
    color: "text-sky-400",
  },
  {
    avatar: "MV",
    bg: "bg-amber-600",
    user: "Marcus Vance",
    action: "planned new iteration",
    item: "Sprint 24.2",
    detail: "Target dates: Nov 4 – Nov 18",
    time: "4h ago",
    iconType: "milestone",
    color: "text-purple-400",
  },
  {
    avatar: "ER",
    bg: "bg-slate-700",
    user: "Elena Rostova",
    action: "verified and closed",
    item: "SYNC-75",
    detail: "Create PostgreSQL database schema",
    time: "Yesterday",
    iconType: "check",
    color: "text-emerald-400",
  },
];

const ActivityFeed: FC<ActivityFeedProps> = ({
  activities = defaultActivities,
}) => {
  const getIcon = (type: ActivityItem["iconType"], color: string) => {
    switch (type) {
      case "rocket":
        return <Rocket className={`w-3.5 h-3.5 ${color}`} />;
      case "bookmark":
        return <Bookmark className={`w-3.5 h-3.5 ${color}`} />;
      case "message":
        return <MessageSquare className={`w-3.5 h-3.5 ${color}`} />;
      case "milestone":
        return <Milestone className={`w-3.5 h-3.5 ${color}`} />;
      default:
        return <CheckSquare className={`w-3.5 h-3.5 ${color}`} />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Recent Workspace Activity
        </h2>
        <span className="text-[11px] text-slate-500 font-mono">
          Live updates from team
        </span>
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden shadow-sm">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="p-3.5 hover:bg-slate-900/50 transition flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={`w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${activity.bg}`}
              >
                {activity.avatar}
              </div>

              <div className="truncate">
                <span className="font-semibold text-slate-200">
                  {activity.user}
                </span>{" "}
                <span className="text-slate-400">{activity.action}</span>{" "}
                <span className="font-mono text-blue-400 font-semibold">
                  {activity.item}
                </span>{" "}
                <span className="text-slate-400 hidden sm:inline">
                  ({activity.detail})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pl-3">
              {getIcon(activity.iconType, activity.color)}
              <span className="text-[11px] text-slate-500 font-mono">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
