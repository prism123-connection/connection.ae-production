import { KycType } from '@/app/types/models';
import React from 'react'
const contactPerson = {
  contactPersonName: "Jane Doe",
  designation: "Operations Manager",
  contactNumber: "+1 555 123 4567",
  emailAddress: "jane.doe@example.com",
  website: "www.jsventures.com",
};

interface props {
  data : KycType
}


const ContactPerson:React.FC<props> = ({data}) => {
  return (
<div className="border-0 bg-white px-2 space-y-4">
  <div className="grid gap-4">
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Name:</span>
      <span className="font-semibold text-gray-900">{data.contactPersonName}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Designation:</span>
      <span className="font-semibold text-gray-900">{data.designation}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Contact Number:</span>
      <span className="font-semibold text-gray-900">{data.contactNumber}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Email:</span>
      <span className="font-semibold text-gray-900">{data.emailAddress}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Website:</span>
      <span className="font-semibold text-gray-900">{data.website}</span>
    </div>
  </div>
</div>


  )
}

export default ContactPerson