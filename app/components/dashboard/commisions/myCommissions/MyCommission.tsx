import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'
import IncomeStats from './IncomeStats'
import WithdrawFundForm from './WithdrawFundForm'
import BankDetailInputs from '../../../KYC/BankDetailInputs'
import KYCPopup from '../../../KYC/KYCPopup'
import SubmitPopup from '../../../KYC/SubmitPopup'
import CommissionHistory from './CommissionHistory'
import KYCInfoCard from '@/app/components/KYC/KycInfoCard'
import { useUser } from '@/context/UserContext'
import { requestWithdrawal } from '@/lib/withdrawal/helper'
import { toast } from 'sonner'

interface myCommissionProps {
  referralBonus : string | number;
  walletBalance : string | number; 
}

const   MyCommission : React.FC<myCommissionProps> = ({  referralBonus, walletBalance }) => {
  const [step, setstep] = useState(1) 
  const { user, loading } = useUser();
 const [enteredAmount, setEnteredAmount] = useState<number>(0);
  const [completeKycPopup, setCompleteKycPopup] = useState(false); 
  const [loadingState, setLoadingState] = useState(false)

  const onNextFunc = async () =>{
    if (step === 2) {
      if (enteredAmount < 100) {
        toast.error('Minimum withdrawal amount need to be set at $100')
        return; 
      }
      if (enteredAmount > Number(walletBalance)) {
        toast.error('Cant withdraw more than balance')
        return; 
      }
      if (user?.kycDone) {
        setLoadingState(true)
        const res = await requestWithdrawal(enteredAmount)
        console.log('res', res)
        if (res.status === 201) {
          toast.success('Withdrawal request successfully submitted')
          setLoadingState(false)
          setEnteredAmount(0)
          window.location.reload()
          return; 
        } else {
          toast.error('something went wrong, please try again')
          setLoadingState(false)
        }
      } else {
        setstep(3)
      }
    }
  }

  const handleRequestButton = () =>{
  if (Number(walletBalance) < 100) {
        toast.error("Earning can be withdrawn only more than $100");
        return; 
    }else {
      setstep(2)
    }
  }

  

  return (
    <SectionHeader classes='overflow-hidden justify-start items-start  gap-10 w-full! pb-20!'>
      {step === 1 && <IncomeStats walletBalance={walletBalance} totalEarning={referralBonus} onNext={handleRequestButton} />}
      {step === 2 && <WithdrawFundForm loading={loadingState} enteredAmount={enteredAmount} setEnteredAmount={setEnteredAmount} onNext={onNextFunc} onPrev={()=>setstep(1)}/>}
      {step === 3 && <KYCInfoCard/>}
      
    <CommissionHistory/>
    </SectionHeader>
  )
}

export default MyCommission