"use client"
import Customers from '@/app/components/dashboard/seller-portal/customer/Customer';
import SellerOverviewHeader from '@/app/components/dashboard/seller-portal/header';
import SellerStreams from '@/app/components/dashboard/seller-portal/live-streams/SellerStreams';
import MyProduct from '@/app/components/dashboard/seller-portal/myProduct/MyProducts';
import ApprovedOrders from '@/app/components/dashboard/seller-portal/order/ApprovedOrder';
import SellerPortal from '@/app/components/dashboard/seller-portal/Overview/overview';
import SectionHeader from '@/app/components/SectionHeader'
import { Deal } from '@/app/types/models';
import { useUser } from '@/context/UserContext';
import { getAllSellerInfo } from '@/lib/sellerPortal/sellersHelper';
// import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export type FetchedDataType = {
  deals: Deal[];
};

function SellerPortalOverview() {
const [activeTab, setActiveTab] = useState(0);

    const [loading, setLoading] = useState(false)
    const [statsData, setStatsData] = useState({ totalOrders: 0, tatalSales: 0, totalProducts: 0, })
    const [orders, setOrders] = useState([] as Deal[])
    const { user } = useUser();

    const fetchAllData = async () => {
        setLoading(true);
        try {
          const [deals] = await Promise.all([ getAllSellerInfo()]);
            
          const deal = deals.deals;
          const products = deals.products;
          const receivedDeals = deal.filter((d: Deal) => d.paymentStatus === "RECEIVED");
          const totalOrders = receivedDeals.length;
          const totalProducts = products.length;
          const totalSales = receivedDeals.reduce((sum: number, d: Deal) => {
          // If using Prisma Decimal, convert to number
          return sum + Number(d.amount);
          }, 0);
          setOrders(receivedDeals);
          setStatsData({
            totalOrders,
            tatalSales: totalSales,
            totalProducts: totalProducts,
          });
        } catch (err) {
          console.error("Failed to fetch dashboard data:", err);
          toast.error("Failed to load dashboard data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchAllData()
      }, [])
 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const node = urlParams.get("stream");
      setActiveTab(node ? 3 : 0);
  }, []);

  console.log('----------------->', orders, statsData)

  return (
    <SectionHeader classes=' w-full! items-start justify-start gap-5! mt-10 '>
      {/* <div className='aboslute w-screen h-screen fixed top-0 right-0 bg-black/10'/> */}
    <SellerOverviewHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
    {loading && (
          <div className="w-full h-screen bg-white rounded-lg flex p-16 flex-col px-8 items-end">
          <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
    )}
    {activeTab === 0 && !loading && (<SellerPortal />)}
    {activeTab === 1 && !loading && (<ApprovedOrders/>)}
    {activeTab === 2 && !loading && (<MyProduct/>)}
    {activeTab === 3 && !loading && (<SellerStreams/>)}
    {activeTab === 4 && !loading && (<Customers/>)}
    </SectionHeader>
  )
}

export default SellerPortalOverview