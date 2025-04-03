"use client"
import React from "react";
import { LiveBadge } from "./LiveBadge";
import { VerifiedBadge } from "./VerifiedBadge";
import { ViewerCount } from "./ViewerCount";
import { useRouter } from "next/navigation";


interface LiveStreamCardProps {
  thumbnailUrl: string;
  overlayUrl: string;
  title: string;
  streamerName: string;
  streamerAvatar: string;
  location: string;
  viewerCount: string;
}

export const LiveStreamCard: React.FC<LiveStreamCardProps> = ({
  thumbnailUrl,
  overlayUrl,
  title,
  streamerName,
  streamerAvatar,
  location,
  viewerCount,
}) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push('/live-stream')} className="shadow-[0px_5px_60px_rgba(0,0,0,0.08)] self-stretch min-w-60 w-[400px] my-auto cursor-pointer hover:shadow-xl transition-shadow duration-500 ">
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
          <h2 className="text-black text-xl font-medium leading-none">{title}</h2>
          <div className="flex items-center gap-5 text-base mt-5">
            <img
              src={streamerAvatar}
              alt={streamerName}
              className="aspect-[1] object-contain w-10 self-stretch shrink-0 my-auto rounded-[50%]"
            />
            <div className="self-stretch flex flex-col items-stretch justify-center">
              <div className="flex items-center gap-5 text-black justify-center">
                <div className="self-stretch my-auto">{streamerName}</div>
                <VerifiedBadge />
              </div>
              <div className="text-black/50 text-sm mt-1">{location}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center  justify-between mt-5">
          <LiveBadge />
          <ViewerCount count={viewerCount} />
        </div>
      </div>
    </div>
  );
};