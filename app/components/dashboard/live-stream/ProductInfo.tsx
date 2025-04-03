import React from "react";
import { StarRating } from "@/app/components/ui/StarRating";

interface ProductInfoProps {
  sellerImage: string;
  sellerName: string;
  location: string;
  title: string;
  description: string;
  features: string[];
}

export const StreamProductInfo: React.FC<ProductInfoProps> = ({
  sellerImage,
  sellerName,
  location,
  title,
  description,
  features,
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-5 mb-2">
        <div className="w-[42px] h-[42px] overflow-hidden rounded-full">
          <img
            src={sellerImage}
            alt={sellerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-5">
            <div className="text-xl">{sellerName}</div>
            <div>
              <svg
                width="30"
                height="29"
                viewBox="0 0 30 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6953 2.3999C8.08331 2.3999 2.69531 7.7879 2.69531 14.3999C2.69531 21.0119 8.08331 26.3999 14.6953 26.3999C21.3073 26.3999 26.6953 21.0119 26.6953 14.3999C26.6953 7.7879 21.3073 2.3999 14.6953 2.3999ZM20.4313 11.6399L13.6273 18.4439C13.4593 18.6119 13.2313 18.7079 12.9913 18.7079C12.7513 18.7079 12.5233 18.6119 12.3553 18.4439L8.95931 15.0479C8.61131 14.6999 8.61131 14.1239 8.95931 13.7759C9.30731 13.4279 9.88331 13.4279 10.2313 13.7759L12.9913 16.5359L19.1593 10.3679C19.5073 10.0199 20.0833 10.0199 20.4313 10.3679C20.7793 10.7159 20.7793 11.2799 20.4313 11.6399Z"
                  fill="#54A93F"
                />
              </svg>
            </div>
          </div>
          <div className="text-[16.8px] text-[rgba(0,0,0,0.5)]">{location}</div>
        </div>
      </div>
      <h1 className="text-5xl font-semibold leading-[72px] mb-2">{title}</h1>
      <div className="text-base text-[#272727] opacity-60 mb-4">
        {description}
      </div>
         <div className="flex items-center gap-4 mb-2">
              <div className="text-[#225CCA] text-[32px] font-semibold">
                $80
              </div>
              <div className="text-[rgba(0,0,0,0.5)] text-sm line-through">
                $160
              </div>
            </div>
      <div className="mb-8">
        <StarRating rating={4} reviews={75} />
      </div>
      <div className="text-base text-[#001625] leading-[27.2px]">
        {features.map((feature, index) => (
          <div key={index} className="mb-2">
            • {feature}
          </div>
        ))}
      </div>
    </div>
  );
};