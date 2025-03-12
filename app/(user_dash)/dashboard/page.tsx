"use client"
import React, { useEffect } from "react";
import TopStatistics from "./components/top_stats";
import MonthlyRevenue from "./components/monthly_revenue";
import CardStats from "./components/card_stats";
import Orders from "./components/orders";
import Registrations from "./components/registrations";
import HorizontalNavbar from "./components/horiz_navbar";

const Dashboard = () => {
  return (
    <div className="bg-[#E2ECF2] flex flex-col gap-4 min-h-screen w-full pl-16 p-6">
      <HorizontalNavbar />
      <TopStatistics />
      <div className="flex w-full gap-4 h-auto">
        <MonthlyRevenue className="flex-1" />
        <CardStats className="flex-1" />
      </div>
      <div className="flex w-full gap-4 h-auto">
        <Orders />
        <Registrations />
      </div>
    </div>
  );
};

export default Dashboard;
