import React, { useEffect, useState } from 'react'
import { SectionTitle } from './SectionTitle'
import { StreamCard } from './StreamCard'
import { getAllLiveStreams } from '@/lib/live-streams/streamHelper';
import { useRouter } from 'next/navigation';

function SellerStreams() {
  
    const [upcomingStreams, setUpcomingStreams] = useState([]);
    const [endedStreams, setEndedStreams] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter(); 

    const fetchStreams = async () => {
      console.log('running fun')
      try {
        const response = await getAllLiveStreams();
        const ended = response.filter((stream: any) => stream.status === 'ENDED');
        const upcoming = response.filter((stream: any) => stream.status === 'LIVE_PENDING');
        setEndedStreams(ended);
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

   
   
      
        const goToLive = (firstName: string, lastName: string, callId: string, productId: string, userId:string) => {
          router.push(`/live?callId=${callId}&productId=${productId}&fn=${firstName}&ln=${lastName}&userId=${userId}`)
        }
        
  return (
    <div className='w-full flex flex-col gap-5 '>
    <h1 className="text-2xl font-semibold ">Your live streams</h1>
    <span className="text-base  mb-5">Find all your live streams here</span>

    <div className=" w-full ">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <SectionTitle title="Upcoming live streams" />
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        )
      }
      {
        upcomingStreams.length === 0 && !loading && (
          <span>No upcoming Streams</span>
        )
      }
               {upcomingStreams.length > 0 && 
                      upcomingStreams.map((stream: {
                        product?: {
                          name?: string;
                          productImages?: { url?: string }[];
                          productId?: string
                        };
                        user?: {
                          firstName?: string;
                          lastName?: string;
                          userId?:string; 
                          role? :string; 
                          avatarUrl?: string;
                        };
                        goLiveAt: string;
                        id : string; 
                        userId:string
                      }, index: number) => (
                        <StreamCard
                          onClick={()=>goToLive(stream.user?.firstName || '', stream.user?.lastName || '', stream.id, stream.product?.productId || '', stream.userId || '')}
                          key={index}
                          thumbnailUrl={stream.product?.productImages?.[0]?.url || ''}
                          title={stream.product?.name || 'Untitled'}
                          firstName={`${stream.user?.firstName || ''}`}
                          lastName={`${stream.user?.lastName || ''}`}
                          userRole={`${stream.user?.role || ''}`}
                          avatarUrl={`${stream.user?.avatarUrl || ''}`}
                          location=""
                          date={new Date(stream.goLiveAt).toLocaleDateString()}
                          time={stream.goLiveAt ? new Date(stream.goLiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          status={'scheduled'}
                          isUpcoming={true}
                          viewerCount=""
                        />
                      ))
                      
                      }
            </div>
          </section>

          <hr className="border my-10 border-[#D5D5D5]" />

          <section className="flex flex-col gap-4">
            <SectionTitle title="Past live streams" />
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        )
      }
      {
        endedStreams.length === 0 && (
          <span>You haven't Streamed yet</span>
        )
      }
            {endedStreams.length > 0 && 
                      endedStreams.map((stream: {
                        product?: {
                          name?: string;
                          productImages?: { url?: string }[];
                        };
                        user?: {
                          firstName?: string;
                          lastName?: string;
                          role? :string; 
                          avatarUrl?: string;
                        };
                      }, index: number) => (
                        <StreamCard
                          onClick={()=>null}
                          key={index}
                          thumbnailUrl={stream.product?.productImages?.[0]?.url || ''}
                          title={stream.product?.name || 'Untitled'}
                          firstName={`${stream.user?.firstName || ''}`}
                          lastName={`${stream.user?.lastName || ''}`}
                          userRole={`${stream.user?.role || ''}`}
                          avatarUrl={`${stream.user?.avatarUrl || ''}`}
                          location=""
                          date={''}
                          time=''
                          status={'ended'}
                          isUpcoming={false}
                          viewerCount=""
                        />
                      ))
                      
                      }
            </div>
          </section>
        </div>
      </div>

</div>
  )
}

export default SellerStreams