import { Transaction } from "@/app/types/models";
import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface props {
  transactions : Transaction[]
}

interface ChartData {
  name: string;
  value: number;
}


export const RevenueChart: React.FC<props> = ({transactions}) => {

   const [chartData, setChartData] = useState<ChartData[]>([]);


useEffect(() => {
  const dayMap: { [date: string]: number } = {};

  // Step 1: Group transactions by day
  transactions.forEach((tx) => {
    const date = new Date(tx.createdAt);
    const dayKey = date.toISOString().split("T")[0]; // "YYYY-MM-DD"

    if (!dayMap[dayKey]) {
      dayMap[dayKey] = 0;
    }

    dayMap[dayKey] += tx.amount;
  });

  // Step 2: Fill in the past 30 days with zeros if missing
  const today = new Date();
  const past30Days: ChartData[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dayKey = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const displayDate = date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    }); // e.g., "May 27"

    past30Days.push({
      name: displayDate,
      value: dayMap[dayKey] || 0,
    });
  }

  setChartData(past30Days);
}, [transactions]);


  return (
    <div className="border  border-[color:var(--gray-200,#E4E4E7)] bg-white w-full mx-auto px-[25px] py-[15px] rounded-2xl border-solid h-full flex flex-col justify-between ">
      <div className="flex w-full  items-stretch gap-5 flex-wrap justify-between">
        <div className="text-zinc-900 text-2xl font-semibold leading-none mt-2.5">
          Revenue report
        </div>
      </div>

      

      <div className="flex flex-col bg-white h-full mt-20">
        <ResponsiveContainer width="100%" height="100%">
                 <LineChart
                   data={chartData}
                   margin={{
                     top: 10,
                     right: 10,
                     left: 0,
                     bottom: 0,
                   }}
                 >
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis 
                     dataKey="name" 
                     axisLine={false}
                     tickLine={false}
                     tick={{ fontSize: 12 }}
                   />
                   <YAxis 
                     axisLine={false}
                     tickLine={false}
                     tick={{ fontSize: 12 }}
                     tickFormatter={(value) => `$${value}`}
                   />
                   <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                   <Line
                     type="monotone"
                     dataKey="value"
                     stroke="#3b82f6"
                     strokeWidth={2}
                     dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                     activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
      </div>

      {/* <div className="flex flex-col bg-white ">
      <div className="flex flex-col relative min-h-[189px] ">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/b78927cf39391340cb0ebbc19fabcfcb4ea1a3d4?placeholderIfAbsent=true"
          alt="Revenue chart"
          className="absolute h-full w-full object-cover inset-0"
        />
        <div className="relative border-zinc-100 border bg-zinc-100 shrink-0 h-px -mb-8 border-solid" />
      </div>
      <div className="border-zinc-100 border bg-zinc-100 w-full shrink-0 h-px border-solid" />

      <div className="flex items-stretch gap-5 text-[13px] text-zinc-600 font-medium whitespace-nowrap leading-loose flex-wrap justify-between mt-[18px]">
        {["Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => (
          <div key={month} className="text-center">
            {month}
          </div>
        ))}
      </div>
      </div> */}
    </div>
  );
};
