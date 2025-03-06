import Image from "next/image";
import React from "react";

const MonthlyRevenue = ({ className } : { className: string }) => {
  return (
    <div
      className={`w-full flex flex-col bg-white min-h-80 p-6 rounded-lg ${className}`}
    >
      <h2 className="text-2xl text-black mb-4 font-novaSB opacity-70">Monthly Revenue</h2>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={"/dash/stats.svg"}
          height={500}
          width={500}
          alt={"stats"}
          className="max-h-full object-contain"
        />
      </div>
      <div className="flex text-black justify-between pt-6">
        January/February
      </div>
    </div>
  );
};

export default MonthlyRevenue;
