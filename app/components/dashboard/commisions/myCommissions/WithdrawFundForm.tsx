import ActionButton from '@/app/components/ui/ActionButton';
import CustomSelect from '@/app/components/ui/CustomSelect';
import React, { useState } from 'react'

interface WithdrawFormProps {
    onNext: () => void;
    onPrev: () => void;
    setEnteredAmount: React.Dispatch<React.SetStateAction<number>>;
    enteredAmount: number, 
    loading: boolean
  }

  export const WithdrawFundForm: React.FC<WithdrawFormProps> = ({ onNext, onPrev, setEnteredAmount, enteredAmount, loading }) => {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");


  return (
    <div className="w-full text-sm">
    <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.12)] flex w-full flex-col items-stretch rounded-xl pb-5 p-5">
      <h2 className="text-black text-2xl">Withdraw funds</h2>

      <input
        type="number"
        placeholder="Enter Amount (Min $100)"
        value={enteredAmount}
        onChange={(e) =>  setEnteredAmount(Number(e.target.value))}
        className="self-stretch bg-[#F5F5F5] gap-2 text-[#001625] font-bold mt-5 px-4 py-3 rounded-md mx-0.5 placeholder:font-normal"
      />

<CustomSelect
      value={paymentMethod} 
      onValueChange={(value) =>
        setPaymentMethod(value)
      }
      name=""
      options={[
        { value: "payPal", label: "Paypal" },
      ]}
      placeholder="Select Payment Method"
      className='mx-1 max-w-[95%]! focus:ring-[#001625] text-[rgba(102,102,102,1)]! hidden'  
    /> 

      <div className='w-full flex justify-end'>
      <div className="flex min-w-xl items-stretch gap-3 leading-none flex-wrap mt-10 max-md:mt-10">
        <ActionButton onClick={onPrev} variant="secondary" className="flex-grow-0">
          <div className="self-stretch flex items-center gap-3 justify-center my-auto">
            <span>Cancel</span>
          </div>
        </ActionButton>

        <ActionButton onClick={onNext} className="flex-grow">
         {
          loading ? 
          'loading' 
          :
          'Request Withdrawal'
         }
        </ActionButton>
      </div>
      </div>
    </div>
  </div>
  )
}

export default WithdrawFundForm