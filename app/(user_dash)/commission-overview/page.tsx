"use client"
import AffiliateSection from '@/app/components/dashboard/commisions/affiliate/AffiliateSection';
import AnalyticsChartCommission from '@/app/components/dashboard/commisions/dashboard/AnalyticsChartCommission';
import CommissionDashbaord from '@/app/components/dashboard/commisions/dashboard/CommissionDashbaord';
import CommissionHeader from '@/app/components/dashboard/commisions/dashboard/HeaderCommision';
import CommissionNavigation from '@/app/components/dashboard/commisions/dashboard/Navigation-Commsion';
import { StatsCardsCommission } from '@/app/components/dashboard/commisions/dashboard/StatsCardsCommission';
import TotalEarningCommission from '@/app/components/dashboard/commisions/dashboard/TotalEarningCommission';
import MyCommission from '@/app/components/dashboard/commisions/myCommissions/MyCommission';
import WithdrawlPayout from '@/app/components/dashboard/commisions/withdrawlPayout/WithdrawlPayout';
import Filterbox from '@/app/components/filterbox';
import SectionHeader from '@/app/components/SectionHeader';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from "next/navigation";

function CommissionOverviewContent() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const vmc = searchParams.get("vmc");
    setActiveTab(vmc ? 2 : 0);
  }, [searchParams]);

  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
      <CommissionHeader />
      <CommissionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {
        activeTab === 0 ? <CommissionDashbaord /> :
        activeTab === 1 ? <AffiliateSection /> :
        activeTab === 2 ? <MyCommission /> :
        <WithdrawlPayout />
      }
    </SectionHeader>
  );
}

function CommissionOverview() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommissionOverviewContent />
    </Suspense>
  );
}

export default CommissionOverview;
