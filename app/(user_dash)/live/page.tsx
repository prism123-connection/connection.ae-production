"use client"
import ActionButton from '@/app/components/ui/ActionButton'
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { StreamCall, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { LivestreamView } from '@/app/components/dashboard/live/LivestreamView';

function LiveContent() {
  const [loading, setLoading] = useState(false)
  const [call, setCall] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const firstName = searchParams.get('fn');
  const lastName = searchParams.get('ln');

  
  useEffect(() => {
    const initLiveStream = async () => {
      const callId ='c1OtrKLeabun'
      // const callId = searchParams.get('callId');
      const productId = searchParams.get('productId'); // if needed
      const userId = searchParams.get('uid');

      if (!userId) {
        console.error("Missing userId");
        return;
      }
      if (!firstName) {
        console.error("Missing userId");
        return;
      }

      try {
        const res = await fetch(`/api/live-streams/go-live?userId=${userId}`);
        const { apiKey, token } = await res.json();
        console.log('apikey', apiKey, 'token', token)
        const user = { id: userId, name: firstName };
        const client = new StreamVideoClient({ apiKey, user, token });
        const call = client.call("livestream", callId!);
        await call.join({ create: true });
        console.log('get stream successfully connected')
        setClient(client);
        setCall(call);
      } catch (err) {
        console.error('Failed to join stream:', err);
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
              <LivestreamView call={call} />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div>Video still rendering</div>
        )}
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