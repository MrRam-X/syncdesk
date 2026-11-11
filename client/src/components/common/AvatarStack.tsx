export interface MemberAvatar {
  initials: string;
  name?: string;
  bg?: string;
}

interface AvatarProps {
  initials: string;
  bg?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const avatarSizes = {
  sm: "w-6 h-6 text-[9px]",
  md: "w-8 h-8 text-[11px]",
  lg: "w-10 h-10 text-sm font-bold",
};

export function Avatar({
  initials,
  bg = "bg-blue-600",
  size = "md",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`rounded-full text-white font-bold flex items-center justify-center shrink-0 ${avatarSizes[size]} ${bg} ${className}`}
    >
      {initials}
    </div>
  );
}

interface AvatarStackProps {
  members: MemberAvatar[];
  max?: number;
  size?: "sm" | "md";
}

const AvatarStack = ({
  members,
  max = 3,
  size = "sm",
}: AvatarStackProps) => {
  const hasOverflow = members.length > max + 1; // e.g. > 4 members
  const visibleMembers = hasOverflow ? members.slice(0, max) : members;
  const overflowCount = members.length - max;

  return (
    <div className="flex items-center -space-x-1.5 overflow-hidden select-none">
      {visibleMembers.map((member, idx) => (
        <Avatar
          key={idx}
          initials={member.initials}
          bg={member.bg || "bg-blue-600"}
          size={size}
          className="ring-2 ring-slate-900"
        />
      ))}

      {hasOverflow && (
        <div
          className={`${avatarSizes[size]} rounded-full bg-slate-800 text-slate-300 font-bold font-mono flex items-center justify-center ring-2 ring-slate-900 shrink-0`}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;