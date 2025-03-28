import React from 'react'
import CopyAffiliate from './CopyAffiliate';
import Image from 'next/image';

function AffiliatePrimary() {
    const affiliateCode = "htsTxcvuxhcbvdhvbdhjv123";
    const icons = [
      '/dash/commission/facebook.svg',
      '/dash/commission/twitter.svg',
      '/dash/commission/youtube.svg',
      '/dash/commission/insta.svg',
      '/dash/commission/linkedIn.svg',
      '/dash/commission/snapchat.svg',
      '/dash/commission/telegram.svg',
    ]
  return (
    <section className="w-full  rounded-lg px-20">
    <div className="bg-[rgba(243,243,243,1)] shadow-[0px_2px_4px_rgba(0,0,0,0.12)] pl-8 pr-20 py-[73px] rounded-2xl max-md:max-w-full max-md:px-5">
      <div className="gap-5 flex justify-between max-md:flex-col max-md:items-stretch">
        <div className=" max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col font-normal max-md:mt-10">
            <h2 className="text-[rgba(0,22,37,1)] text-xl font-semibold">
              Your Affiliate Code
            </h2>
            <p className="text-[rgba(0,22,37,1)] text-sm mt-2">
              This is your referral Code
            </p>
            <div className="bg-white border flex items-center gap-[31px] mt-4 pl-0 pr-3 py-3 rounded-[10px] border-[rgba(212,212,212,0.44)] border-solid max-md:pl-5">
              <span className="text-black/50 text-base">{affiliateCode}</span>
              <CopyAffiliate textToCopy={affiliateCode} />
            </div>
          </div>
        </div>
        <div className=" ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col text-base text-[rgba(0,22,37,1)] font-normal my-auto max-md:mt-10">
            <span>Share on:</span>
            <div className='flex gap-0 flex-row mt-5'>
              {icons.map((icon, index) => (
                <Image
                  key={index}
                  src={icon}
                  alt="Share icon"
                  width={50}
                  height={50}
                  className=" scale-150 "
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AffiliatePrimary