import Filterbox from '@/app/components/filterbox'
import React from 'react'
import { StatsCardsCommission } from './StatsCardsCommission'
import TotalEarningCommission from './TotalEarningCommission'
import AnalyticsChartCommission from './AnalyticsChartCommission'

function CommissionDashbaord() {
  return (
    <>
    <Filterbox/>
        <div className="grid grid-cols-3 gap-10 mb-5 w-full max-md:grid-cols-2 max-sm:grid-cols-1 pr-10">
        <StatsCardsCommission
          title="Members referred"
          value="194"
          trend={{ value: "8.38%", positive: true }}
          actionLabel="View all joined members"
          link='/dash/commission/members.svg'
        />
        <StatsCardsCommission
          title="Referrals Commission"
          value="$600"
          trend={{ value: "8.38%", positive: false }}
          actionLabel="View all commissions"
          link='/dash/commission/referrals.svg'
        />
        <StatsCardsCommission
          title="Deals Commission"
          value="$500"
          trend={{ value: "8.38%", positive: true }}
          actionLabel="View all joined members"
          link='/dash/commission/members.svg'
        />
      </div>
      <TotalEarningCommission/>
      <AnalyticsChartCommission/>
    </>
  )
}

export default CommissionDashbaord