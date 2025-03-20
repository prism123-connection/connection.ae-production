import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import PrimaryButtons from '@/app/components/ui/PrimaryButtons'
import React from 'react'

function ServicePageHeader() {
  return (
    <SectionHeader classes="py-30 items-start px-20 bg-[#F0F8FF]">
    <H1 classes='font-normal!'> Boost your revenue with direct <br/>access to a high-value marketplace</H1>
    <span className='text-base mt-10 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula 
        <br/>
        massa in enim luctus. Rutrum arcu.</span>
    <PrimaryButtons classes='mt-10'>Get Started</PrimaryButtons>
</SectionHeader>
  )
}

export default ServicePageHeader