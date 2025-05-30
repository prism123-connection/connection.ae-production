import React from 'react'

interface keyValueDisplayProps {
    label : string;
    value : string; 
}

const KeyValueDisplay:React.FC<keyValueDisplayProps> = ({label, value}) => {
  return (
    <div className="flex justify-start gap-5 items-start  ">
    <span className="font-medium text-gray-600 min-w-[140px]">{label}</span>
    <span className="font-semibold text-gray-900 text-left">{value}</span>
    </div>
  )
}

export default KeyValueDisplay