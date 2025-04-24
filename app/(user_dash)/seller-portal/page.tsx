"use client"
import Customers from '@/app/components/dashboard/seller-portal/customer/Customer';
import SellerOverviewHeader from '@/app/components/dashboard/seller-portal/header';
import SellerStreams from '@/app/components/dashboard/seller-portal/live-streams/SellerStreams';
import MyProduct from '@/app/components/dashboard/seller-portal/myProduct/MyProducts';
import ApprovedOrders from '@/app/components/dashboard/seller-portal/order/ApprovedOrder';
import SellerPortal from '@/app/components/dashboard/seller-portal/Overview/overview';
import SectionHeader from '@/app/components/SectionHeader'
// import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function SellerPortalOverview() {
const [activeTab, setActiveTab] = useState(0);
 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const node = urlParams.get("stream");
    // const node = searchParams.get("stream");
      setActiveTab(node ? 3 : 0);
  }, []);

  return (
    <SectionHeader classes=' w-full! items-start justify-start gap-5! mt-10 '>
      {/* <div className='aboslute w-screen h-screen fixed top-0 right-0 bg-black/10'/> */}
    <SellerOverviewHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
    {activeTab === 0 && (<SellerPortal/>)}
    {activeTab === 1 && (<ApprovedOrders/>)}
    {activeTab === 2 && (<MyProduct/>)}
    {activeTab === 3 && (<SellerStreams/>)}
    {activeTab === 4 && (<Customers/>)}
    </SectionHeader>
  )
}

export default SellerPortalOverview