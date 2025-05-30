import React from 'react'
interface WithdrawlRowProps {
    slNo: string;
    date: string;
    amountWithdraw: string;
    accountType: string;
    balance: string;
  }

export const WithdrawlRow: React.FC<WithdrawlRowProps> = ({
  slNo,
  date,
  amountWithdraw,
  accountType,
  balance,
}) => {
  return (
    <div className="grid grid-cols-5 gap-5 py-3 border-[0.6] border-[#979797] place-items-center">
         <div className="text-[#202224] text-base ">{slNo}</div>
         <div className="text-[#202224] text-base ">{date}</div>
         <div className="text-[#202224] text-base ">{amountWithdraw}</div>
         <div className="text-[#202224] text-base font-bold "> {accountType} </div>
         <div className="text-[#202224] text-sm">{balance}</div>
         <div>
         </div>
     
       </div>
  )
}

export default WithdrawlRow