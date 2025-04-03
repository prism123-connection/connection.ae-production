import React from "react";
import { Stream } from "./Stream";
import { StreamProductInfo } from "./ProductInfo";
import { ChatWidget } from "./Chat";

const features = [
  "HyperX mechanical switches",
  "Full aircraft-grade aluminum body",
  "Compact, portable design with detachable USB-C cable",
  "RGB backlit keys with radiant lighting effects",
  "Advanced customization with HyperX NGENUITY Software",
  "Three adjustable keyboard tilt angles",
  "Onboard memory for three profiles",
  "With 2 Year Warranty",
];

const LiveStreamSection = () => {
  return (
    <div className="flex w-full min-h-screen bg-white justify-center items-center ">
      <div className="w-full  relative">
        <Stream
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/119f50d206c553ce2f60a95e7d208ef91a2a5d91"
          altText="Bigbang S1 Keyboard"
        />

        <div className="flex justify-between items-start mt-[30px]">
          <StreamProductInfo
            sellerImage="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/a6de1b7a6a5b82bc04506662bc0ee6bc729a6663?placeholderIfAbsent=true"
            // sellerImage="https://cdn.builder.io/api/v1/image/assets/TEMP/6b1f363aa5b9a24f1982bc76860d630f1b6ce993"
            sellerName="Stephen M"
            location="UK"
            title="AK-900 Wired Keyboard"
            description="1000 SKUs | Compact keyboard featuring custom HyperX mechanical switches."
            features={features}
          />

          <div className="flex flex-col gap-6 w-[565px]">
         

            <div className="flex gap-4">
              <button className=" p-5 flex items-center justify-center  border  rounded-2xl border-[rgba(0,0,0,0.16)]">
              <img
          src="/ecommerce/wishlist.svg"
          alt=""
          className=" object-contain w-5 "
        />
              </button>
              <button className="flex items-center border p-5 rounded-2xl border-[rgba(0,0,0,0.16)]">
              <img
          src="/ecommerce/cart-icon.svg"
          alt=""
          className=" w-5! h-5! object-cover "
        />
              </button>
              <button className="flex-[2] bg-[#F48020] text-[#EFEFEF] text-sm font-semibold shadow-[0px_8px_24px_0px_rgba(244,128,32,0.32)] py-4 rounded-xl border-2 border-[rgba(255,255,255,0.25)] cursor-pointer">
                Buy now
              </button>
            </div>

            <ChatWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamSection;
