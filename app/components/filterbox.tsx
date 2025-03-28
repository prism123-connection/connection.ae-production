import React from 'react'

function Filterbox() {
  return (
    <div className="flex items-center justify-between mb-5 max-sm:flex-col max-sm:gap-4">
    <div className="relative inline-flex items-center gap-[18px] bg-[#F9F9FB] px-4 py-3 rounded-[10px] border-[0.6px] border-[#D5D5D5]">
      <div className="flex items-center gap-2">
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <span className="text-sm text-[#001625]">Past 30 days</span>
      </div>
      <svg
        className="w-[20px] h-[20px] stroke-[#000]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  </div>
  )
}

export default Filterbox