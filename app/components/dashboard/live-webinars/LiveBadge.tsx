import React from "react";
import { WifiIcon } from "lucide-react";

export const LiveBadge = () => {
  return (
    <div className="bg-[rgba(232,91,91,1)] self-stretch flex min-h-[42px] items-center gap-6 text-xl text-white whitespace-nowrap justify-center w-[137px] my-auto rounded-[18px]">
      <WifiIcon className="self-stretch w-[29px] h-[29px] my-auto" />
      <div className="self-stretch my-auto">Live</div>
    </div>
  );
};