import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import React, { useState } from 'react'


type errorFields = "entityName" | "crTlNumber" | "crTlExpiryDate" | "incorporationDate" | "incorporationCountry" | "entityType" | "registeredAddress" | "operationalAddress";


interface EntityInformationsProps {
    errors?: Partial<Record<errorFields, string>>;
    entityName: string;
    crTlNumber: string;
    crTlExpiryDate: string;
    incorporationDate: string;
    incorporationCountry: string;
    entityType: string;
    registeredAddress: string;
    operationalAddress: string;
    handleInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
    onPrev: () => void;
  }


const EntityInformations: React.FC<EntityInformationsProps> = ({ 
    entityName,
    crTlNumber,
    crTlExpiryDate,
    incorporationDate,
    incorporationCountry,
    entityType,
    registeredAddress,
    operationalAddress,
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
    <div className="flex w-full flex-col items-stretch text-xs text-[rgba(31,88,124,1)]  py-10  max-md:max-w-full  max-md:px-5 px-20 gap-5 ">
    <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full"> Entity Informations </span>
    <FormInput
          label="Entity name (Legal Name)"
          value={entityName}
          onChange={handleInputChange("entityName")}
          error={errors?.entityName}
        />
        <FormInput
          label="Commercial Registration / TL Number"
          value={crTlNumber}
          onChange={handleInputChange("crTlNumber")}
          error={errors?.crTlNumber}
        />
        <div className="flex gap-4 w-full">
          <div className="w-1/2">
            <FormInput
              label="Date of Expiry of CR/TL"
              value={crTlExpiryDate}
              onChange={handleInputChange("crTlExpiryDate")}
              type="date"
              error={errors?.crTlExpiryDate}
            />
          </div>
          <div className="w-1/2">
            <FormInput
              label="Date of Incorporation"
              value={incorporationDate}
              onChange={handleInputChange("incorporationDate")}
              type="date"
                error={errors?.incorporationDate}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <FormInput
              label="Country of Incorporation"
              value={incorporationCountry}
              onChange={handleInputChange("incorporationCountry")}
                error={errors?.incorporationCountry}
            />
          </div>
          <div className="w-1/2">
            <FormInput
              label="Type of Entity (LLC, etc.)"
              value={entityType}
              onChange={handleInputChange("entityType")}
                error={errors?.entityType}
            />
          </div>
        </div>
        <FormInput
          label="Registered Address"
          value={registeredAddress}
          onChange={handleInputChange("registeredAddress")}
          error={errors?.registeredAddress}
        />
        <FormInput
          label="Operational Address (if different)"
          value={operationalAddress}
          onChange={handleInputChange("operationalAddress")}
          error={errors?.registeredAddress}
        />
    <div className='flex flow-row w-full gap-5 '>
    <ActionButton onClick={onPrev} variant='secondary' className='rounded-lg!'>Back</ActionButton>
      <ActionButton onClick={onNext} className=" w-full!">
        <span>Next</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/8976e1b0d179b0baed70adc8f769a77635f2234f?placeholderIfAbsent=true"
          alt="Next arrow"
          className="aspect-[2.33] object-contain w-3.5"
        />
      </ActionButton></div>
    </div>
  </FormSection>
  )
}

export default EntityInformations