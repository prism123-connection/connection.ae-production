"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProceedButtons from "@/app/components/ui/ProceedButtons";

const HorizontalNavbar = () => {
  const { user, loading } = useUser();
  const [refLink, setRefLink] = useState('')

  useEffect(() => {
    if (user?.referralId) {
      setRefLink(`${process.env.NEXT_PUBLIC_DEPLOYED_URL}/auth/register?rid=${user.referralId}`);
    }
  }, [user])
  

  const handleCopy = () => {
    if (user?.referralId) {
      navigator.clipboard.writeText(refLink);
      toast.info("Referral ID copied!");
    }
  };

  return (
    <div className="w-full bg-white p-4 flex justify-between items-center shadow-md rounded-lg">

      {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
          <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
        </div>
        )
      }
      {!loading && user?.referralId && (
        <div className="flex items-center gap-1 justify-between w-full">
          {/* left side */}
          <div className="flex items-center justify-center gap-2">
          <span className="text-gray-600 text-sm mb-1">Your referal code :</span>
          <div className="border-1 border-gray-600/10 flex p-1 rounded-lg px-2 bg-gray-600/5  ">
          <span className="text-gray-600/50 text-[12px]">{ `${process.env.NEXT_PUBLIC_DEPLOYED_URL}/auth/register?rid=${user.referralId}` }</span>
          <Image
          onClick={handleCopy}
          src={'/dash/copyButton.svg'}
          alt="copy button"
          height={18}
          width={18}
          className="ml-2 opacity-50 cursor-pointer"
          /></div>
          </div>

          {/* right side  */}
          <div className="flex justify-center items-center gap-2 cursor-pointer">
          <Image
          src={'/dash/notify_bell.svg'}
          alt="notification button"
          width={25}
          height={25}
          className="mr-5"
          />
        {
          user.userRole === 'FREE_USER' ? 
          <div className=" p-0.5 flex justify-center items-center bg-gradient-to-r from-[#FFD027] to-[#FD7A02] rounded-lg mr-5 cursor-pointer">
          <div className="w-full flex   bg-[#FEA319] px-5 py-1.5 items-center justify-center  rounded-lg shadow-md">
            {/* Your content here */}
            <h1 className="text-sm text-white">Upgrade</h1>
            <Image
                  src={'/dash/upgrade_logo.svg'}
                  alt="notification button"
                  width={20}
                  height={20}
                  className="ml-2"
                  />
          </div>
        </div>
        : 
        null

        }
      
       
        
        <div className="bg-gradient-to-r from-[#760F6D] to-[#DC1CCC] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center border-4 border-white/70 cursor-pointer">{user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase()}</div>
        <span className="cursor-pointer">{user.firstName}</span>
        <div  className="mt-0.5 border-1 cursor-pointer border-black/20 rounded-full p-1">
          <Image
          src={'/dash/arrow-down.svg'}
          alt="options arrow"
          width={12}
          height={20}
          className="opacity-50"
          />
        </div>
        </div>
         
        </div>
      )}
    </div>
  );
};

export default HorizontalNavbar;


// <ProceedButtons classes=" px-5! mt-0! py-1.5! bg-gradient-to-r! from-[#FFD027]! to-[#FD7A02]! hidden">
// Upgrade  <Image
// src={'/dash/upgrade_logo.svg'}
// alt="notification button"
// width={25}
// height={25}
// className="ml-2"
// /> </ProceedButtons>