import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import React, { useState } from 'react'

type errorFields = "contactPerson" | "designation" | "contactNumber" | "email" | "website" 

interface contactDetailsProps {
    contactPersonName: string;
    contactDesignation: string;
    contactNumber: string;
    contactEmail: string;
    contactWebsite: string;
    handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
    onPrev: () => void;
    errors?: Partial<Record<errorFields, string>>;
  }


const KycContactDetails: React.FC<contactDetailsProps> = ({ 
    contactPersonName,
    contactDesignation,
    contactNumber,
    contactEmail,
    contactWebsite,
    handleInputChange,
    onNext,
    onPrev,
    errors
 }) => {



  return (
    <FormSection
      title="KYC Details"
      subtitle="Please provide the required KYC details to proceed with the withdrawal."
      onPrev={onPrev}
    >
      <div className="flex w-full flex-col items-stretch text-xs text-[rgba(31,88,124,1)] py-10 max-md:max-w-full max-md:px-5 px-20 gap-5">

        <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full">Contact Details</span>

        <FormInput label="Primary Contact Person Name" value={contactPersonName} onChange={handleInputChange('contactPerson')} error={errors?.contactPerson}/>
        <FormInput label="Designation" value={contactDesignation} onChange={handleInputChange('designation')} error={errors?.designation}/>
        <FormInput label="Contact Number" value={contactNumber} onChange={handleInputChange('contactNumber')} error={errors?.contactNumber}/>
        <FormInput label="Email Address" value={contactEmail} onChange={handleInputChange('email')} error={errors?.email}/>
        <FormInput label="Website (optional)" value={contactWebsite} onChange={handleInputChange('website')} error={errors?.website} />

        <div className="flex flow-row w-full gap-5 mt-5">
          <ActionButton onClick={onPrev} variant="secondary" className="rounded-lg!">
            Back
          </ActionButton>
          <ActionButton onClick={onNext} className="w-full!">
            <span>Next</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/8976e1b0d179b0baed70adc8f769a77635f2234f?placeholderIfAbsent=true"
              alt="Next arrow"
              className="aspect-[2.33] object-contain w-3.5"
            />
          </ActionButton>
        </div>
      </div>
    </FormSection>
  )
}

export default KycContactDetails