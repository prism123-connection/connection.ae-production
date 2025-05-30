import Image from 'next/image';
import React from 'react'

interface tabsArray {
  id: string;
  label: string;
}

interface NavigationProps {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
    tabs : tabsArray[]
}

const ModalNavigation: React.FC<NavigationProps > = ({ activeTab, setActiveTab, tabs }) => {
  
  return (
    <div className="flex gap-10  mt-5   max-sm:overflow-x-auto ">
    {tabs.map((tab, index) => (
      <div
        onClick={() => setActiveTab(index)}
        key={index}
        className={`flex items-center gap-2 relative cursor-pointer  transition-colors duration-500 border-b-[#0C87D6] py-2 ${activeTab === index ? "border-b-2 border-b-[#0C87D6] font-semibold" : "opacity-60"}
        `}
      >
        <span className={`text-sm  ${activeTab === index ? "text-[#0C87D6]" : "text-[#001625]"}`}>{tab.label}</span>
      </div>
    ))}
  </div>
  )
}

export default ModalNavigation