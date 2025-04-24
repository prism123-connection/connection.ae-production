"use client"
import ProceedButtons from '@/app/components/ui/ProceedButtons';
import { fetchData, updateOnboardRole } from '@/lib/helper';
import Loader from "@/app/components/loader";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function OnBoardingPage() {

  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState({
    firstName : '', 
    lastName : ''
  })
  const [error, setError] = useState(false);
  const imgLink = ''

  const fetchPageData = async () => {
    try {
      const response = await fetchData("user/setup_data");

      if (response.user) {
        setuser({
          firstName: response.user.firstName || '',
          lastName: response.user.lastName || ''
        });
      }

    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(true);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    fetchPageData();
    return () => clearTimeout(timer);
  }, []);


  const handleEnter = async () => {
    setLoading(true)
    const result = await updateOnboardRole(imgLink, user.firstName , user.lastName);
    if (result.success) {
      router.push("/auth/pricing");
    } else {
      toast.error(result.message || "Profile update failed.");
    }
  }

  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-1/2 h-screen overflow-y-auto p-6 custom-scrollbar flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">
              An error occurred!
            </h2>
            <p className="mt-4 text-gray-600">
              We were unable to load your data. Please try again.
            </p>
            <button
              onClick={() => {
                setError(false);
                fetchPageData();
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Retry
            </button>
          </div>
        </div>
        <div className="w-1/2 overflow-hidden">
          <Image
            src="/logo.svg"
            alt="Account Setup"
            width={500}
            height={500}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className=" w-full flex bg-[#51C2FF]/10 relative justify-center items-center min-h-screen overflow-hidden!">
        <div className="w-1/3 overflow-hidden aspect-square absolute fast-rotate-animation">
          <Image
            src="/logo.svg"
            alt="Account Setup"
            width={500}
            height={500}
            className="w-full h-full p-6 object-contain rounded-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={` w-full flex bg-[#51C2FF]/10 relative justify-center min-h-screen overflow-hidden! ${loading ? 'items-center' : 'items-start'}`}>

      <div className="w-full bg-white/10  z-10 backdrop-blur-xl mx-20 my-10 p-4 rounded-4xl flex items-center justify-center  min-h-full! ">
        <div className="w-full  bg-white/50  z-10 backdrop-blur-xl  rounded-4xl flex flex-col items-center justify-start py-20 h-full">

          {
            loading &&
            <div className="text-5xl font-semibold bg-gradient-to-r from-[#51C2FF] via-[#A9EE86] to-[#FFA442] text-transparent bg-clip-text  decoration-[#51C2FF] leading-20 fade-text w-full! text-center"> Acount setup finished </div>
          }

          <span className={`text-5xl font-semibold bg-gradient-to-r from-[#51C2FF] via-[#A9EE86] to-[#FFA442] text-transparent bg-clip-text  decoration-[#51C2FF] leading-20 transition-opacity duration-2000 text-center ${loading ? 'opacity-0' : 'opacity-100'} `}>Welcome on board! {user.firstName} {" "} {user.lastName} </span>

          {
            !loading &&
            <div className='w-full flex items-center justify-center flex-col gap-5 hidden'>
              <span className="text-base mt-4 text-[#333333]/60 ">Lets add a profile picture!</span>
              <Image
                src={'/auth/image_input.png'}
                width={100}
                height={100}
                alt='image input'
              />
              <div className='flex gap-5'>
                <ProceedButtons onClickFunc={handleEnter} classes='bg-white! text-black! shadow-none! border-2! ' > Skip</ProceedButtons>
                <ProceedButtons onClickFunc={handleEnter} classes='bg-[#001625]!' > Enter Connection	&#10230;</ProceedButtons>
              </div>
            </div>
          }

          <div className='w-full flex items-center justify-center flex-col gap-5'>
            <span className="text-base mt-4 text-[#333333]/80 font-semibold px-60 text-center ">You’ve just taken your first big step into a world of real business opportunities, global connections, and growth without limits — and we couldn’t be more excited to have you with us.</span>
              <ProceedButtons onClickFunc={handleEnter} classes='bg-[#001625]!' > Enter Connection	&#10230;</ProceedButtons>
          </div>

        </div>
      </div>


      <div className={`w-2/3 overflow-hidden aspect-square absolute top-2/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-animation  transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src="/logo.svg"
          alt="Account Setup"
          width={500}
          height={500}
          className="w-full h-full p-6 object-contain rounded-md"
        />
      </div>
      <div className={`absolute -top-20 -translate-y-1/2 -left-[12vw] w-[40vw] h-[25vw] bg-[#81FFD9] blur-3xl rounded-full transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-50'}`} />




    </div>
  )
}

export default OnBoardingPage