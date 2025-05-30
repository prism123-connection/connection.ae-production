import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react'
import FileUploadInput from '../ui/FileUploadInput';

type errorFields = "tradeLicense" | "passportCopies" | "boardResolution" | "proofOfAddress" | "additionalDocuments"; 
    

interface SupportingDocumentsProps {
    onNext: () => void;
    onPrev: () => void;
    errors?: Partial<Record<errorFields, string>>;
     handleImageInput:(file: File, field: string) => Promise<void>;
     loading: boolean; 
}


const SupportingDocuments: React.FC<SupportingDocumentsProps> = ({
    onNext,
    onPrev,
    errors, 
    handleImageInput, loading
}) => {

    const [supportingDocs, setSupportingDocs] = useState({
        tradeLicense: null as File | null,
        passportCopies: null as File | null,
        boardResolution: null as File | null,
        proofOfAddress: null as File | null,
        additionalDocuments: null as File | null,
    });

    return (
        <FormSection
            title="KYC Details"
            subtitle="Please provide the required KYC details to proceed with the withdrawal."
            onPrev={onPrev}
        >
            <div className="flex w-full flex-col items-stretch text-xs py-10 max-md:max-w-full max-md:px-5 px-20 gap-2 text-[rgba(31,88,124,1)]">

                <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full">Upload Supporting Documents</span>

                <FileUploadInput
                    label="Trade License / CR Copy"
                    file={supportingDocs.tradeLicense}
                    id="tradeLicense"
                    onChange={(file) =>{
                        if (file) {
                            setSupportingDocs({ ...supportingDocs, tradeLicense: file })
                            handleImageInput(file, 'tradeLicense');
                        }
                    }}
                />
                {
                    errors?.tradeLicense && (
                        <span className='text-red-400 font-sm'>{errors.tradeLicense}</span>
                    )
                }

                <FileUploadInput
                    label="Passport/ID Copies of Owners"
                    file={supportingDocs.passportCopies}
                    id="passportCopies"
                    onChange={(file) =>{
                        if (file) {
                        setSupportingDocs({ ...supportingDocs, passportCopies: file })
                        handleImageInput(file, 'passportCopies');
                        }
                    }
                    }
                />
                {
                    errors?.passportCopies && (
                        <span className='text-red-400 font-sm'>{errors.passportCopies}</span>
                    )
                }

                <FileUploadInput
                    label="Board Resolution (if applicable)"
                    file={supportingDocs.boardResolution}
                    id="boardResolution"
                    onChange={(file) =>{
                        if (file) {
                            setSupportingDocs({ ...supportingDocs, boardResolution: file })
                            handleImageInput(file, 'boardResolution');
                        }
                    }}
                />
                {
                    errors?.boardResolution && (
                        <span className='text-red-400 font-sm'>{errors.boardResolution}</span>
                    )
                }

                <FileUploadInput
                    label="Proof of Address"
                    file={supportingDocs.proofOfAddress}
                    id="proofOfAddress"
                    onChange={(file) =>{
                        if (file) {
                            setSupportingDocs({ ...supportingDocs, proofOfAddress: file })
                            handleImageInput(file, 'proofOfAddress');
                        }
                    }}
                />
                {
                    errors?.proofOfAddress && (
                        <span className='text-red-400 font-sm'>{errors.proofOfAddress}</span>
                    )
                }

                <FileUploadInput
                    label="Any Additional Supporting Documents (Optional)"
                    file={supportingDocs.additionalDocuments}
                    id="additionalDocuments"
                    onChange={(file) =>{
                        if (file) {
                            setSupportingDocs({ ...supportingDocs, additionalDocuments: file })
                            handleImageInput(file, 'additionalDocuments');
                        }
                    }}
                    
                />
                {
                    errors?.additionalDocuments && (
                        <span className='text-red-400 font-sm'>{errors.additionalDocuments}</span>
                    )
                }


                <div className="flex flow-row w-full gap-5 mt-5">
                    <ActionButton onClick={onPrev} variant="secondary" className="rounded-lg!">
                        Back
                    </ActionButton>

                    {
                    loading ? 
                    <ActionButton variant='proceed' className="w-full! shadow-none! hover:shadow-lg">
                        <div className="animate-spin h-5 w-5 border-4 border-white self-center border-t-transparent rounded-full"></div>
                    </ActionButton>
                    :
                    <ActionButton variant='proceed' onClick={onNext} className="w-full! shadow-none! hover:shadow-lg">
                            <span>Submit Documents</span>
                    </ActionButton>
                    }
                 
         
                </div>
            </div>
        </FormSection>
    )
}

export default SupportingDocuments