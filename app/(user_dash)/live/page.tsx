"use client"
import ActionButton from '@/app/components/ui/ActionButton'
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { StreamCall, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { LivestreamView } from '@/app/components/dashboard/live/LivestreamView';
import LiveChat from '@/app/components/dashboard/live-stream/Chat';

function LiveContent() {
  const [loading, setLoading] = useState(false)
  const [call, setCall] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const firstName = searchParams.get('fn');
  const lastName = searchParams.get('ln');
  const callId = searchParams.get('callId');
  const productId = searchParams.get('productId'); // if needed
  const userId = searchParams.get('userId');

  
  useEffect(() => {
    const initLiveStream = async () => {
      setLoading(true); // Start loading
  
      if (!userId) {
        console.error("Missing userId");
        setLoading(false);
        return;
      }
  
      if (!firstName) {
        console.error("Missing firstName");
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch(`/api/live-streams/go-live?userId=${userId}&callId=${callId}`);
        const { apiKey, token } = await res.json();
        const user = { id: userId, name: firstName };
        const client = new StreamVideoClient({ apiKey, user, token });
        const call = client.call("livestream", callId!);
        await call.join({ create: true });
        console.log('Stream successfully connected');
        setClient(client);
        setCall(call);
      } catch (err) {
        console.error('Failed to join stream:', err);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    initLiveStream();
  }, []);

  return (
    <div>
      <h1>Welcome to Live Section</h1>
      <div className='w-full  '>
      {call && client ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <LivestreamView callId={callId || ''} userId={userId || ''} call={call} />
            </StreamCall>
          </StreamVideo>
        ) : (
              <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
                <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
              </div>
        )}
      </div>
         <div className="fixed bottom-5 right-5">
            <LiveChat streamId={callId || ''} />
          </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Live Page...</div>}>
      <LiveContent/>
    </Suspense>
  );
}