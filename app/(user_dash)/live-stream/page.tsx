import LiveStreamSection from '@/app/components/dashboard/live-stream/SectionWrapper'
import React from 'react'

function LiveStream() {
  return (
    <section className="bg-white flex flex-col overflow-hidden justify-center px-2.5  mt-10">
        <LiveStreamSection/>
    </section>
  )
}

export default LiveStream