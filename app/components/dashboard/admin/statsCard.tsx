import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  index: number;
  growth?: {
    value: string ;
    isPositive: boolean;
  } ; 
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  growth,
  index
}) => {
  return (
    <div className={`
      justify-center items-stretch border border-[color:var(--gray-200,#E4E4E7)]  flex flex-col flex-1 rounded-[10px] border-solid shadow-sm 
    ${
      index ===0 ? 'bg-[#EAFCE8] text-[#256A1D] ' : index === 1 ? 'bg-[#E8F6FC] text-[#256A1D]' : index === 2 ? 'bg-[#F1EDFF] text-[#463191]' : 'bg-[#FFFDED] text-[#945E17]'}`}
    >
      <div className="w-full p-[15px] rounded-[10px]">
        <div className="text-zinc-500 text-[11px] font-semibold leading-loose tracking-[1px] uppercase">
          {title}
        </div>
        <div className="flex w-full max-w-[249px] gap-[40px_100px] justify-between mt-[11px]">
          <div className="gap-2.5 text-[21px]  font-bold whitespace-nowrap leading-loose">
            {value}
          </div>
          {
             growth && (
          <div
            className={`flex items-center gap-1 text-[13px] ${
              growth.isPositive ? "text-green-500" : "text-red-500"
            } font-medium text-right leading-loose`}
          >
            <div className="self-stretch my-auto">{growth.value}</div>
            <img
              src={growth.isPositive ? "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/3232d69d88f5add6a4c6a4361b840b84df9314c1?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/905f9b2c385d7d3a069e19210efa857d2fc3edde?placeholderIfAbsent=true"}
              alt={growth.isPositive ? "Increase" : "Decrease"}
              className="aspect-[1] object-contain w-2.5 self-stretch shrink-0 my-auto"
            />
          </div>
            )
          }
         
        </div>
      </div>
    </div>
  );
};
