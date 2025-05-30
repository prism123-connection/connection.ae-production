import React from 'react'
import WithdrawlRow from './WithdrawlRow';

function WithdrawlTable() {

    const payoutData = [
        {
          slNo: "01",
          date: "24th March 2024",
          amountWithdraw: "$1000",
          accountType: "Bank Account",
          balance: "$11000",
        },
        {
          slNo: "02",
          date: "25th March 2024",
          amountWithdraw: "$1000",
          accountType: "Bank Account",
          balance: "$10000",
        }
      ];

  return (
      <div className="w- bg-white overflow-hidden rounded-lg border-[0.6px] border-[#D5D5D5]">
        <div className="bg-[#FCFDFD] p-4 border-[0.6px] border-[#D5D5D5]">
          <div className="grid grid-cols-5 gap-5 place-items-center ">
            <div className="text-[#202224] text-base ">Sl.no</div>
            <div className="text-[#202224] text-base font-semibold opacity-90">
              Date
            </div>
            <div className="text-[#202224] text-base font-semibold ">
             Amount Withdrawn
            </div>
            <div className="text-[#202224] text-base font-semibold ">
             Account Type
            </div>
            <div className="text-[#202224] text-base font-semibold ">
           Balance
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-center py-10">
          <span>You haven't withdrawn yet!</span>
          {/* {payoutData.map((payout) => (
            <WithdrawlRow key={payout.slNo} {...payout} />
          ))} */}
        </div>
      </div>
  )
}

export default WithdrawlTable