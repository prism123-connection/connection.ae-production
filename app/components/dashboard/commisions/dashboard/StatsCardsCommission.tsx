import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: {
    value: string;
    positive: boolean;
  };
  actionLabel: string;
  link: string; 
  navLink : string; 
}

export const StatsCardsCommission: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  actionLabel,
  link, 
  navLink
}) => {
  const router = useRouter()
  return (
    <div className="bg-white shadow-lg cursor-pointer p-8 rounded-xl relative hover:shadow-xl transition-shadow duration-500 w-full">
         <Image
      src={link}
      alt={title}
      width={40}
      height={40}
      className="absolute right-10"
      />
   
      <div className="text-sm text-[#001625] mb-2">{title}</div>
      <div className="flex items-center gap-3 mb-8">
        <div className="text-[32px] text-[#001625]">{value}</div>
        <div
          className={`${trend.positive ? "bg-[#F2FCF8] text-[#22A77E]" : "bg-[#FFF5F5] text-[#E53535]"} rounded px-3 py-1.5`}
        >
          
          <div className="flex items-center gap-1.5 text-sm">
            
            <svg
              className={`w-[16px] h-[16px] stroke-current`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  trend.positive
                    ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                    : "M19.5 8.25l-7.5 7.5-7.5-7.5"
                }
              />
            </svg>
            <span>{trend.value}</span>
          </div>
        </div>
      </div>
      <div
      onClick={() => router.push(navLink)}
      className="text-sm text-[#001625] underline cursor-pointer border bg-[#F6F8FA] p-6 rounded-xl border-[#E0E8F1]">
        {actionLabel}
      </div>
   
    </div>
  );
};
