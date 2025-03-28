import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'
import { StatsCardsCommission } from '../dashboard/StatsCardsCommission'
import PayoutHistory from './PayoutHistory'

function MyCommission() {
  return (
    <SectionHeader classes='overflow-hidden justify-start items-start  gap-10 w-full! pb-20!'>
        <div className='min-w-[400px]'>
       <StatsCardsCommission
                title="Commissions"
                value="60"
                trend={{ value: "8.38%", positive: false }}
                actionLabel="View all commissions"
                link='/dash/commission/members.svg'
              />
        </div>
    <PayoutHistory/>
    </SectionHeader>
  )
}

export default MyCommission