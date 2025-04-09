import React from "react";
import { StatsCard } from "./statsCard";
import { RevenueChart } from "./revenueChart";
import { WithdrawalsTable } from "./withdrawalTable";
import { DealsTable } from "./table";


const AdminSection = () => {
  const statsData = [
    {
      title: "Today's Revenue",
      value: "$12,426",
      growth: { value: "+ 36%", isPositive: true },
    },
    {
      title: "Total Revenue",
      value: "$238,485",
      growth: { value: "+ 14%", isPositive: false },
    },
    {
      title: "Total Deals",
      value: "84,382",
      growth: { value: "+ 36%", isPositive: true },
    },
    {
      title: "Total members",
      value: "33,493",
      growth: { value: "+ 36%", isPositive: true },
    },
  ];

  return (
    <main className="bg-white min-h-screen p-5 rounded-lg w-full">
    {/* <div className="w-screen h-screen bg-black/10 fixed top-0 left-0"/> */}
      <div className="self-stretch flex min-w-60  flex-col items-center justify-center my-auto ">
        <div className="w-full ]">
          {/* Header */}
          <header className="flex w-full items-stretch gap-5 flex-wrap justify-between">
            <div className="flex items-center gap-2 text-base ">
              <h1 className="text-zinc-900 font-bold">Hey Saif -</h1>
              <p className="text-zinc-500 font-normal leading-loose">
                here's what's happening with connection.
              </p>
            </div>
            {/* <CurrencySelector /> */}
          </header>

          {/* Stats Cards */}
          <section className="flex items-stretch gap-10 flex-wrap mt-10">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                growth={stat.growth}
              />
            ))}
          </section>

          {/* Charts and Tables Section */}
          <section className="mt-10">
            <div className="gap-5 flex flex-row">
              <div className="w-6/12">
                <RevenueChart />
              </div>
              <div className="w-6/12">
                <WithdrawalsTable/>
              </div>
            </div>
          </section>

          {/* Deals Table */}
          <section className="mt-10">
            <DealsTable/>
          </section>

          {/* History Log */}
          <section>
            {/* <HistoryLog /> */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminSection;
