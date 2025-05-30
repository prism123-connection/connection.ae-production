"use client"
import React, { useEffect, useState } from "react";
import { LiveStreamCard } from "./LiveStreamCard";
import { getAllLiveStreams } from "@/lib/live-streams/streamHelper";
import { useRouter } from "next/navigation";

export const LiveStreamList = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [upcomingStreams, setUpcomingStreams] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter()

      const fetchStreams = async () => {
        try {
          const response = await getAllLiveStreams();
          const live = response.filter((stream: any) => stream.status === 'LIVE');
          const upcoming = response.filter((stream: any) => stream.status === 'LIVE_PENDING');
          setLiveStreams(live);
          setUpcomingStreams(upcoming);
        } catch (error) {
          console.log(error)
          setError(true);
        } finally {
          setLoading(false);
        }
      };

        useEffect(() => {
          fetchStreams();
        }, []);
    
  return (
    <section className="bg-white flex flex-col overflow-hidden justify-center px-2.5  mt-10">
      {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        )
      }
      {
        liveStreams.length > 0 && (
          <h1 className="self-stretch text-3xl text-black font-normal leading-none">
          Live Streams
        </h1>
        )
      }

<div className="flex items-center justify-between gap-10 flex-wrap mt-10 max-md:max-w-full max-md:mt-10 ">
   
   

   {liveStreams.length > 0 && 
   liveStreams.map((stream: {
     product?: {
       name?: string;
       productImages?: { url?: string }[];
       id?: string; 
     };
     user?: {
       firstName?: string;
       lastName?: string;
       role?: string;
       avatarUrl?:string;
     };
     id:string; 
     userId:string; 
   }, index: number) => (
     <LiveStreamCard
        onclick={()=>router.push(`/live-stream?callId=${stream.id}&userId=${stream.userId}&productId=${stream.product?.id}`)}
       key={index}
       thumbnailUrl={stream.product?.productImages?.[0]?.url || ''}
       title={stream.product?.name || 'Untitled'}
       firstName={`${stream.user?.firstName || ''}`}
       lastName={`${stream.user?.lastName || ''}`}
       userRole={`${stream.user?.role || ''}`}
       avatarUrl={`${stream.user?.avatarUrl || ''}`}

       location=""
       viewerCount="No view yet"
     />
   ))
   
   }
 </div>

      {
        upcomingStreams.length > 0 && (
          <h1 className="self-stretch text-3xl text-black font-normal leading-none">
          Upcomming Streams
        </h1>
        )
      }
   
      <div className="flex items-center justify-between gap-10 flex-wrap mt-10 max-md:max-w-full max-md:mt-10 ">
   
        {upcomingStreams.length > 0 && 
        upcomingStreams.map((stream: {
          product?: {
            name?: string;
            productImages?: { url?: string }[];
            id?: string; 
          };
          user?: {
            firstName?: string;
            lastName?: string;
            role?: string;
            avatarUrl?:string;
          };
          id:string; 
          userId:string; 
        }, index: number) => (
          <LiveStreamCard
            onclick={()=>router.push(`/live-stream?callId=${stream.id}&userId=${stream.userId}&productId=${stream.product?.id}`)}
            key={index}
            thumbnailUrl={stream.product?.productImages?.[0]?.url || ''}
            title={stream.product?.name || 'Untitled'}
            firstName={`${stream.user?.firstName || ''}`}
            lastName={`${stream.user?.lastName || ''}`}
            userRole={`${stream.user?.role || ''}`}
            avatarUrl={`${stream.user?.avatarUrl || ''}`}
            location=""
            viewerCount="No view yet"
          />
        ))
        
        }
      </div>
    </section>
  );
};
