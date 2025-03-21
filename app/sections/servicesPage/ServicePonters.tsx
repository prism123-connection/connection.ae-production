import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import Image from 'next/image';
import React from 'react'

function ServicePonters() {
    const features = [
        {
          title: "Connect with Ready Buyers & Sellers",
          description: "Quick and seamless sign-up."
        },
        {
          title: "Personalised Member Dashboard",
          description: "Manage your business efficiently."
        },
        {
          title: "Comprehensive Walkthroughs",
          description: "Learn how to use Connection for maximum benefit."
        }
      ];

      
  return (
    <SectionHeader classes=" px-20 py-20 ">
    <div className='w-full h-full rounded-4xl p-20 flex gap-40 items-center ' style={{ background: "linear-gradient(195deg, rgba(69,255,188,0.4) -20%, #F9FEFF 50%, #B2E2FF 120%)  "}}>
    
    <div className='flex gap-10 flex-col w-full'>
    {
        features.map((feature, index)=>{
            return  <div key={index} className='flex flex-col gap-2 pb-5 border-b-1 border-[#AFC6D1]/40 '>
            <H1 classes=' font-semibold text-xl text-[#09384F] '>{feature.title} </H1>
            <span className='text-base text-[#09384F]/70'>{feature.description}</span>
            </div>
        })
    }
    </div>
    <div className='relative w-96! shrink-0 h-96 bg-white rounded-4xl mx-5'>
      <Image src={'/services/user-image.svg'} fill className='object-contain scale-150' alt='users image' />
    </div>
   

    </div>
    </SectionHeader>
  )
}

export default ServicePonters