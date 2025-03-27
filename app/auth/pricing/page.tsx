"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { PricingContainer } from "../../components/PricingContainer";
import Loader from "@/app/components/loader";

const PricingPage = () => {
  const [loading, setLoading] = useState(false);

      
  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center ">
        <div className="w-1/2 h-screen overflow-y-auto p-6 custom-scrollbar flex justify-center items-center">
          <Loader/>
        </div>
        <div className="w-1/2 overflow-hidden">
          <Image
            src="/logo.svg"
            alt="Account Setup"
            width={500}
            height={500}
            className="w-full h-full object-contain rounded-md k"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-1/2 fixed top-0 left-0">
        <Link href={"/"}>
          <button className="rounded-md px-6 text-black backdrop-blur bg-opacity-30 bg-white border border-black/70 opacity-70 absolute top-8 left-8 z-10 flex items-center py-2 gap-2">
            <BiChevronLeft className="opacity-70" />
            <span className="text-sm opacity-70"> Back to Website</span>
          </button>
        </Link>
      </div>

      <div className="w-full ml-auto flex justify-center items-center -white text-black overflow-y-auto bg-white flex-col
      ">
       {/* Add next component here */}
 
        <PricingContainer setLoading={setLoading}/>
      </div>
    </div>
  );
};

export default PricingPage;
