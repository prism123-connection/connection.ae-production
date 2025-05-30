import Filterbox from '@/app/components/filterbox'
import React from 'react'
import { StatsCardsCommission } from './StatsCardsCommission'
import TotalEarningCommission from './TotalEarningCommission'
import AnalyticsChartCommission from './AnalyticsChartCommission'

interface CommissionDashbaordProps {
  setActiveTab: (tabIndex: number) => void;
  referralBonus : string | number;
  totalMembers : string | number; 
}

const CommissionDashbaord : React.FC<CommissionDashbaordProps> = ({ setActiveTab , referralBonus , totalMembers}) => {
  return (
    <>
    <Filterbox/>
        <div className="grid grid-cols-3 gap-10 mb-5 w-full max-md:grid-cols-2 max-sm:grid-cols-1 pr-10">
        <StatsCardsCommission
          title="Members referred"
          value={totalMembers}
          trend={{ value: "10%", positive: true }}
          actionLabel="View all joined members"
          link='/dash/commission/members.svg'
          navLink='/downline'
        />
        <StatsCardsCommission
          title="Referrals Commission"
          value={`$${referralBonus}`}
          trend={{ value: "10%", positive: true }}
          actionLabel="View all Referral Commission"
          link='/dash/commission/referrals.svg'
          navLink='/commission-overview/commission-history'
        />
        <StatsCardsCommission
          title="Deals Commission"
          value="$0"
          trend={{ value: "0%", positive: true }}
          actionLabel="View all Deals Commission"
          link='/dash/commission/members.svg'
          navLink='/commission-overview/commission-history'
        />
      </div>
      <TotalEarningCommission totalEarning={referralBonus} setActiveTab={setActiveTab}/>
      <AnalyticsChartCommission/>
    </>
  )
}

export default CommissionDashbaord