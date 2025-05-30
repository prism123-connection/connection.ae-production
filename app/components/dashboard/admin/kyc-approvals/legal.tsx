import { KycType } from '@/app/types/models';
import React from 'react'

const compliance = {
  politicallyExposed: false,
  underSanctions: true,
};

interface props {
  data : KycType
}


const LegalComplaince:React.FC<props>  = ({data})=> {
  return (
    <div className="border-0 bg-white px-2 space-y-4">
  <div className="grid gap-4">
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Is the entity politically exposed?</span>
      <span className="font-semibold text-gray-900">{data.politicallyExposed ? "Yes" : "No"}</span>
    </div>
    <div className="flex justify-between items-start">
      <span className="font-medium text-gray-600 min-w-[140px]">Is the entity subject to international sanctions?</span>
      <span className="font-semibold text-gray-900">{data.underSanctions ? "Yes" : "No"}</span>
    </div>
  </div>
</div>

  )
}

export default LegalComplaince