import React, { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

interface TimeUnit {
  value: number;
  label: string;
}

interface ProductTimerProps {
  goLiveAt: string; // ISO date string like "2026-12-11T18:30:00.000Z"
}

export const ProductTimer: React.FC<ProductTimerProps> = ({ goLiveAt }) => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { value: 0, label: "Days" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
    { value: 0, label: "Seconds" },
  ]);
  const [streamState, setStreamState] = useState(''); 

  useEffect(() => {
    if (!goLiveAt) {
      setStreamState("NOT_SCHEDULED");
      return;
    }

    const endDate = new Date(goLiveAt);
    const now = new Date();

    if (endDate <= now) {
      setStreamState("ENDED");
      return;
    }

    setStreamState("UPCOMING");

    const timer = setInterval(() => {
      const current = new Date();
      const diff = differenceInSeconds(endDate, current);

      if (diff <= 0) {
        clearInterval(timer);
        setStreamState("ENDED");
        return;
      }

      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = diff % 60;

      setTimeUnits([
        { value: days, label: "Days" },
        { value: hours, label: "Hours" },
        { value: minutes, label: "Minutes" },
        { value: seconds, label: "Seconds" },
      ]);
    }, 1000);

    return () => clearInterval(timer);
  }, [goLiveAt]);


  return (
    streamState === 'UPCOMING' ? 
    <div>
      <div className="text-[#343839] text-sm font-normal leading-[26px] mt-10">
        Live in:
      </div>
      <div className="flex items-stretch gap-3 text-xs text-[#6C7275] font-normal whitespace-nowrap text-center leading-loose mt-2">
        {timeUnits.map((unit) => (
          <div className="flex flex-col gap-0 mt-3" key={unit.label}>
            <div className="text-2xl text-[#141718] tracking-[-0.6px] leading-none px- rounded-lg">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="mt-2 rounded-lg">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
    :
    streamState === 'NOT_SCHEDULED' ? 
    <div className="flex gap-5 items-center justify-center w-fit">
     <div className="text-[#343839] text-sm font-normal leading-[26px] mt-5">
      Live Status:
      </div>
      <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium w-fit mt-5">
      Not Scheduled
      </div>
    </div>
    
    :
     <div className="flex gap-5 items-center justify-center w-fit">
     <div className="text-[#343839] text-sm font-normal leading-[26px] mt-5">
      Live Status:
      </div>
      <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium w-fit mt-5">
    Stream Ended
    </div>
    </div>
 
  );
};
