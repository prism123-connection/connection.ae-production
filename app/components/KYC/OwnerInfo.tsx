import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import React, { useState } from 'react'

interface contactDetailsProps {
    onNext: () => void;
    onPrev: () => void;
}


const OwnerInformation: React.FC<contactDetailsProps> = ({
    onNext,
    onPrev,
}) => {

    const [owner1, setOwner1] = useState({
        fullName: "",
        role: "",
        nationality: "",
        shareholding: "",
        passportNumber: "",
        idDocument: null as File | null,
    });


    return (
        <FormSection
            title="KYC Details"
            subtitle="Please provide the required KYC details to proceed with the withdrawal."
            onPrev={onPrev}
        >
            <div className="flex w-full flex-col items-stretch text-xs text-[rgba(31,88,124,1)] py-10 max-md:max-w-full max-md:px-5 px-20 gap-5">

                <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full">Owner Information </span>

                <FormInput
                    label="Full Name"
                    value={owner1.fullName}
                    onChange={(e) => setOwner1({ ...owner1, fullName: e.target.value })}
                />

                <FormInput
                    label="Role"
                    value={owner1.role}
                    onChange={(e) => setOwner1({ ...owner1, role: e.target.value })}
                />

                <FormInput
                    label="Nationality"
                    value={owner1.nationality}
                    onChange={(e) => setOwner1({ ...owner1, nationality: e.target.value })}
                />

                <FormInput
                    label="Shareholding %"
                    value={owner1.shareholding}
                    onChange={(e) => setOwner1({ ...owner1, shareholding: e.target.value })}
                />

                <FormInput
                    label="Passport/ID Number"
                    value={owner1.passportNumber}
                    onChange={(e) => setOwner1({ ...owner1, passportNumber: e.target.value })}
                />

                <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Upload ID Document</label>
                    <label
                        htmlFor="idDocument"
                        className="cursor-pointer py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-700 w-fit px-10"
                    >
                        Select File
                    </label>
                    <input
                        id="idDocument"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                            setOwner1({
                                ...owner1,
                                idDocument: e.target.files?.[0] || null,
                            })
                        }
                    />
                    <span className="ml-3 text-sm text-gray-600 mt-2">
                        {owner1.idDocument?.name || "No file chosen"}
                    </span>
                </div>
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

export default OwnerInformation