import React from "react";
import { VideoProgress } from "@/app/components/ui/VideoProgress";

interface ProductImageProps {
  imageUrl: string;
  altText: string;
}

export const Stream: React.FC<ProductImageProps> = ({
  imageUrl,
  altText,
}) => {
  return (
    <div className="relative w-full">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-[730px] rounded-[36px] object-cover"
      />
      <div className="text-white text-xs font-normal leading-3 absolute  backdrop-blur-[[2px]] px-2.5 py-1 rounded-xl right-6 top-6">
        Live
      </div>
      <div className="absolute h-[726px] to-transparent bottom-0 inset-x-0">
        <div className="absolute px-[25px] bottom-[70px] inset-x-0">
          <VideoProgress currentTime="38:56" duration="1:56:30" progress={60} />
        </div>
      </div>
    </div>
  );
};