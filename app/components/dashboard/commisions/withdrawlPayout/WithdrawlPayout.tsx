import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'
import WithdrawlTable from './WithdrawlTable'

function WithdrawlPayout() {
  return (
    <SectionHeader classes='overflow-hidden justify-start items-start  gap-10 w-full! pb-20!'>
       <span className='font-semibold text-2xl'>Your recent withdrawal history</span>
       <WithdrawlTable/>
    </SectionHeader>
  )
}

export default WithdrawlPayout