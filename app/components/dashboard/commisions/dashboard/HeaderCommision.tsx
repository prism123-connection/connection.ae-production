"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function CommissionHeader() {
  const router = useRouter()
  return (
    <>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-base text-black opacity-50 cursor-pointer mb-5 "
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
      <header className="flex items-center gap-5 mb-5">
        <div className="w-1 h-[30px] bg-[#111] rounded-full" />
        <h1 className="text-3xl font-semibold text-black max-md:text-[28px] max-sm:text-2xl">
          Commission Overview
        </h1>
      </header>
    </>
  )
}

export default CommissionHeader