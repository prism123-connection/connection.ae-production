import { KycType } from '@/app/types/models';
import React from 'react'
const documents = {
  tradeLicenseUrl: "https://example.com/trade-license.pdf",
  passportCopiesUrl: "https://example.com/passports.pdf",
  boardResolutionUrl: "https://example.com/board-resolution.pdf",
  proofOfAddressUrl: "https://example.com/proof-of-address.pdf",
  additionalDocumentsUrl: null,
};

interface props {
  data : KycType
}


const Documents :React.FC<props>  = ({data})=> {
  return (
   <div className="border-0 bg-white px-2 space-y-4">
  <div className="grid gap-4">
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Trade License:</span>
      <a href={data.tradeLicenseUrl} className="text-blue-600 underline" target="_blank">View Document</a>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Passport Copies:</span>
      <a href={data.passportCopiesUrl} className="text-blue-600 underline" target="_blank">View Document</a>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Board Resolution:</span>
      <a href={data.boardResolutionUrl} className="text-blue-600 underline" target="_blank">View Document</a>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Proof of Address:</span>
      <a href={data.proofOfAddressUrl} className="text-blue-600 underline" target="_blank">View Document</a>
    </div>
    {documents.additionalDocumentsUrl && (
      <div className="flex justify-between items-start">
        <span className="font-medium text-gray-600 min-w-[140px]">Additional Documents:</span>
        <a href={data.additionalDocumentsUrl} className="text-blue-600 underline" target="_blank">View Document</a>
      </div>
    )}
  </div>
</div>

  )
}

export default Documents