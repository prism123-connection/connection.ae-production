import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import React, { useState } from 'react'

interface BankDetailInputsProps {
  onNext: () => void;
  onPrev: () => void;
}

const BankDetailInputs: React.FC<BankDetailInputsProps> = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    iban: "",
    accountNumber: "",
    currency: "",
    swiftCode: "",
    routingNumber: "",
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <FormSection
    title="Withdraw your earnings to your account"
    subtitle="Please provide the required details to proceed with the withdrawal."
    onPrev={onPrev}
  >
    <div className="flex w-full flex-col items-stretch text-xs text-[rgba(31,88,124,1)]  py-10  max-md:max-w-full  max-md:px-5 px-20 ">
      <FormInput
        label="IBAN"
        value={formData.iban}
        onChange={handleInputChange("iban")}
      />
      <FormInput
        label="Account number"
        value={formData.accountNumber}
        onChange={handleInputChange("accountNumber")}
      />
      <FormInput
        label="Currency"
        value={formData.currency}
        onChange={handleInputChange("currency")}
      />
      <FormInput
        label="Swift code"
        value={formData.swiftCode}
        onChange={handleInputChange("swiftCode")}
      />
      <FormInput
        label="Routing number"
        value={formData.routingNumber}
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