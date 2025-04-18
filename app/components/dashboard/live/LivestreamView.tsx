import { Call, ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";

interface LivestreamViewProps {
  call: Call;
  callId: string;
  userId: string;
}


export const LivestreamView: React.FC<LivestreamViewProps> = ({ call, callId, userId }) => {
    const {
      useCameraState,
      useMicrophoneState,
      useParticipantCount,
      useIsCallLive,
      useParticipants,
    } = useCallStateHooks();
  
    const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
    const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
    const participantCount = useParticipantCount();
    const isLive = useIsCallLive();
  
    const [firstParticipant] = useParticipants();

    const CustomParticipantViewUI = () => {
      return (
        <>
        </>
      );
    };

    const CustomVideoPlaceHolder = () =>{
      return <>
      loading ... 
      </>
    }

    const endLiveStream = async () => {
        try {
        isLive ? call.stopLive() : call.goLive()
 
          const res = await fetch(`/api/live-streams/end-stream?userId=${userId}&callId=${callId}`, {
            method: 'PUT',
          });
      
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Error ending live stream:", errorData.error || res.statusText);
            return null;
          }
      
          const data = await res.json();
          console.log("Live stream ended:", data);
          return data;
        } catch (error) {
          console.error("Unexpected error ending live stream:", error);
          return null;
        }
      };
  
  
  
    return  <div className="w-full items-center justify-center min-h-screen bg-gray-100 flex flex-col text-black gap-5 px-20 py-10">
    <div className="bg-gray-400 text-black px-5 py-2 rounded-xl">Status : {isLive ? `Live: ${participantCount}` : `You are in backstage mode`}</div>

    {firstParticipant && isCamEnabled ? (
    <div className="rounded-xl overflow-hidden shadow-md border w-full min-h-[90%]! bg-blue-600/10 flex flex-col items-center justify-center gap-5">
  <ParticipantView ParticipantViewUI={CustomParticipantViewUI} VideoPlaceholder={CustomVideoPlaceHolder} className="min-w-full! h-[100%] flex flex-col items-center justify-center gap-1" participant={firstParticipant} />
</div>
    ) : (
      <div className="rounded-xl overflow-hidden shadow-md border border-gray-300 w-full min-h-[500px]! max-h-[500px]! bg-black text-white flex items-center justify-center text-2xl">Click on live button to go live</div>
    )}
  
    <div className="flex gap-4 text-white">
      <button className="bg-gray-800 font-semibold text-blue-100 px-20 py-2 rounded-sm" onClick={endLiveStream}>
        {isLive ? "Stop Live" : "Go Live"}
      </button>
      <button className="bg-gray-800  text-blue-100 px-10 py-2 rounded-sm" onClick={() => cam.toggle()}>
        {isCamEnabled ? "Disable camera" : "Enable camera"}
      </button>
      <button className="bg-gray-800  text-blue-100 px-10 py-2 rounded-sm" onClick={() => mic.toggle()}>
        {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
      </button>
    </div>
  </div>
  
  };

