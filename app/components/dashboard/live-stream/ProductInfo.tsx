"use client"
import React, { Suspense, useEffect, useState } from "react";
import { StarRating } from "@/app/components/ui/StarRating";
import { useSearchParams } from "next/navigation";
import { getProductById } from "@/lib/ecommerce/ecommerceHelper";
import CommonAvatar from "../../ui/CommonAvatar";


type Product = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  goLiveAt: string;      // Use `string` if it's serialized JSON from API
  createdAt: string;

  userId: string;
  user: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    role? : string; 
  };

  tags: {
    id: string;
    value: string;
  }[];

  productImages: {
    id: string;
    url: string;
    createdAt: string;
  }[];
};
const StreamProductInfoContent: React.FC<{}> = ({

}) => {
    const searchParams = useSearchParams();
    const id = searchParams.get('productId') ?? '';  
      const [product, setProduct] = useState<Product | null>(null);
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(false)

      useEffect(() => {
        if (!id) return;
      
        setLoading(true);
      
        getProductById(id)
          .then((data) => {
            console.log('data from live stream product info ' ,data)
            setProduct(data);
          })
          .catch((err) => {
            setError('Failed to load product');
          })
          .finally(() => {
            setLoading(false);
          });
      
      }, [id]);

  return (
    loading ?
    <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
    <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
  </div>
  :
    <div className="flex-1">
      <h1 className="text-5xl font-semibold leading-[72px] mb-2">{product?.name}</h1>
      <CommonAvatar firstName={product?.user?.firstName} lastName={product?.user?.lastName} avatarUrl={product?.user?.avatarUrl} userRole={product?.user?.role} displayName={true} verfied={true} />
      <div className="text-base text-[#272727] opacity-60 mb-4 mt-5">
        {product?.shortDescription}
      </div>
         <div className="flex items-center gap-4 mb-2">
              <div className="text-[#225CCA] text-[32px] font-semibold">
                {product?.price}
              </div>
              <div className="text-[rgba(0,0,0,0.5)] text-sm line-through hidden">
                $160
              </div>
            </div>
      <div className="mb-8">
        <StarRating rating={4} reviews={75} />
      </div>
      <div className="text-base text-[#001625] leading-[27.2px]">
       {product?.description}
      </div>
    </div>
  );
};

export default function StreamProductInfo() {
  return (
    <Suspense fallback={<div>Loading Live Page...</div>}>
      <StreamProductInfoContent/>
    </Suspense>
  );
}