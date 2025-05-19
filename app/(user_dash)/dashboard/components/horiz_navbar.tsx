"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProceedButtons from "@/app/components/ui/ProceedButtons";
import { NotificationFeed } from "@/app/components/dashboard/notification/NotificationFeed";
import { AccountMenu } from "@/app/components/dashboard/accountMenu/AccountMenu";
import ActionButton from "@/app/components/ui/ActionButton";
import CommonAvatar from "@/app/components/ui/CommonAvatar";

const HorizontalNavbar = () => {
  const { user, loading } = useUser();
  const [refLink, setRefLink] = useState('')
  const [notificationSeen, setNotificationSeen] = useState(false)
  const [displayNotification, setDisplayNotification] = useState(false)
  const [displayAccountMenu, setdisplayAccountMenu] = useState(false)
  const [displayPremiumBadge, setDisplayPremiumBadge]=useState(false)
  const router = useRouter()

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

  const openNotification = () => {  
    !notificationSeen ? setNotificationSeen(true) : null
    displayNotification ? setDisplayNotification(false) : setDisplayNotification(true)
  }

  const handleAccountMenu = () => { 
    displayAccountMenu ? setdisplayAccountMenu(false) : setdisplayAccountMenu(true)
  }



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
          {
            user.userRole === 'FREE_USER' && (
              <span className="text-gray-600/50 text-sm mb-1 border-1 border-gray-600/10 flex p-1 rounded-lg px-2 bg-gray-600/5 cursor-pointer ">Upgrade to unlock code</span>
            )
          }
          {
            user.userRole === 'PAID_USER' &&
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
          }
          </div>


          {/* right side  */}
          <div className="flex justify-center items-center gap-2 ">
          {
            !notificationSeen ? 
            <Image
            onClick={openNotification}
            src={'/dash/notify_bell.svg'}
            alt="notification button"
            width={25}
            height={25}
            className="mr-5 cursor-pointer"
            />
            : 
            <Image
            onClick={openNotification}
            src={'/dash/notification-open.svg'}
            alt="notification button"
            width={20}
            height={20}
            className="mr-5 cursor-pointer"
            />
          }
          {
            displayNotification && <NotificationFeed/>
          }
      
        {
          user.userRole === 'FREE_USER' ? 
          <div onClick={()=>router.push('/auth/pricing')} className=" p-0.5 flex justify-center items-center bg-gradient-to-r from-[#FFD027] to-[#FD7A02] rounded-lg mr-5 cursor-pointer ">
          <div className="w-full flex   bg-[#FEA319]  hover:bg-[#ff9900] transition-colors duration-500 px-5 py-1.5 items-center justify-center  rounded-lg shadow-2xl">
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

    <ActionButton onClick={()=>router.push('/seller-portal')} variant="success" className="px-8! py-2! mr-5">Sales Portal</ActionButton>
      
       
        {/* {
          user.userRole === 'PAID_USER' ?
          <>
          <div onMouseEnter={()=>setDisplayPremiumBadge(true)} onMouseLeave={()=>setDisplayPremiumBadge(false)} className="p-1 bg-amber-300 rounded-full bg-gradient-to-b from-[#FFD36A] via-[#FEB401] via-[#FEB101] to-[#FD7301] relative cursor-pointer">
          <div className="bg-gradient-to-r from-[#760F6D]/10 to-[#DC1CCC]/10 p-3 rounded-full text-white w-10 h-10 flex items-center justify-center ">{user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase()}
          </div>
          <Image
          src={'/dash/premium-badge.svg'}
          width={24}
          height={24}
          alt="premium badge"
          className="absolute left-0 -bottom-1.5"
          />
          </div>
          {
            displayPremiumBadge && 
          <div className= {`pt-1 bg-amber-400  w-[190px] absolute top-24 right-5 rounded-lg shadow-lg from-[#FFD36A] via-[#FEB401] via-[#FEB101] to-[#FD7301] transition-opacity duration-500 ease-in-out  ${displayPremiumBadge ? 'opacity-100`' : 'opacity-0 pointer-events-none'}`}>
          <div className="self-stretch  bg-white max-w-full px-5 py-3 rounded-lg  text-sm text-black/60 font-normal leading-none"
          > {"Congrats! You're a pro user on connection"} </div> </div>
          }
      </>
          
          : 

          <div className="bg-gradient-to-r from-[#760F6D] to-[#DC1CCC] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center border-4 border-white/70 ">{user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase()}</div>
        } */}

        <CommonAvatar
        firstName={user.firstName}
        lastName={user.lastName}
        avatarUrl={user.avatarUrl}
        userRole={user.userRole}
        />
    

        <span className="">{user.firstName}</span>
        <div onClick={handleAccountMenu}  className="mt-0.5 border-1  border-black/20 rounded-full p-1 cursor-pointer">
          <Image
          src={'/dash/arrow-down.svg'}
          alt="options arrow"
          width={12}
          height={20}
          className="opacity-50"
          />
        </div>
        </div>

        {displayAccountMenu && <AccountMenu/> }
         
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