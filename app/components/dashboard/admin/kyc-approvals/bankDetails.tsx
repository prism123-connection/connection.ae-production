import React from 'react'
const bankDetailsData = {
  iban: "GB29NWBK60161331926819",
  accountNumber: "31926819",
  swiftCode: "NWBKGB2L",
  routingNumber: "110000000",
};

const BankDetails = () => {
  return (
    <div className=" py-4 max-w-6xl">
   

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Business Information Card */}

        <div className=" border-0 bg-white">

          <div className="px-2 space-y-4">
            <div className="grid gap-4">

    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">IBAN:</span>
      <span className="font-semibold text-gray-900">{bankDetailsData.iban}</span>
    </div>

    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Account Number:</span>
      <span className="font-semibold text-gray-900">{bankDetailsData.accountNumber}</span>
    </div>

    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">SWIFT Code:</span>
      <span className="font-semibold text-gray-900">{bankDetailsData.swiftCode}</span>
    </div>

    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Routing Number:</span>
      <span className="font-semibold text-gray-900">{bankDetailsData.routingNumber}</span>
    </div>
    
  </div>
</div>
</div>
</div>
</div>

  )
}

export default BankDetails