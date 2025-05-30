import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import React, { useState } from 'react'

type errorFields = "isPoliticallyExposed" | "isUnderInternationalSanctions" | "thirdPartyConsent" | "agreedToTerms" ; 

interface LegalDeclarationsProps {
    onNext: () => void;
    onPrev: () => void;
    errors?: Partial<Record<errorFields, string>>;
    handleLegalDeclaration: (field: string, value : boolean) => void;
}


const LegalDeclarations: React.FC<LegalDeclarationsProps> = ({
    onNext,
    onPrev,
    errors, 
    handleLegalDeclaration
}) => {

    const [politicallyExposed, setPoliticallyExposed] = useState<null | boolean>(null);
    const [underInternationalSanctions, setUnderInternationalSanctions] = useState<null | boolean>(null);
    const [thirdPartyConsent, setThirdPartyConsent] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    return (
        <FormSection
            title="KYC Details"
            subtitle="Please provide the required KYC details to proceed with the withdrawal."
            onPrev={onPrev}
        >
            <div className="flex w-full flex-col items-stretch text-xs py-10 max-md:max-w-full max-md:px-5 px-20 gap-2 text-[#001625]">

                <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full">Compliance & Legal Declarations</span>
                
                <span className="text-base   tracking-[-1.28px] max-md:max-w-full">Is the entity politically exposed?</span>
                
                <div className='flex gap-10 mb-5'>
                <div className='flex gap-4'> <Checkbox   checked={politicallyExposed === true} 
                onClick={()=>{
                      setPoliticallyExposed(true);
                        handleLegalDeclaration('isPoliticallyExposed', true)
                    }} 
                /> Yes </div>
                <div className='flex gap-4'> <Checkbox 
                checked={politicallyExposed === false} 
                onClick={()=>{
                      setPoliticallyExposed(false);
                        handleLegalDeclaration('isPoliticallyExposed', false)
                }
                }
                
                /> No </div>
                </div>

                {
                    errors?.isPoliticallyExposed && (
                        <span className='text-red-400 text-sm'>{errors.isPoliticallyExposed}</span>
                    )
                }

                <span className="text-base   tracking-[-1.28px] max-md:max-w-full">Is the entity subject to international sanctions?</span>
                
                <div className='flex gap-10 mb-5'>
                <div className='flex gap-4'> 
                    <Checkbox 
                    checked={underInternationalSanctions === true}
                 onClick={()=>
                    {
                    setUnderInternationalSanctions(true) ; 
                    handleLegalDeclaration('isUnderInternationalSanctions' , true 

                ) }}  
                    /> Yes </div>
                <div className='flex gap-4'> 
                    <Checkbox 
                    checked={underInternationalSanctions === false}
                    onClick={()=>{
                            setUnderInternationalSanctions(false) ; 
                    handleLegalDeclaration('isUnderInternationalSanctions' , false )
                    }
                    }  
                    /> No </div>
                </div>

                {
                    errors?.isUnderInternationalSanctions && (
                        <span className='text-red-400 text-sm'>{errors.isUnderInternationalSanctions}</span>
                    )
                }

                <div className='flex gap-4 mb-5'> <Checkbox checked={thirdPartyConsent} onClick={()=>{setThirdPartyConsent(!thirdPartyConsent) ; handleLegalDeclaration('thirdPartyConsent' , !thirdPartyConsent ) }}/> Consent to share data with third parties </div>
                 {
                    errors?.thirdPartyConsent && (
                        <span className='text-red-400 text-sm'>{errors.thirdPartyConsent}</span>
                    )
                }
                <div className='flex gap-4 mb-5 underline text-blue-950 cursor-pointer'> <Checkbox checked={agreedToTerms} onClick={()=>{setAgreedToTerms(!agreedToTerms) ; handleLegalDeclaration('agreedToTerms' , !agreedToTerms ) }}/><Link href={'/terms'} target='_blank'> Agreement to Terms & Conditions </Link> </div>

                     {
                    errors?.agreedToTerms && (
                        <span className='text-red-400 text-sm'>{errors.agreedToTerms}</span>
                    )
                }

               
            
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

export default LegalDeclarations