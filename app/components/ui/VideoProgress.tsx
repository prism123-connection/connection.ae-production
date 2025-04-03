import React from "react";

interface VideoProgressProps {
  currentTime: string;
  duration: string;
  progress: number;
}

export const VideoProgress: React.FC<VideoProgressProps> = ({
  currentTime,
  duration,
  progress,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-white text-base font-bold">{currentTime}</div>
      <div className="flex-1 relative h-0.5 mx-[62px]">
        <div className="absolute w-full h-full bg-white opacity-70" />
        <div
          className="absolute h-full bg-[#F48020]"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-[-5px] w-3 h-3 bg-white rounded-full"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="text-white text-base font-semibold">{duration}</div>
    </div>
  );
};
