import React from 'react'
import { PayoutTable } from './PayoutTable'

function PayoutHistory() {
  return (
    <div className="flex w-full  bg-white flex-col justify-center items-center gap-5 p-2.5">
      <div className="w-full">
        <div className="text-black text-2xl font-semibold leading-9 mb-5">
          Your payout history
        </div>
        <PayoutTable/>
      </div>
    </div>
  )
}

export default PayoutHistory