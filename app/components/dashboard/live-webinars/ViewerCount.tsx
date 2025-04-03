import React from "react";

interface ViewerCountProps {
  count: string;
}

export const ViewerCount: React.FC<ViewerCountProps> = ({ count }) => {
  return (
    <div className="self-stretch flex items-center gap-[13px] text-sm text-black/50 my-auto">
      <div className="bg-[rgba(49,91,153,1)] self-stretch flex w-2 shrink-0 h-2 my-auto rounded-[50%]" />
      <div className="self-stretch my-auto">{count} watching</div>
    </div>
  );
};
