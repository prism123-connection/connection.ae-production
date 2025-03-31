import ProceedButtons from '@/app/components/ui/ProceedButtons'
import Image from 'next/image'
import React from 'react'
import IncomeStatCards from './IncomeStatCards'
import WithdrawFundForm from './WithdrawFundForm'
import BankDetailInputs from './BankDetailInputs'
import KYCPopup from './KYCPopup'
import SubmitPopup from './SubmitPopup'

interface IncomeStatsProps {
    onNext: () => void;
  }


  export const IncomeStats: React.FC<IncomeStatsProps> = ({ onNext }) => {
  return (
    <div className='w-full max-w-4xl flex flex-col'>
    <IncomeStatCards/>
    <ProceedButtons onClickFunc={onNext} classes='bg-[#001625] w-full! text-center! justify-center! mt-5!'>Request Withdrawl</ProceedButtons>
</div>
  )
}

export default IncomeStats