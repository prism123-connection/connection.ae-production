import SectionHeader from '@/app/components/SectionHeader'
import Image from 'next/image'
import React from 'react'

const LicencePage = () => {
  return (
    <SectionHeader classes="py-30  px-20">
   <div className="relative w-full h-screen  ">
  <Image src="/licence.jpeg" alt="licence" fill className="object-contain  " />
</div>

    </SectionHeader>
  )
}

export default LicencePage