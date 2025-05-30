import React from 'react'
import { CommissionHistoryTable } from './TableCommissionHistory'

function CommissionHistory() {
  return (
    <div className="flex w-full  bg-white flex-col justify-center items-center gap-5 p-2.5">
      <div className="w-full">
        <div className="text-black text-2xl font-semibold leading-9 mb-5">
          Your Commission History
        </div>
        <CommissionHistoryTable/>
      </div>
    </div>
  )
}

export default CommissionHistory