import CommonAvatar from "@/app/components/ui/CommonAvatar";
import { StreamActions } from "./StreamActions";
import { StreamStats } from "./StreamStats";
import { StreamStatus } from "./StreamStatus";
import { UserAvatar } from "./UserAvatar";
import { VerifiedBadge } from "./VarifiedBadge";


interface StreamCardProps {
  thumbnailUrl: string;
  title: string;
  firstName: string;
  lastName: string;
  userRole?:string;
  avatarUrl?: string;
  location: string;
  date: string;
  time?: string;
  viewerCount?: string;
  status?: "scheduled" | "live" | "ended";
  isUpcoming?: boolean;
  onClick: ()=> void;
}

export const StreamCard = ({
  thumbnailUrl,
  title,
  firstName,
  lastName,
  userRole, 
  avatarUrl,
  location,
  date,
  time,
  viewerCount,
  status,
  isUpcoming = false,
  onClick
}: StreamCardProps) => {
  return (
    <article onClick={onClick} className="flex flex-col border overflow-hidden rounded-[14.4px] border-[#D7D7D7] bg-white max-w-[350px] max-sm:max-w-[100%] shadow-md cursor-pointer">
      <div className="relative h-[209px]">
        <img
          src={thumbnailUrl}
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
            <CommonAvatar firstName={firstName} lastName={lastName} userRole={userRole} avatarUrl={avatarUrl} displayName={true} verfied={true}/>
          </div>
        </div>
        <StreamStats date={date} time={time || ''} viewerCount={viewerCount} />
        {isUpcoming && (
        <StreamActions isUpcoming={isUpcoming} />
        )}
      </div>
    </article>
  );
};
