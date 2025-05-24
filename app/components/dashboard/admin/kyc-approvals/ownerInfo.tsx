import React from 'react'

const shareholder = {
  fullName: "John Smith",
  role: "Director",
  nationality: "Canadian",
  shareholdingPercentage: 40,
  passportOrIdNumber: "A12345678",
  idDocumentUrl: "https://example.com/passport.pdf",
};


const OwnerInfo = () => {
  return (
 <div className="border-0 bg-white px-2 space-y-4">
  <div className="grid gap-4">
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Full Name:</span>
      <span className="font-semibold text-gray-900">{shareholder.fullName}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Role:</span>
      <span className="font-semibold text-gray-900">{shareholder.role}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Nationality:</span>
      <span className="font-semibold text-gray-900">{shareholder.nationality}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Shareholding %:</span>
      <span className="font-semibold text-gray-900">{shareholder.shareholdingPercentage}%</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Passport/ID Number:</span>
      <span className="font-semibold text-gray-900">{shareholder.passportOrIdNumber}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">ID Document:</span>
      <a href={shareholder.idDocumentUrl} className="text-blue-600 underline" target="_blank">View Document</a>
    </div>
  </div>
</div>

  )
}

export default OwnerInfo