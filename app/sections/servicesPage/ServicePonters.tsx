"use client"
import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function ServicePonters() {
    const [activeId, setActiveId] = useState<number>(0);
    const [fade, setFade] = useState(true);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setFade(false); // Start fade-out effect
    
        setTimeout(() => {
          setActiveId((prevId) => (prevId + 1) % 3); // Update image after fade-out
          setFade(true); // Fade in new image
        }, 1000); // Half a second for fade-out
      }, 3000); // Switch images every 2 seconds
    
      return () => clearInterval(interval);
    }, []);

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
    
    const imagesLink = [
      {link : "/services/service-pointer-1.png", style : "scale-120" },
      {link : "/services/service-pointer-2.png", style : "scale-115" },
      {link : "/services/service-pointer-3.png", style : "object-bottom scale-y-120" }
      
    ]
      
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
    <div className={`relative w-96! shrink-0 h-96  rounded-4xl mx-5  ${activeId === 1 ? 'bg-[#D0E7F7]' : activeId === 2 ? 'bg-[#F7E3D0]' : 'bg-white'}`}>
      <Image src={imagesLink[activeId].link} fill className={`object-contain ${imagesLink[activeId].style}
        transition-opacity duration-1000   ${fade ? "opacity-100" : "opacity-0"}
        `}
        onLoadingComplete={(img) => img.classList.remove("opacity-0")} 
         alt='users image' />
    </div>
   

    </div>
    </SectionHeader>
  )
}

export default ServicePonters