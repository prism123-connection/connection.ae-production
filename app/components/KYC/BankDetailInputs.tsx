import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import React, { useState } from 'react'

interface BankDetailInputsProps {
  iban: string;
  accountNumber: string;
  swiftCode: string;
  routingNumber: string;
  handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}


const BankDetailInputs: React.FC<BankDetailInputsProps> = ({ 
  iban,
  accountNumber,
  swiftCode,
  routingNumber,
  handleInputChange, 
  onNext,
  onPrev,
 }) => {



  return (
    <FormSection
    title="KYC Details"
    subtitle="Please provide the required KYC details to proceed with the withdrawal."
    onPrev={onPrev}
  >
    <div className="flex w-full flex-col items-stretch text-xs gap-5 text-[rgba(31,88,124,1)]  py-10  max-md:max-w-full  max-md:px-5 px-20 ">
    <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full"> Bank Details </span>
      <FormInput
        label="IBAN"
        value={iban}
        onChange={handleInputChange("iban")} 
      />
      <FormInput
        label="Account number"
        value={accountNumber}
        onChange={handleInputChange("accountNumber")}
      />
      <FormInput
        label="Swift code"
        value={swiftCode}
        onChange={handleInputChange("swiftCode")}
      />
      <FormInput
        label="Routing number"
        value={routingNumber}
        onChange={handleInputChange("routingNumber")}
      />

      <ActionButton onClick={onNext} className="mt-10 max-md:mt-10">
        <span>Next</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/8976e1b0d179b0baed70adc8f769a77635f2234f?placeholderIfAbsent=true"
          alt="Next arrow"
          className="aspect-[2.33] object-contain w-3.5"
        />
      </ActionButton>
    </div>
  </FormSection>
  )
}

export default BankDetailInputs