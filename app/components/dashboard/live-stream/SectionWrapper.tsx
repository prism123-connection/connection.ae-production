"use client"
import React, { useState } from "react";


// import { ChatWidget } from "./Chat";
import Stream from "./Stream";
import ActionButton from "../../ui/ActionButton";
import StreamProductInfo from "./ProductInfo";



const LiveStreamSection = () => {
  const [buyNowState, setBuyNowState] = useState(false)
  return (
    <div className="flex w-full min-h-screen bg-white justify-center items-center ] ">
      {/* <div className="fixed w-screen min-h-screen top-0 bg-black/10 z-10"/> */}
      <div className="w-full  relative">
        <Stream/>

        <div className="flex justify-between items-start mt-[30px]">
          <StreamProductInfo/>

          <div className="flex flex-col gap-6 w-[565px]">
         

            <div className="flex gap-4">
              <button className=" p-5 flex items-center justify-center  border  rounded-2xl border-[rgba(0,0,0,0.16)] cursor-pointer shrink-0">
              <img
          src="/ecommerce/wishlist.svg"
          alt=""
          className=" object-contain w-5 "
        />
              </button>
              <button className="flex items-center border p-5 rounded-2xl border-[rgba(0,0,0,0.16)] cursor-pointer shrink-0">
              <img
          src="/ecommerce/cart-icon.svg"
          alt=""
          className=" w-5! h-5! object-cover "
        />
              </button>
            {
              !buyNowState ? 
              <button onClick={()=>setBuyNowState(true)} className="flex-[2] bg-[#F48020] text-[#EFEFEF] text-sm font-semibold shadow-[0px_8px_24px_0px_rgba(244,128,32,0.32)] py-4 rounded-xl border-2 border-[rgba(255,255,255,0.25)] cursor-pointer">
              Buy now
            </button>
            : 
            <ActionButton className="w-full" variant="primary">Request Send</ActionButton>
            }
        
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamSection;
