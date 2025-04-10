import ProceedButtons from '@/app/components/ui/ProceedButtons'
import Image from 'next/image'
import React from 'react'
import IncomeStatCards from './IncomeStatCards'
import WithdrawFundForm from './WithdrawFundForm'
import BankDetailInputs from '../../../KYC/BankDetailInputs'
import KYCPopup from '../../../KYC/KYCPopup'
import SubmitPopup from '../../../KYC/SubmitPopup'

interface IncomeStatsProps {
    onNext: () => void;
    referralBonus : string | number;
  }


  export const IncomeStats: React.FC<IncomeStatsProps> = ({ onNext, referralBonus }) => {
    const handleReqButton = () => {
      if (referralBonus === 0) {
        alert("Earning can be withdrawn only more than $100");
      }
      else {
        onNext();
      } 
    }
  return (
    <div className='w-full max-w-4xl flex flex-col'>
    <IncomeStatCards referralBonus={referralBonus}/>
    <ProceedButtons onClickFunc={handleReqButton} classes='bg-[#001625] w-full! text-center! justify-center! mt-5!'>Request Withdrawl</ProceedButtons>
</div>
  )
}

export default IncomeStats