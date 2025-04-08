import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react'
import FileUploadInput from '../ui/FileUploadInput';

interface SupportingDocumentsProps {
    onNext: () => void;
    onPrev: () => void;
}


const SupportingDocuments: React.FC<SupportingDocumentsProps> = ({
    onNext,
    onPrev,
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
                    onChange={(file) =>
                        setSupportingDocs({ ...supportingDocs, tradeLicense: file })
                    }
                />

                <FileUploadInput
                    label="Passport/ID Copies of Owners"
                    file={supportingDocs.passportCopies}
                    id="passportCopies"
                    onChange={(file) =>
                        setSupportingDocs({ ...supportingDocs, passportCopies: file })
                    }
                />

                <FileUploadInput
                    label="Board Resolution (if applicable)"
                    file={supportingDocs.boardResolution}
                    id="boardResolution"
                    onChange={(file) =>
                        setSupportingDocs({ ...supportingDocs, boardResolution: file })
                    }
                />

                <FileUploadInput
                    label="Proof of Address"
                    file={supportingDocs.proofOfAddress}
                    id="proofOfAddress"
                    onChange={(file) =>
                        setSupportingDocs({ ...supportingDocs, proofOfAddress: file })
                    }
                />

                <FileUploadInput
                    label="Any Additional Supporting Documents (Optional)"
                    file={supportingDocs.additionalDocuments}
                    id="additionalDocuments"
                    onChange={(file) =>
                        setSupportingDocs({ ...supportingDocs, additionalDocuments: file })
                    }
                />


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

export default SupportingDocuments