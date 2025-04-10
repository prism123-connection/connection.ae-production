import ProceedButtons from '@/app/components/ui/ProceedButtons'
import React from 'react'


interface CommissionDashbaordProps {
  setActiveTab: (tabIndex: number) => void;
  totalEarning : string | number;
}


const  TotalEarningCommission: React.FC<CommissionDashbaordProps> = ({ setActiveTab , totalEarning}) => {
  const onClickFunc = () => {
    setActiveTab(2); // Change tab
    window.scrollTo({ top: 0, behavior: "instant" }); // Scroll to top smoothly
  };
  return (
    <div className="bg-white shadow-md mb-5 p-8 rounded-xl w-full">
    <div className="text-sm text-[#001625] mb-2">Total Earnings</div>
    <div className="flex items-center gap-3 mb-8">
      <div className="text-[32px] text-[#001625]">${totalEarning}</div>
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

      <ProceedButtons onClickFunc={onClickFunc} classes='bg-[#001625] gap-2!  py-3! text-base!'>
      Cashout Earning
    
      </ProceedButtons>

    </div>
  </div>
  )
}

export default TotalEarningCommission