"use client"
import BankDetailInputs from '@/app/components/KYC/BankDetailInputs'
import KYCPopup from '@/app/components/KYC/KYCPopup'
import SubmitPopup from '@/app/components/KYC/SubmitPopup'
import KYCHeader from '@/app/components/KYC/header'
import SectionHeader from '@/app/components/SectionHeader'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import EntityInformations from '../../components/KYC/EntityInfo'
import KycContactDetails from '@/app/components/KYC/ContactDetails'
import OwnerInformation from '@/app/components/KYC/OwnerInfo'
import LegalDeclarations from '@/app/components/KYC/LegalDeclarations'
import SupportingDocuments from '@/app/components/KYC/SupportingDocuments'

function KYC() {
    const [step, setstep] = useState(1) 
    const router = useRouter()
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
      withdrawalAmount: "",
      withdrawalMethod: "",
      iban: "",
      accountNumber: "",
      currency: "",
      swiftCode: "", 
      routingNumber: "", 
      entityName: "",
      crTlNumber: "",
      crTlExpiryDate: "",
      incorporationDate: "",
      incorporationCountry: "",
      entityType: "",
      registeredAddress: "",
      operationalAddress: "",
      contactPerson: "",
      designation: "",
      contactNumber: "",
      email: "",
      website: "",
      ownerInfo: [],
      suportingDocuments: [],
      isPoliticallyExposed: "",
      isUnderInternationalSanctions: "",
      thirdPartyContent: "",
      termsConditionConsent: ""
    })

    const handleInputChange = (field: string) => 
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
      };

  return (
    <SectionHeader classes=' w-full! items-start justify-start gap-5! mt-10 '>
        <KYCHeader/>
        {step === 1 && 
        <BankDetailInputs
        iban={formData.iban}
        accountNumber={formData.accountNumber}
        swiftCode={formData.swiftCode}
        routingNumber={formData.routingNumber}
        handleInputChange={handleInputChange}
        onNext={() => setstep(2)}
        onPrev={() => router.back()}
      />
        }
       {step === 2 && (
      <EntityInformations
        entityName={formData.entityName}
        crTlNumber={formData.crTlNumber}
        crTlExpiryDate={formData.crTlExpiryDate}
        incorporationDate={formData.incorporationDate}
        incorporationCountry={formData.incorporationCountry}
        entityType={formData.entityType}
        registeredAddress={formData.registeredAddress}
        operationalAddress={formData.operationalAddress}
        handleInputChange={handleInputChange}
        onNext={() => setstep(3)}
        onPrev={() => setstep(1)}
      />
    )}
    {step === 3 && (
      <KycContactDetails
        contactPersonName={formData.contactPerson}
        contactDesignation={formData.designation}
        contactNumber={formData.contactNumber}
        contactEmail={formData.email}
        contactWebsite={formData.website}
        handleInputChange={handleInputChange}
        onNext={() => setstep(4)}
        onPrev={() => setstep(2)}
      />
    )}
    {step === 4 && (
      <OwnerInformation
        onNext={() => setstep(5)}
        onPrev={() => setstep(2)}
      />
    )}
    {step === 5 && (
      <LegalDeclarations
        onNext={() => setstep(6)}
        onPrev={() => setstep(4)}
      />
    )}
    {step === 6 && (
      <SupportingDocuments
        onNext={() => setstep(7)}
        onPrev={() => setstep(5)}
      />
    )}
    {step === 7 && (
      <SubmitPopup
        onPrev={() => router.push('/dashboard')}
      />
    )}
    </SectionHeader>
  )
}

export default KYC