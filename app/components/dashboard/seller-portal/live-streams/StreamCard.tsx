import { StreamActions } from "./StreamActions";
import { StreamStats } from "./StreamStats";
import { StreamStatus } from "./StreamStatus";
import { UserAvatar } from "./UserAvatar";
import { VerifiedBadge } from "./VarifiedBadge";


interface StreamCardProps {
  imageUrl: string;
  title: string;
  username: string;
  userInitials: string;
  location: string;
  date: string;
  time?: string;
  viewerCount?: number;
  status?: "scheduled" | "live" | "ended";
  isUpcoming?: boolean;
}

export const StreamCard = ({
  imageUrl,
  title,
  username,
  userInitials,
  location,
  date,
  time,
  viewerCount,
  status,
  isUpcoming = false,
}: StreamCardProps) => {
  return (
    <article className="flex flex-col border overflow-hidden rounded-[14.4px] border-[#D7D7D7] bg-white max-w-[350px] max-sm:max-w-[100%] shadow-md">
      <div className="relative h-[209px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover "
        />
        {status && (
          <div className="absolute right-4 top-4">
            <StreamStatus status={status} />
          </div>
        )}
      </div>
      <div className=" pt-4 pb-8 px-[22.8px]">
        <div className="flex flex-col gap-4">
          <h3 className="text-black text-2xl leading-9">{title}</h3>
          <div className="flex items-center gap-2">
            <UserAvatar initials={userInitials} />
            <div className="flex flex-col gap-[3.6px]">
              <div className="flex items-center gap-3">
                <span className="text-black text-[16.8px]">{username}</span>
                <VerifiedBadge />
              </div>
              <span className="text-[rgba(0,0,0,0.50)] text-[16.8px]">
                {location}
              </span>
            </div>
          </div>
        </div>
        <StreamStats date={date} time={'4:44 PM'} viewerCount={viewerCount} />
        {isUpcoming && (
        <StreamActions isUpcoming={isUpcoming} />
        )}
      </div>
    </article>
  );
};
