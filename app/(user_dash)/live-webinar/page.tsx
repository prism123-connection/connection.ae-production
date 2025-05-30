import { LiveStreamList } from '@/app/components/dashboard/live-webinars/LiveStreamList'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function LiveWebinars() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-0!'>
    <LiveStreamList/>
    </SectionHeader>
  )
}

export default LiveWebinars