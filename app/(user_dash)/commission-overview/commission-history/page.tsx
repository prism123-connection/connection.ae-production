import CommissionList from '@/app/components/dashboard/commisions/commissionHistory/commissionList'
import CommissionHeader from '@/app/components/dashboard/commisions/dashboard/HeaderCommision'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function CommissionHistory() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
    <CommissionHeader/>
    <CommissionList/>
    </SectionHeader>
  )
}

export default CommissionHistory