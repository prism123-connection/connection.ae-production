"use client"
import React from "react";
import { LiveBadge } from "./LiveBadge";
import { VerifiedBadge } from "./VerifiedBadge";
import { ViewerCount } from "./ViewerCount";
import { useRouter } from "next/navigation";
import CommonAvatar from "../../ui/CommonAvatar";


interface LiveStreamCardProps {
  thumbnailUrl: string;
  // overlayUrl: string;
  title: string;
  firstName: string;
  lastName: string;
  userRole?: string; 
  avatarUrl?: string;
  location: string;
  viewerCount: string;
  onclick: ()=>void; 
}

export const LiveStreamCard: React.FC<LiveStreamCardProps> = ({
  thumbnailUrl,
  // overlayUrl,
  title,
  firstName,
  lastName,
  location,
  viewerCount,
  onclick, 
  userRole,
  avatarUrl
}) => {
  const router = useRouter()
  // alert(userRole)
  return (
    <div onClick={onclick} className="shadow-[0px_5px_60px_rgba(0,0,0,0.08)] self-stretch min-w-60 w-[400px] my-auto cursor-pointer hover:shadow-xl transition-shadow duration-500 ">
      <div className="flex flex-col relative aspect-[1.695] w-full overflow-hidden rounded-[14px_14px_0px_0px]">
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute h-full w-full object-cover inset-0"
        />
      
      </div>
      <div className="bg-[rgba(254,254,254,1)]  flex  w-full flex-col font-normal justify-center px-5 py-5
      ! max-md:pl-5">
        <div className="flex flex-col items-stretch justify-center">
          <h2 className="text-black text-xl font-medium leading-none mb-5">{title}</h2>
      <CommonAvatar userRole={userRole}  avatarUrl={avatarUrl} firstName={firstName} lastName={lastName} displayName={true} verfied={true} />
        </div>
        <div className="flex items-center  justify-between mt-5">
          <LiveBadge />
          <ViewerCount count={viewerCount} />
        </div>
      </div>
    </div>
  );
};