import React, { useEffect, useState } from "react";
import { StatsCard } from "./statsCard";
import { RevenueChart } from "./revenueChart";
import { WithdrawalsTable } from "./withdrawalTable";
import { DealsTable } from "./table";
import { Deal, Transaction, User } from "@/app/types/models";
import CardStats from "./dashboard/CardStats";
import DealApproval from "./deal-approval/main";
import UserManagement from "./user-management/main";
import { FetchedDataType } from "@/app/(user_dash)/admin/page";


interface props {
  renderView : boolean;
  name : string | undefined; 
  tranactions : Transaction[]; 
  deals : Deal[] ; 
  members : User[] ; 
  setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
}

interface StatItem {
  title: string;
  value: number;
  growth?: {
    isPositive: boolean;
    value?: string;
  }
}

const AdminSection:React.FC<props> = ({renderView, name, tranactions, deals, members, setFetchedData}) => {

    const [stats, setStats] = useState<StatItem[]>([
    { title: "Today's Revenue", value: 0 , growth: { isPositive: true } },
    { title: "Total Revenue", value: 0, growth: { isPositive: true } },
    { title: "Total Deals", value: 0, growth: { isPositive: true } },
    { title: "Total Members", value: 0 , growth: { isPositive: true } },
  ]);

    useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    let todaysRevenue = 0;
    let totalRevenue = 0;

    tranactions.forEach((tx) => {
      const txDate = new Date(tx.createdAt).toISOString().split('T')[0];

      if (tx.status === 'COMPLETED' ) {
        const amount = typeof tx.amount === 'string' ? parseFloat(tx.amount) : tx.amount;

        totalRevenue += amount;
        if (txDate === today) {
          todaysRevenue += amount;
        }
      }
    });

    setStats([
      { title: "Today's Revenue", value: todaysRevenue, growth : {isPositive: true, value : 'Live'} },
      { title: "Total Revenue", value: totalRevenue, growth : {isPositive: true, value : 'Total'} },
      { title: "Total Deals", value: deals.length, growth : {isPositive: true, value : 'Daily Deals'} },
      { title: "Total Members", value: members.length, growth : {isPositive: true, value : 'Members Joining'} },
    ]);
  }, [tranactions, deals, members]);


  return (
    renderView ?
    <main className=" min-h-screen p-0 rounded-lg w-full">
    {/* <div className="w-screen h-screen bg-black/10 fixed top-0 left-0"/> */}
      <div className="self-stretch flex min-w-60  flex-col items-center justify-center my-auto ">
        <div className="w-full ">
          <div className="bg-white p-4 rounded-lg py-5">
          {/* Header */}
          <header className="flex w-full items-stretch gap-5 flex-wrap justify-between ">
            <div className="flex items-center gap-2 text-base ">
              <h1 className="text-zinc-900 font-bold">
                Hi {name}
              </h1>
              <p className="text-zinc-500 font-normal leading-loose">
                here's what's happening with connection.
              </p>
            </div>
            {/* <CurrencySelector /> */}
          </header>

          {/* Stats Cards */}
          <section className="flex items-stretch gap-10 flex-wrap mt-10">
            {stats.map((stat, index) => (
              <StatsCard
                index={index}
                key={index}
                title={stat.title}
                value={String(stat.value)}
               growth={
                      stat.growth
                        ? {
                            value: stat.growth.value ?? '—', // Default to "—" if undefined
                            isPositive: stat.growth.isPositive,
                          }
                        : undefined
                    }
              />
            ))}
          </section>
          </div>

          {/* Charts and Tables Section */}
          <section className="mt-10">
            <div className="gap-5 flex flex-row">
              <div className="w-6/12">
                <RevenueChart transactions={tranactions} />
              </div>
              <div className="w-6/12">
                <CardStats transactions={tranactions} deals={deals} users={members} className=""/>
              </div>
            </div>
          </section>

          {/* Deals Table */}
          <section className="mt-10">
            <DealApproval setFetchedData={setFetchedData} fetchedData={deals}/>
          </section>

        
          <section>
          <UserManagement fetchedData={members}/>
          </section>
        </div>
      </div>
    </main>
    :
    
    <div className="w-full h-screen bg-white rounded-lg flex p-16 flex-col px-8 items-end">
          <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
        </div>
  );
};

export default AdminSection;
