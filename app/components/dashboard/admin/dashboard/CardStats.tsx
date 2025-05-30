"use client";

import ProgressArc from "@/app/(user_dash)/dashboard/components/_anim_components/progress_arc";
import Loader from "@/app/components/loader";
import { Deal, Transaction, User } from "@/app/types/models";
import { fetchData } from "@/lib/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface props {
    className: string;
    transactions: Transaction[];
    deals : Deal[]
    users : User[]
}


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CardStats:React.FC<props> = ({ className, transactions, deals, users }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userRoleRatio, setUserRoleRatio] = useState<{ groupA: number; groupB: number }>({ groupA: 0, groupB: 0 });
  const [dealData, setDealData] = useState<{ name: string; uv: number; pv: number; amt: number }[]>([]);
  

  const fetchAllData = ( ) =>{
    setLoading(true)
    // ---- 1. Role Ratio ----
    const groupA = ["PAID_USER", "ADMIN", "SUPER_ADMIN"];
    const groupB = ["FREE_USER", "SETUP_PENDING", "PAYMENT_PENDING"];

    let groupACount = 0;
    let groupBCount = 0;

    users.forEach((user) => {
      if (groupA.includes(user.role)) groupACount++;
      else if (groupB.includes(user.role)) groupBCount++;
    });

    setUserRoleRatio({ groupA: groupACount, groupB: groupBCount });

    // ---- 2. Deal Data ----

     const dayMap: Record<string, number> = {};

  deals.forEach((deal) => {
    const dateObj = new Date(deal.createdAt);
    const key = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
   dayMap[key] = (dayMap[key] || 0) + Number(deal.amount);
  });

  const result = Object.entries(dayMap).map(([dateStr, total]) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      weekday: "short",
    }); // e.g., "May 24, Fri"

    return {
      name: dayName,
      uv: total, // chart line will use this
      pv: 0,
      amt: total, // for tooltip (if needed)
    };
  });

  // Sort by date (chronological order)
  result.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  setDealData(result);

    setLoading(false);
  }

  useEffect(() => {
    fetchAllData()
  }, [users, transactions]);
   


  if (loading) {
    return (
      <div className={`w-full ${className} bg-white rounded-lg flex flex-col justify-center items-center h-64`}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg text-red-600 flex flex-col items-center">
        <p>Failed to load data</p>
        <button
          onClick={async () => await fetchAllData()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }



 const percentage =
  users.length > 0
    ? Math.round((userRoleRatio.groupA / (userRoleRatio.groupA + userRoleRatio.groupB)) * 100)
    : 0;


  return (
    <div className={`w-full flex flex-col gap-4  ${className}`}>
      <div className="flex gap-4 w-full flex-1">

       <div className="rounded-lg flex flex-col bg-white p-4 flex-1 h-64">
          <p className="text-sm text-black">
            <span className="text-3xl font-novaSB opacity-70">0</span>
            <br />
            <span className="font-novaLight opacity-50">Total Deals</span>
          </p>
       <ResponsiveContainer width="100%" height="100%">
  <AreaChart
    data={dealData}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis
      tickFormatter={(value) => `$${value}`} // Y axis shows currency
    />
    <Tooltip
      formatter={(value: number) => [`₹${value}`, "Amount"]} // hover shows Amount: ₹value
      labelStyle={{ fontWeight: "bold" }}
    />
    <Area
      type="monotone"
      dataKey="uv"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorUv)"
    />
  </AreaChart>
</ResponsiveContainer>
        </div>

       

      </div>

      <div className="flex gap-4 w-full flex-1">
 <div className="rounded-lg flex flex-col gap-2 bg-white p-4 flex-1">
          <p className="text-sm text-black">
            <span className="text-3xl font-novaSB opacity-70">
              {userRoleRatio.groupA}/{userRoleRatio.groupB}
            </span>
            <br />
            <span className="font-novaLight opacity-50">
              Total Paid member / Free member
            </span>
          </p>
          <ProgressArc percentage={percentage} />
        </div>
     

      </div>
    </div>
  );
};

export default CardStats;
