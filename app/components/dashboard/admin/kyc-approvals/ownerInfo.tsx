import { KycType } from '@/app/types/models';
import Link from 'next/link';
import React from 'react'

interface props {
  data : KycType
}

interface InfoRowProps {
  label: string;
  value: string | number;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between items-start">
    <span className="font-medium text-gray-600 min-w-[140px]">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const OwnerInfo:React.FC<props>  = ({data}) =>{
  return (
 <div className="border-0 bg-white px-2 space-y-4 h-[60vh] overflow-y-auto">
  <div className="grid gap-4">

    


    {
      data.owners && data.owners.map((owner, index)=>{
        return <>
      <h2 className="text-lg font-semibold mb-2">Owner {index + 1}</h2>
      <InfoRow label="Full Name:" value={owner.fullName} />
      <InfoRow label="Role:" value={owner.role} />
      <InfoRow label="Nationality:" value={owner.nationality} />
      <InfoRow label="Shareholding %:" value={`${owner.shareholding}%`} />
      <InfoRow label="Passport/ID Number:" value={owner.passportNumber} />
      {owner.idDocumentUrl && 
      (
        <Link className='w-full text-right' href={owner.idDocumentUrl} target='_blank'><span className='text-blue-500 underline text-right'>Id Proof</span></Link>
      )}

        </>
      })
    }

  </div>
</div>

  )
}

export default OwnerInfo