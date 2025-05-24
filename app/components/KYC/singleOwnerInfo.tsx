import React from 'react'
import { FormInput } from '../ui/FormInputs'
import { error } from 'node:console';

type errorFields = "fullName" | "role" | "nationality" | "shareholding" | "passportNumber" | "idDocument"; 

type Owner = {
  fullName: string;
  role: string;
  nationality: string;
  shareholding: string;
  passportNumber: string;
  idDocument: File | null;
};

interface Props {
  owner: Owner;
  onChange: (updated: Owner) => void;
  errors?: Partial<Record<errorFields, string>>;
}
export default function SingleOwnerInfo({ owner, onChange , errors}: Props) {
    
    const handleChange = (field: keyof Owner, value: string | File | null) => {
    onChange({ ...owner, [field]: value });
    };

  return (
    <div className='space-y-4 border-0'>
                <FormInput
                    label="Full Name"
                    value={owner.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    error={errors?.fullName}
                />

                <FormInput
                    label="Role"
                    value={owner.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    error={errors?.role}
                />

                <FormInput
                    label="Nationality"
                    value={owner.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    error={errors?.nationality}
                />

                <FormInput
                    label="Shareholding %"
                    value={owner.shareholding}
                    onChange={(e) => handleChange('shareholding', e.target.value)}
                    error={errors?.shareholding}
                />

                <FormInput
                    label="Passport/ID Number"
                    value={owner.passportNumber}
                    onChange={(e) => handleChange('passportNumber', e.target.value)}
                    error={errors?.passportNumber}
                />

                <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Upload ID Document</label>
                    <label
                            htmlFor={`idDocument-${owner.passportNumber}`}
                        className="cursor-pointer py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-700 w-fit px-10"
                    >
                        Select File
                    </label>
                    <input
                       id={`idDocument-${owner.passportNumber}`}
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                        handleChange('idDocument', e.target.files?.[0] || null)
                        }
                    />
                    <span className="ml-3 text-sm text-gray-600 mt-2">
                        {owner.idDocument?.name || "No file chosen"}
                    </span>
                    {
                        errors?.idDocument && 
                        <span>{errors.idDocument}</span>
                    }
    </div>
    </div>
  )
}

{/* 
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
                            setOwner({
                                ...owner,
                                idDocument: e.target.files?.[0] || null,
                            })
                        }
                    />
                    <span className="ml-3 text-sm text-gray-600 mt-2">
                        {owner.idDocument?.name || "No file chosen"}
                    </span> */}