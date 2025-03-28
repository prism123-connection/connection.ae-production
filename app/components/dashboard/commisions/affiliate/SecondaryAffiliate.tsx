import React from 'react'
import { StepCard } from './StepCard'
import Image from 'next/image'

function SecondaryAffiliate() {
  return (
<section className="flex w-full max-w-full flex-col items-center mt-5 px-20 py-10 rounded-lg shadow-md ">
      <h2 className="text-black/70 text-2xl font-semibold text-center px-10">
        How to join our Affiliate Program?
      </h2>
      <p className="text-black/70 text-sm font-normal leading-[21px] text-center w-[304px] mt-2">
        Join our affiliate community and arn money through referring individual
        digital assets.
      </p>

      <div className="flex items-center w-full  mt-10">
        <div className="bg-[rgba(232,238,252,1)] flex items-center justify-center  min-w-10 min-h-10  rounded-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7bf870b2ba0a8583631aa426904a89f42e0da8af?placeholderIfAbsent=true"
            alt="Step 1"
            className=" object-contain "
            
          />
        </div>

        <div className='border-2 border-black/40 w-full border-dashed'/>

           <div className="bg-black flex items-center justify-center  min-w-6 min-h-6  rounded-full">
            <Image
                  src={'/dash/arrow-down.svg'}
                  alt="options arrow"
                  width={12}
                  height={20}
                  className="opacity-50 rotate-270 invert"
            />
        </div>

       <div className='border-2 border-black/40 w-full border-dashed'/>

        <div className="bg-[rgba(232,238,252,1)] flex items-center justify-center  min-w-10 min-h-10  rounded-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/5af1c3ac8f61d57e78a8304ba8469bd597d5d674?placeholderIfAbsent=true"
            alt="Step 2"
               className=" object-contain "
          />
        </div>
        
        <div className='border-2 border-black/50 w-full border-dashed'/>

        <div className="bg-black flex items-center justify-center  min-w-6 min-h-6  rounded-full">
         <Image
                  src={'/dash/arrow-down.svg'}
                  alt="options arrow"
                  width={12}
                  height={20}
                  className="opacity-50 rotate-270 invert"
                  />
        </div>
        
        <div className='border-2 border-black/40 w-full border-dashed'/>

        <div className="bg-[rgba(232,238,252,1)] flex items-center justify-center  min-w-10 min-h-10  rounded-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/d8e25114acb52ec485d64df89c424e8ae95c9b56?placeholderIfAbsent=true"
            alt="Step 3"
                className=" object-contain "
          />
        </div>
      </div>

      <div className="self-stretch flex items-stretch gap-[40px_100px] mt-[9px] max-md:max-w-full">
        <StepCard
          number={1}
          title="Sign up for the program"
          description="Create and verify a free account and get access to the affiliate admin panel"
        />
        <StepCard
          number={2}
          title="Share your unique referral URL"
          description="generate a referral URL with your affiliate ID and share it on your website, email, or social media"
        />
        <StepCard
          number={3}
          title="Earn commission"
          description="Earn a guaranteed referral commission on every referral and sale with our affiliate program"
        />
      </div>
    </section>
  )
}

export default SecondaryAffiliate