"use client"
import React from 'react'
import ActionButton from '../../../ui/ActionButton'
import { useRouter } from 'next/navigation'


function EcomHeader() {
  const router = useRouter()
  return (
    <div className="flex gap-5 w-full items-center justify-between">
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-base text-black opacity-50 cursor-pointer"
      aria-label="Go back"
    >
      <svg
        className="w-[20px] h-[20px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      <span className='text-sm'>Back</span>
    </button>
    
    <div className='flex gap-5'>
    <ActionButton onClick={()=>router.push('/ecommerce/details')} variant='secondary' className="border-[#000]/30! border-1.5! hover:shadow-xl! px-5! ">
        <img
          src="/ecommerce/settings-icon.svg"
          alt=""
          className=" w-5! h-5! object-cover "
        />
      </ActionButton>
      <ActionButton onClick={()=>router.push('/ecommerce/cart')} variant='secondary' className="border-[#000]/30! border-1.5! hover:shadow-xl! hidden">
        <img
          src="/ecommerce/cart-icon.svg"
          alt=""
          className=" w-5! h-5! object-cover "
        />
      </ActionButton>
      <ActionButton onClick={()=>router.push('/ecommerce/details')} variant='secondary' className="border-[#000]/30! border-1.5! hover:shadow-xl! ">
        Your wishlist
        <img
          src="/ecommerce/wishlist.svg"
          alt=""
          className="aspect-[0.89] object-contain w-4 self-stretch my-auto"
        />
      </ActionButton>

      <ActionButton
      onClick={()=>router.push('/listproducts')}
      className='bg-[#02070C] '
        variant="primary"
      >
        List your products
        <img
          src="/ecommerce/upload-product.svg"
          alt=""
          className="aspect-[0.89] object-contain w-4 self-stretch my-auto"
        />
      </ActionButton>
      </div>
  </div>
  )
}

export default EcomHeader