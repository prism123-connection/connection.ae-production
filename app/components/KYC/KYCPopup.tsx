import ActionButton from '@/app/components/ui/ActionButton';
import { FormSection } from '@/app/components/ui/FormSection';
import React from 'react'

interface KYCPopupProps {
  onNext: () => void;
  onPrev: () => void;
}

const KYCPopup: React.FC<KYCPopupProps> = ({ onNext, onPrev }) => {
  return (
    <FormSection
       title="Withdraw your earnings to your account"
       subtitle="Please provide the required details to proceed with the withdrawal."
       onPrev={onPrev}
     >
      <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full"> Complete KYC</span>

      <div className='w-full px-10 my-10 overflow-hidden'>
       <ActionButton onClick={onNext} className="mt-10 max-md:mt-10 w-full">
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

export default KYCPopup