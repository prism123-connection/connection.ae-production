"use client"
import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import React, { useRef, useState } from 'react'
import clsx from "clsx"; 
import FaqContent from '@/app/sections/FaqContent';

function FAQ() {

const [activeId, setActiveId] = useState<number>(0);

const btnClass = "mt-4 px-8 py-2 bg-[#F7FAFC] flex items-center gap-1 text-[#001625] w-max text-base rounded-4xl transition outline-2 outline-[#001625]/10 cursor-pointer"

const activeBtnClass = " mt-4 px-8 py-2 bg-[#001625] flex items-center gap-1 text-white w-max text-base rounded-4xl transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)]  outline-4 outline-white/30 cursor-pointer "

const primaryButtons = [
  "Membership",
  "Business Setup",
  "Referrals & Passive Income",
];
const secondaryButtons = [
  "Networking & Business Growth",
  "Security & Verification", 
  "Platform Usage & Additional Features"
];

  return (
    <div>
 
        <SectionHeader classes="my-30">
          <H1> Frequently asked questions </H1>

          <span className='text-base mt-10 text-center'>These are few mostly asked question, if you have any specific query feel free <br/> to contact our customer friendly support</span>
          
        <div className='flex gap-5 mt-10 '>
        {primaryButtons.map((btn, index) => (
        <button
          key={index}
          onClick={() => setActiveId(index)}
          className={clsx(activeId === index ? activeBtnClass : btnClass)}
        >
          {btn}
        </button>
        ))}
        </div>

        <div className='flex  gap-5 mb-20'>
        {secondaryButtons.map((btn, index) => (
        <button
          key={index+3}
          onClick={() => setActiveId(index+3)}
          className={clsx(activeId === index+3 ? activeBtnClass : btnClass)}
        >
          {btn}
        </button>
        ))}
        </div>

        <FaqContent/>

        </SectionHeader>
    </div>
  )
}

export default FAQ