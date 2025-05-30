import React from 'react'
import LineChartCommission from './LineChartCommission'

function AnalyticsChartCommission() {
  return (
    <div className="bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12)] p-8 rounded-xl w-full">
    <div className="flex items-center gap-8 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#00A9DF] rounded-full" />
        <span className="text-sm text-[#001625]">Members reffered</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#F9D11B] rounded-full" />
        <span className="text-sm text-[#001625]">Commissions</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#06B079] rounded-full" />
        <span className="text-sm text-[#001625]">Earnings</span>
      </div>
      <div className="ml-auto">
        <div className="inline-flex items-center bg-[#F9F9FB] px-4 py-3 rounded-[10px] border-[0.6px] border-[#D5D5D5]">
          <span className="text-sm text-[#001625]">Last week</span>
          <svg
            className="w-[24px] h-[24px] stroke-[#000] ml-[8px]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
    <div className="relative  mb-4 min-h-[200px]">
      {/* <LineChartCommission/> */}
      {/* Chart implementation would go here - using a placeholder for now */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-[#F6F8FA] rounded-lg" />
      </div>
      <div className="text-sm text-[#001625] absolute bg-[0.32] border px-4 py-3 rounded-lg border-[#E0E8F1] right-8 top-6">
        Members referred: 12
      </div>
    </div>
  </div>
  )
}

export default AnalyticsChartCommission