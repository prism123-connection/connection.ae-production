import ActionButton from '@/app/components/ui/ActionButton'
import { FormSection } from '@/app/components/ui/FormSection'
import React from 'react'

interface KYCPopupProps {
  onPrev: () => void;
}


const SubmitPopup: React.FC<KYCPopupProps> = ({  onPrev }) => {
  return (
    <FormSection onPrev={onPrev} subtitle='' title='Form Submitted!'>

          <div className="flex flex-col items-stretch px-10 max-md:max-w-full mt-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/2f0767c4ba9090a36605bdc291bde55f35e205c9?placeholderIfAbsent=true"
              alt="Success illustration"
              className="aspect-[1.13] object-contain w-64 self-center max-w-full"
            />
            <p className="mt-3.5 max-md:max-w-full text-center">
              Thank you for submitting your details. <br/> Please wait while your
              KYC request is approved.
            </p>
          </div>
    
        <div className='w-full px-10 my-10 overflow-hidden'>
        <ActionButton  variant='success' onClick={onPrev}  className="self-stretch mt-4 w-full">
          Done
        </ActionButton>
        </div>
    </FormSection>
  )
}

export default SubmitPopup