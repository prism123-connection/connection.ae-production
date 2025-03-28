import Image from 'next/image';
import React from 'react'
interface CommissionNavigationProps {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
}

const CommissionNavigation: React.FC<CommissionNavigationProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "dashboard", label: "Dashboard", icon: "/dash/commission/home.svg", active: true },
        { id: "affiliate-links", label: "Affiliate Links", icon: "/dash/commission/link.svg" },
        { id: "commissions", label: "My Commissions", icon: "/dash/commission/dollar.svg" },
        { id: "payouts", label: "Payouts", icon: "/dash/commission/cash.svg" },
      ];
  return (
    <div className="flex gap-10  mb-5 pb-4  max-sm:overflow-x-auto ">
    {tabs.map((tab, index) => (
      <div
        onClick={() => setActiveTab(index)}
        key={tab.id}
        className={`flex items-center gap-2 relative cursor-pointer  transition-colors duration-500  py-2 ${activeTab === index ? "border-b-3 border-b-[#001625] font-semibold" : "opacity-60"}
        
        `}
      >
       <Image
       src={tab.icon}
       alt={tab.label}
       width={20}   
       height={20}   
       />
        <span className="text-sm text-[#001625]">{tab.label}</span>
      </div>
    ))}
  </div>
  )
}

export default CommissionNavigation