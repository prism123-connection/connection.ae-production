import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'
import IncomeStats from './IncomeStats'
import WithdrawFundForm from './WithdrawFundForm'
import BankDetailInputs from '../../../KYC/BankDetailInputs'
import KYCPopup from '../../../KYC/KYCPopup'
import SubmitPopup from '../../../KYC/SubmitPopup'
import CommissionHistory from './CommissionHistory'
import KYCInfoCard from '@/app/components/KYC/KycInfoCard'

interface myCommissionProps {
  referralBonus : string | number;
}

const   MyCommission : React.FC<myCommissionProps> = ({  referralBonus }) => {
  const [step, setstep] = useState(1) 
  const [completeKycPopup, setCompleteKycPopup] = useState(false)

  

  return (
    <SectionHeader classes='overflow-hidden justify-start items-start  gap-10 w-full! pb-20!'>
      {step === 1 && <IncomeStats referralBonus={referralBonus} onNext={()=>setstep(2)} />}
      {step === 2 && <WithdrawFundForm onNext={()=>setstep(3)} onPrev={()=>setstep(1)}/>}
      {step === 3 && <KYCInfoCard/>}
      
    <CommissionHistory/>
    </SectionHeader>
  )
}

export default MyCommission