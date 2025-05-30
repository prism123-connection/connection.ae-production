"use client"
import React, { useState } from 'react';
import { VerifiedBadge } from '../dashboard/live-webinars/VerifiedBadge';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';

interface CommonAvatarProps {
    firstName?: string;
    lastName?: string;
    verfied? : boolean; 
    displayName? : boolean;
    userRole? : string;
    premiumBadgeActive? : boolean;
    avatarUrl?: string
}
 
const CommonAvatar: React.FC<CommonAvatarProps> = ({ 
    firstName, 
    lastName, 
    verfied=false, 
    displayName=false, 
    userRole, 
    premiumBadgeActive=false, 
    avatarUrl
}) => {
    // const { user, loading } = useUser();

    const [displayPremiumBadge, setDisplayPremiumBadge]=useState(false)
    return (
        // loading ? 
        // <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
            // :
        <div className="flex items-center gap-5 text-base ">
            {/* {
                userRole === 'FREE_USER'  && (
                <div className="bg-gradient-to-r from-[#760F6D] to-[#DC1CCC] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center border-4 border-white/70 relative">
                {
                    avatarUrl?.length !== 0 &&(
                        <img
                        src={avatarUrl}
                        className='w-full object-contain absolute rounded-full top-0 left-0 scale-105'
                        />
                    )
                }
              
                
                {firstName?.charAt(0).toUpperCase()}
                {lastName?.charAt(0).toUpperCase()}
                
                
                </div>
                )

            } */}
            {
                userRole && ['PAID_USER', 'ADMIN', 'SUPER_ADMIN'].includes(userRole) ? (
                <>
                    <div onMouseEnter={()=>setDisplayPremiumBadge(true)} onMouseLeave={()=>setDisplayPremiumBadge(false)} className="p-1 bg-amber-300 rounded-full bg-gradient-to-b from-[#FFD36A] via-[#FEB401] via-[#FEB101] to-[#FD7301] relative cursor-pointer">
                          <div className="bg-gradient-to-r from-[#760F6D]/10 to-[#DC1CCC]/10 p-3 rounded-full text-white w-10 h-10 flex items-center justify-center ">{firstName?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase()}
                          </div>
                           {
                                avatarUrl?.length !== 0 &&(
                                  <img
                                    src={avatarUrl}
                                    className='w-full object-contain absolute rounded-full top-0 left-0 scale-90'
                                    />
                                )
                            }
                            
                          <Image
                          src={'/dash/premium-badge.svg'}
                          width={24}
                          height={24}
                          alt="premium badge"
                          className="absolute left-0 -bottom-1.5"
                          />
                          </div>
                          {
                            displayPremiumBadge && premiumBadgeActive && 
                          <div className= {`pt-1 bg-amber-400  w-[190px] absolute top-24 right-5 rounded-lg shadow-lg from-[#FFD36A] via-[#FEB401] via-[#FEB101] to-[#FD7301] transition-opacity duration-500 ease-in-out  ${displayPremiumBadge ? 'opacity-100`' : 'opacity-0 pointer-events-none'}`}>
                          <div className="self-stretch  bg-white max-w-full px-5 py-3 rounded-lg  text-sm text-black/60 font-normal leading-none"
                          > {"Congrats! You're a pro user on connection"} </div> </div>
                }
                </>
                )
                :
                 <div className="bg-gradient-to-r from-[#760F6D] to-[#DC1CCC] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center border-4 border-white/70 relative">
                {
                    avatarUrl?.length !== 0 &&(
                        <img
                        src={avatarUrl}
                        className='w-full object-contain absolute rounded-full top-0 left-0 scale-105'
                        />
                    )
                }
              
                
                {firstName?.charAt(0).toUpperCase()}
                {lastName?.charAt(0).toUpperCase()}
                
                
                </div>
            }
       

            <div className={`self-stretch flex flex-col items-stretch justify-center ${displayName ? 'flex' : verfied ?  'flex' : 'hidden'}`}>
            <div className="flex items-center gap-5 text-black justify-center">
            {
                displayName && (
                    <div className="self-stretch my-auto ">{firstName} {lastName}</div>
                )
            }
            {
            verfied && (
            <svg
              width="18"
              height="18"
              viewBox="3 -1 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            className='w-10 h-10 p-0 '
            >
              <path
                d="M12 2C8.694 2 6 4.694 6 8C6 11.306 8.694 14 12 14C15.306 14 18 11.306 18 8C18 4.694 15.306 2 12 2ZM14.868 6.62L11.466 10.022C11.382 10.106 11.268 10.154 11.148 10.154C11.028 10.154 10.914 10.106 10.83 10.022L9.132 8.324C8.958 8.15 8.958 7.862 9.132 7.688C9.306 7.514 9.594 7.514 9.768 7.688L11.148 9.068L14.232 5.984C14.406 5.81 14.694 5.81 14.868 5.984C15.042 6.158 15.042 6.44 14.868 6.62Z"
                fill="#54A93F"
              />
            </svg>
                )
            }


            </div>

                {/* <div className="text-black/50 text-sm mt-1 hidden">{''}</div> */}
            </div>
        </div>


    );
};

export default CommonAvatar;
