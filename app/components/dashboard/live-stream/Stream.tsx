"use client"
import React, { Suspense, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { CustomLivestreamPlayer } from "./CustomLivestreamPlayer";
import { useRouter, useSearchParams } from "next/navigation";
import LiveChat from "./Chat";

interface streamProps {

}

const StreamContent: React.FC<streamProps> = ({ }) => {
    const [loading, setLoading] = useState(false)
    const [call, setCall] = useState<any>(null);
    const [client, setClient] = useState<any>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    // const firstName = searchParams.get('fn');
    // const lastName = searchParams.get('ln');
    const callId = searchParams.get('callId');
    const productId = searchParams.get('productId'); // if needed
    const userId = searchParams.get('userId');
  
  

  useEffect(() => {
    const initWatchStream = async () => {
      setLoading(true); // Start loading
  
      if (!userId) {
        console.error("Missing userId");
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch(`/api/live-streams/watch-stream?userId=${userId}&callId=${callId}`); 
        const { apiKey } = await res.json();
  
        if (!apiKey) {
          throw new Error("API key not received");
        }
  
        const user = {
          type: "anonymous" as const, // this is important to satisfy the type check
        };
        const client = new StreamVideoClient({ apiKey, user });
        const call = client.call("livestream", callId!);
        await call.join();
        console.log("Stream successfully joined as viewer");
  
        setClient(client);
        setCall(call);
      } catch (err) {
        console.error("Failed to join stream:", err);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    initWatchStream();
  }, []);


  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center mt-2 flex-col'>
    <div className="rounded-xl overflow-hidden border-0 shadow-sm w-full h-[100%]  text-black flex items-center justify-center">
    <StreamVideo client={client}>
       <CustomLivestreamPlayer callType="livestream" callId={callId || ''}  />
    </StreamVideo>
    <div className="fixed bottom-5 right-5">
      <LiveChat streamId={callId || ''} />
    </div>
    </div>
    </div>
  );
};


export default function Stream() {
  return (
    <Suspense fallback={<div>Loading Live Page...</div>}>
      <StreamContent/>
    </Suspense>
  );
}