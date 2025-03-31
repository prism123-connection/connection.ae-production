import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'
import IncomeStats from './IncomeStats'
import WithdrawFundForm from './WithdrawFundForm'
import BankDetailInputs from './BankDetailInputs'
import KYCPopup from './KYCPopup'
import SubmitPopup from './SubmitPopup'
import CommissionHistory from './CommissionHistory'

function MyCommission() {
  const [step, setstep] = useState(1) 
  return (
    <SectionHeader classes='overflow-hidden justify-start items-start  gap-10 w-full! pb-20!'>
      {step === 1 && <IncomeStats onNext={()=>setstep(2)} />}
      {step === 2 && <WithdrawFundForm onNext={()=>setstep(3)} onPrev={()=>setstep(1)}/>}
      {step === 3 && <BankDetailInputs onNext={()=>setstep(4)} onPrev={()=>setstep(2)}/>}
      {step === 4 && <KYCPopup onNext={()=>setstep(5)} onPrev={()=>setstep(2)}/>}
      {step === 5 && <SubmitPopup onPrev={()=>setstep(1)} />}
    <CommissionHistory/>
    </SectionHeader>
  )
}

export default MyCommission