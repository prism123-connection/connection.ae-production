import React from "react";
// import { CheckCircleIcon } from "../icons";

interface PricingFeatureProps {
  text: string;
  variant?: "default" | "pro";
}

const CheckCircleIcon: React.FC<{ iconColorClass?: string; logoColorClass?: string }> = ({
  iconColorClass,
  logoColorClass,
}) => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconColorClass}
    >
      <g clipPath="url(#clip0_1_262)">
        <path
          d="M13 26C20.1799 26 26 20.1799 26 13C26 5.8201 20.1799 0 13 0C5.8201 0 0 5.8201 0 13C0 20.1799 5.8201 26 13 26Z"
          fill="currentColor"
        />
        <path
          d="M7.11682 13.8405L10.4786 17.2023L18.8832 8.79773"
          stroke={logoColorClass}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_262">
          <rect width="26" height="26" fill="black" />
        </clipPath>
      </defs>
    </svg>
  );

export const PricingFeature: React.FC<PricingFeatureProps> = ({
  text,
  variant = "default",
}) => {
  const iconColorClass = variant === "pro" ? "text-white" : "text-[#0C87D6]";
  const textColorClass = variant === "pro" ? "text-[rgba(255,255,255,0.78)]" : "text-[#170F49]";
  const logoColorClass = variant === "pro" ? "#06B079" : "#ffffff";

  return (
    <div className="flex items-center gap-3.5">
      {
        text.length === 0 && 
        <div className="w-[26px] h-[26px]"></div>
      }
      {
        text.length > 0 &&
        <CheckCircleIcon iconColorClass={iconColorClass} logoColorClass={logoColorClass} />
        }
      
      <div className={`text-base leading-5 max-sm:text-base ${textColorClass}`}>
        {text}
      </div>
    </div>
  );
};