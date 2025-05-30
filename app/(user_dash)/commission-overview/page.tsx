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
import { fetchData } from '@/lib/helper';

function CommissionOverviewContent() {
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [referralBonus, setReferralBonus] = useState<number>(0);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [totalEarning, setTotalEarning] =  useState<number>(0);
  const [walletBalance, setwalletBalance] =  useState<number>(0);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [referralData, walletData] = await Promise.all([
        fetchData("dashboard/stats/referral"),
        fetchData("dashboard/stats/wallet"),
      ]);

      // if (walletData) setWalletBalance(walletData.amount);
      if (referralData) {
        setReferralBonus(referralData.referralBonus);
        setTotalMembers(referralData.totalMembers);
      }
      if (walletData) {
          setwalletBalance(walletData.walletBalance)
      }
    } catch {
      console.log(true);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const vmc = searchParams.get("vmc");
    setActiveTab(vmc ? 2 : 0);
  }, [searchParams]);

  useEffect(() => {
    fetchAllData()
  }, [])


  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
      {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
          <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
        </div>
        )
      }
      <CommissionHeader />
      <CommissionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {
        activeTab === 0 ? <CommissionDashbaord setActiveTab={setActiveTab} referralBonus={referralBonus}
        totalMembers={totalMembers} /> :
          activeTab === 1 ? <AffiliateSection /> :
            activeTab === 2 ? <MyCommission walletBalance={walletBalance} referralBonus={referralBonus}/> :
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
