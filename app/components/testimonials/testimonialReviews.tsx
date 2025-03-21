import React from 'react'
import SectionHeader from '../SectionHeader'
import { HiArrowUpRight } from "react-icons/hi2";
import TestimonialCaraousel from './testimonialCaraousel';
import Image from 'next/image';



function TestimonialReviews() {
  return (
    <SectionHeader classes='py-30 px-20'>
    <div className=' pt-20 flex items-center justify-center gap-2'>
    <span className='text-[#2563EB] text-base '>Join connection now</span>
    <HiArrowUpRight className="text-[#2563EB] mt-1"/>
    </div>

    <TestimonialCaraousel/>


    </SectionHeader>
  )
}

export default TestimonialReviews