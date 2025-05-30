import { useCallback, useEffect, useRef, useState } from "react";
import {
  Call,
  ParticipantView,
  StreamCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import LiveChat from "./Chat";

interface CustomLivestreamPlayerProp {
    callType:string;
    callId:string;
  }

// export const CustomLivestreamPlayer: React.FC<CustomLivestreamPlayerProp> = ( { callType, callId }) => {
  
//   const client = useStreamVideoClient();
//   const [call, setCall] = useState<Call | undefined>(undefined);
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null);


//   async function connectCall() {
//     if (!client || loading) return;
  
//     setLoading(true);
//     setError(null);
  
//     const myCall = client.call(callType, callId);
//     setCall(myCall);
  
//     try {
//       await myCall.join();
//     } catch (err) {
//       console.error("Failed to join call", err);
//     } finally {
//       setLoading(false);
//     }
//   }

// useEffect(() => {
//   connectCall();

//   return () => {
//     if (call) {
//       call.leave().catch((e) => {
//         console.error("Failed to leave call", e);
//       });
//     }
//     setCall(undefined);
//   };
// }, []);


//   return (
//     <StreamCall call={call}>
//       <CustomLivestreamLayout loading={loading} connectCall={connectCall} />
//     </StreamCall>
//   );
// };

// const CustomVideoPlaceHolder = () =>{
//   return <>
//   loading ... 
//   </>
// }

// interface CustomLivestreamLayoutProps {
//     loading: boolean;
//     connectCall: () => Promise<void>;
//   }

//   const CustomLivestreamLayout = ({ loading, connectCall }: CustomLivestreamLayoutProps) => {
//   const { useParticipants, useParticipantCount } = useCallStateHooks();
//   const participantCount = useParticipantCount();
//   const [firstParticipant] = useParticipants();
//   return (
//     <div className="bg- flex flex-col w-full h-full items-center justify-center" >
//       {
//         !firstParticipant && (
//           <button onClick={connectCall} className="px-10 py-2 bg-black rounded-sm text-white cursor-pointer"> Retry </button>
//         )
//       }
//       {loading && 
//       <span>Live stream connecting...</span>
//       }
//       {/* <div>Live: {participantCount}</div> */}
//       {firstParticipant ? (
//         <ParticipantView  VideoPlaceholder={CustomVideoPlaceHolder} participant={firstParticipant} />
//       ) : (
//         <div>The host hasn't joined yet</div>
//       )}
//     </div>
//   );
// };

export const CustomLivestreamPlayer: React.FC<CustomLivestreamPlayerProp> = ({ callType, callId }) => {
    const client = useStreamVideoClient();
    const [call, setCall] = useState<Call | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    async function connectCall() {
      if (!client || loading) return;
  
      setLoading(true);
      setError(null);
  
      const myCall = client.call(callType, callId);
      console.log(myCall)
      setCall(myCall);
        console.log('stream successfully joined')
      try {
        await myCall.join();
      } catch (err) {
        console.error("Failed to join call", err);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      connectCall();
  
      return () => {
        if (call) {
          call.leave().catch((e) => {
            console.error("Failed to leave call", e);
          });
        }
        setCall(undefined);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return call ? (
      <StreamCall call={call}>
        <LivestreamContent loading={loading} connectCall={connectCall}  callId={callId}/>
      </StreamCall>
    ) : (
      <div>
         {
            !loading ? 
            <div className="flex flex-col gap-5">
            <div>The host hasn't joined yet</div>
            <button
              onClick={connectCall}
              className="px-10 py-2 bg-black rounded-sm text-white cursor-pointer"
            >
              Retry
            </button>
            </div>
            :
            <div className="w-full rounded-lg flex p-16 flex-col px-8 items-end">
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
         }
      </div>
    );
  };
  
  interface LivestreamContentProp {
    loading: boolean;
    connectCall: () => Promise<void>;
    callId :string
  }
  
  const LivestreamContent: React.FC<LivestreamContentProp> = ({ loading, connectCall, callId }) => {
    const { useParticipants, useParticipantCount } = useCallStateHooks();
    const participantCount = useParticipantCount();
    const [firstParticipant] = useParticipants();
  
    return (
      <div className={`flex  w-full h-full items-center justify-center   ${!firstParticipant ? 'flex-col' : 'flex-row gap-5'}`}>
        {!firstParticipant && (
          <button
            onClick={connectCall}
            className="px-10 py-2 bg-black rounded-sm text-white cursor-pointer"
          >
            Retry
          </button>
        )}
  
        {loading && <span>Live stream connecting...</span>}
  
        {/* <div>Live: {participantCount}</div> */}
  
        {firstParticipant ? (
              <div className="rounded-xl overflow-hidden shadow-md border-black/10 w-full min-h-[90%]! bg-gray-200 flex flex-col items-center justify-center ">
          <ParticipantView
            className="min-w-full! h-[100%] flex flex-col items-center justify-center gap-1 "
            VideoPlaceholder={CustomVideoPlaceHolder}
            participant={firstParticipant}
          />
          </div>
        ) : (
          <div>The host hasn't joined yet</div>
        )}


      </div>
    );
  };

  
  const CustomVideoPlaceHolder = () => <span>loading...</span>;
  