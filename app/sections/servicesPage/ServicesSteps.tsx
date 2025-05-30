import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import Image from 'next/image'
import React from 'react'

function ServicesSteps() {
  const steps = [
    {
        title: "Support",
        description: "We are committed to your success. Our dedicated support team is available 24/7 to assist you with business growth, networking, and expansion.",
        image: "/services/step1.svg"
    },
    {
        title: "Sales",
        description: "Boost your revenue with direct access to a high-value marketplace.",
        image: "/services/step2.svg"
    },
    {
        title: "Onboarding",
        description: "We make it easy to get started and start profiting quickly.",
        image: "/services/step3.svg"
    },
    {
        title: "Product",
        description: "Showcase and sell your products with confidence and ease. Gain visibility in the global marketplace.",
        image: "/services/step4.svg"
    },
    {
        title: "Quality",
        description: "Our platform ensures only verified businesses and trusted individuals are allowed to trade.",
        image: "/services/step5.svg"
    },
    {
        title: "Result",
        description: "We prioritise results-driven business growth.",
        image: "/services/step6.svg"
    }
];

      
  return (
    <SectionHeader  classes=" px-20 py-20  ">
      <H1 classes='text-4xl! text-[#181818]! mb-5'>Make every step user-centric</H1>
      <span className='text-lg text-[#181818] w-1/2 text-center '>From 24/7 assistance to sales optimization and seamless onboarding, we provide everything you need to succeed in a trusted global marketplace.</span>

      <div className='grid grid-cols-3 w-full  mt-10 '>
        {
            steps.map((step, index)=>{
                return   <div key={index} className={`flex flex-col gap-5 items-center justify-center hover:shadow-[12px_24px_24px_rgba(0,0,0,0.15)] p-20  cursor-pointer transition-all duration-500 
                border-b border-gray-300 ${index >= steps.length - 3 ? 'border-b-0' : ''}
                   ${ (index + 1) % 3 === 0 ? "border-r-0" : "border-r border-gray-300" }
                `}>
                <Image src={step.image} width={40} height={40} alt='step-logo'/>
                <span className='text-xl font-semibold text-[#181818] '>{step.title}</span>
                <span className='text-base  text-[#181818]/60 text-center'>{step.description}</span>
            </div>
            })
        }
      

      </div>
    </SectionHeader>
  )
}

export default ServicesSteps