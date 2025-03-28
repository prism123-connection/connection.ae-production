import React from 'react'

function TotalEarningCommission() {
  return (
    <div className="bg-white shadow-md mb-5 p-8 rounded-xl w-full">
    <div className="text-sm text-[#001625] mb-2">Total Earnings</div>
    <div className="flex items-center gap-3 mb-8">
      <div className="text-[32px] text-[#001625]">100,00</div>
      <div className="bg-[#F2FCF8] rounded px-3 py-1.5">
        <div className="flex items-center gap-1.5 text-sm text-[#22A77E]">
          <svg
            className="w-[16px] h-[16px] stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
          <span>8.38%</span>
        </div>
      </div>
    </div>
    <div className="border bg-[#F6F8FA] flex items-center justify-between p-6 rounded-xl border-[#E0E8F1]">
      <div className="text-sm text-[#001625] underline cursor-pointer">
        View total earnings
      </div>
      <button className="flex items-center gap-2 bg-[#0C87D6] text-white shadow-[0px_6px_12px_0px_rgba(12,135,214,0.20)] px-6 py-3 rounded-xl border-2 border-[rgba(255,255,255,0.24)]">
        <span>Withdraw earnings</span>
        <svg
          className="w-[20px] h-[20px] stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
    </div>
  </div>
  )
}

export default TotalEarningCommission