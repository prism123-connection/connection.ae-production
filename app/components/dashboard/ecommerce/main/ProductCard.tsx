"use client"
import { useRouter } from "next/navigation";
import React from "react";
// import { StarRating } from "./star-rating";

interface ProductCardProps {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  // goLiveAt: Date;
  // createdAt: Date;
  // user: {
  //   id: string;
  //   name: string; // Assuming `User` has a `name` field, adjust if needed
  //   email?: string; // Optional if needed for display
  // };
  // tags: {
  //   id: string;
  //   value: string;
  // }[];
  productImages: {
    url: string;
  }[];
}

export const EcommerceProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  shortDescription,
  description,
  price,
  currency,
  category,
  // goLiveAt,
  // createdAt,
  // user,
  // tags,
  productImages,
}) => {
  const router = useRouter()
  
  return (
    <div onClick={() => router.push(`/ecommerce/productdetails?id=${id}`)} className="flex flex-col gap-4 group cursor-pointer min-h-[320px] max-h-[320px] ">
      <div className="relative rounded-lg min-h-[250px] flex justify-center items-center bg-white">
        {/* {discount && ( */}
          <div className="absolute text-neutral-50 rounded text-xs bg-[#DB4444] px-3 py-1 left-3 top-3">
            -{10}%
          </div>
        {/* // )} */}
        <div className="absolute flex flex-col gap-2 right-2  top-3">
          <button className="w-[35px] h-[35px] flex justify-center items-center rounded-[100%] cursor-pointer  bg-white hover:bg-gray-100">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z" />
            </svg>
          </button>
          <button className="w-[34px] h-[34px] flex justify-center items-center cursor-pointer rounded-[100%] bg-white hover:bg-gray-100">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M26.2565 15.962C26.7305 16.582 26.7305 17.419 26.2565 18.038C24.7635 19.987 21.1815 24 16.9995 24C12.8175 24 9.23552 19.987 7.74252 18.038C7.51191 17.7411 7.38672 17.3759 7.38672 17C7.38672 16.6241 7.51191 16.2589 7.74252 15.962C9.23552 14.013 12.8175 10 16.9995 10C21.1815 10 24.7635 14.013 26.2565 15.962Z" />
              <path d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z" />
            </svg>
          </button>
        </div>
        {
          productImages &&  productImages[0].url &&
          <img
          src={productImages[0].url}
          alt={name}
          className="max-w-[100%] max-h-[90%] object-contain"
        />

        }
   
       
          <div className="absolute text-white text-center text-base bg-[#F48020] px-0 py-2 bottom-0 opacity-0 inset-x-0  group-hover:opacity-100 transition-opacity duration-500">
            Join the live
          </div>
    
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-base text-black">
          {name}
          {/* {skus && ( */}
          <span className="text-[rgba(0,0,0,0.5)] ml-1">{'1000'} SKUs</span>
          {/* // )} */}
        </div>
        <div className="flex gap-3">
          <span className="text-base text-[#DB4444]">${price}</span>
          {/* {/* {originalPrice && ( */}
            <span className="text-base text-black line-through opacity-50">
              ${'100'}
            </span>
          {/* // )} */}
        </div>
        {/* <StarRating rating={rating} reviews={reviews} /> */}
      </div>
    </div>
  );
};