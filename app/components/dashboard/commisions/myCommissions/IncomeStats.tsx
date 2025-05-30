import ProceedButtons from '@/app/components/ui/ProceedButtons'
import Image from 'next/image'
import React from 'react'
import IncomeStatCards from './IncomeStatCards'
import WithdrawFundForm from './WithdrawFundForm'
import BankDetailInputs from '../../../KYC/BankDetailInputs'
import KYCPopup from '../../../KYC/KYCPopup'
import SubmitPopup from '../../../KYC/SubmitPopup'
import { toast } from 'sonner'

interface IncomeStatsProps {
    onNext: () => void;
    totalEarning : string | number;
    walletBalance: string | number;
  }


  export const IncomeStats: React.FC<IncomeStatsProps> = ({ onNext, totalEarning , walletBalance}) => {

  return (
    <div className='w-full max-w-4xl flex flex-col'>
    <IncomeStatCards walletBalance={walletBalance} referralBonus={totalEarning}/>
    <ProceedButtons onClickFunc={onNext} classes='bg-[#001625] w-full! text-center! justify-center! mt-5!'>Request Withdrawl</ProceedButtons>
</div>
  )
}

export default IncomeStats