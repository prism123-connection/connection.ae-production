import React from 'react'
import InputField from '../../ui/InputFields'

function CompanyDetailSetting() {
  return (
    <div className="flex flex-col gap-4">
    <InputField
      label="Company"
      className="w-[65%] max-w-full h-8"
      placeholder="You can mention your company name here."
    />
    <InputField
      label="Location"
      value="United Arab Emirates (GMT+4)"
      className="w-[65%] max-w-full"
    />
    <div className="flex flex-col gap-1.5">
      <div className="flex items-stretch gap-[7px]">
        <div className="bg-white border flex w-[13px] shrink-0 h-[13px] rounded-[3px] border-[rgba(118,118,118,1)] border-solid" />
        <label className="text-sm text-[rgba(36,41,47,1)] font-semibold">
          Display current local time
        </label>
      </div>
      <span className="text-[rgba(87,96,106,1)] text-xs font-normal ml-5">
        Other users will see the time difference from their local time.
      </span>
    </div>
  </div>
  )
}

export default CompanyDetailSetting