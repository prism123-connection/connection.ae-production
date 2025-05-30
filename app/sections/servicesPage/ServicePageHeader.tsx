"use client"
import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import PrimaryButtons from '@/app/components/ui/PrimaryButtons'
import { useRouter } from "next/navigation";
import React from 'react'

function ServicePageHeader() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/register");
  };

  return (
    <SectionHeader classes="py-30 items-start px-20 bg-[#F0F8FF]">
    <H1 classes='font-normal!'> Boost your revenue with direct <br/>access to a high-value marketplace</H1>
    <span className='text-base mt-10 '>A platform built for verified businesses to trade, expand, and thrive. Secure <br/> transactions, expert assistance, and smart tools for sustainable growth.</span>
    <PrimaryButtons onClickFunc={handleRedirect} classes='mt-10 z-10'>Get Started</PrimaryButtons>
</SectionHeader>
  )
}

export default ServicePageHeader