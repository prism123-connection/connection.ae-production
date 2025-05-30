import ActionButton from '@/app/components/ui/ActionButton';
import { FormInput } from '@/app/components/ui/FormInputs';
import { FormSection } from '@/app/components/ui/FormSection';
import React, { useState } from 'react'
import SingleOwnerInfo from './singleOwnerInfo';

type errorFields = "fullName" | "role" | "nationality" | "shareholding" | "passportNumber" | "idDocument" | "ownerInfo"; 

type Owner = {
  fullName: string;
  role: string;
  nationality: string;
  shareholding: string;
  passportNumber: string;
idDocumentUrl?: string;
};

interface contactDetailsProps {
    onNext: () => void;
    onPrev: () => void;
    handleOwnerSubmit: (owners: Owner[]) => void;
    errors?: Partial<Record<errorFields, string>>;
    handleImageInput:(file: File, field: string, indexNumber : number) => Promise<{ url: string } | undefined>
}

const defaultOwner: Owner = {
  fullName: "",
  role: "",
  nationality: "",
  shareholding: "",
  passportNumber: "",
  idDocumentUrl: "",
};


const OwnerInformation: React.FC<contactDetailsProps> = ({
    onNext,
    onPrev,
    handleOwnerSubmit, 
    errors,
    handleImageInput
}) => {


    const [owners, setOwners] = useState<Owner[]>([defaultOwner]);

    const updateOwner = (index: number, updated: Owner) => {
    const newOwners = [...owners];
    newOwners[index] = updated;
    setOwners(newOwners);
  };

    const addOwner = () => {
    setOwners([...owners, { ...defaultOwner }]);
  };

const handleSubmit = () => {
  // Update ownerInfo before submission


};


    return (
        <FormSection
            title="KYC Details"
            subtitle="Please provide the required KYC details to proceed with the withdrawal."
            onPrev={onPrev}
        >
            <div className="flex w-full flex-col items-stretch text-xs text-[rgba(31,88,124,1)] py-10 max-md:max-w-full max-md:px-5 px-20 gap-5">

                <span className="text-2xl mb-5 tracking-[-1.28px] max-md:max-w-full">Owner Information </span>

                  {owners.map((owner, index) => (
                        <div key={index} className=" ">
                        <h2 className="font-semibold mb-4">Owner {index + 1}</h2>
                        <SingleOwnerInfo
                            indexNumber={index}
                            owner={owner}
                            onChange={(updatedOwner) => updateOwner(index, updatedOwner)}
                            errors={errors}
                            handleImageInput={handleImageInput}
                        />
                        { errors?.ownerInfo && (
                            <span className='text-red-400 text-sm'>{errors?.ownerInfo}</span>
                        )}
                        </div>
                    ))}

                    <ActionButton onClick={addOwner} variant="secondary" className="rounded-none! px-0! py-4! bg-white! text-blue-400! border-0! w-fit! hover:shadow-none! "> Add Owner/Partner/Shareholder</ActionButton>

                    <div className="flex flow-row w-full gap-5 mt-5 ">
                    <ActionButton onClick={onPrev} variant="secondary" className="rounded-lg!">
                        Back
                    </ActionButton>
                    <ActionButton onClick={()=>handleOwnerSubmit(owners)} className="w-full!">
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