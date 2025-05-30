import Image from 'next/image';
import React from 'react'

interface adminNavigationProps {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
    userRole? : 'SUPER_ADMIN' | 'ADMIN' ;
}

const AdminNavigation: React.FC<adminNavigationProps> = ({ activeTab, setActiveTab , userRole}) => {
      const baseTabs = [
        { id: "dashboard", label: "Dashboard", icon: "/admin/dashboard.png", active: true },
        { id: "kyc-approvals", label: "KYC Approvals", icon: "/admin/kyc-approvals.png" },
        { id: "product-approvals", label: "Product Approvals", icon: "/admin/product-approvals.png" },
        { id: "deal-approvals", label: "Deals Approvals", icon: "/dash/commission/cash.svg" },
        { id: "user-management", label: "User Management", icon: "/dash/commission/cash.svg" },
        { id: "transactions", label: "Transactions", icon: "/dash/commission/cash.svg" },
      ];

            const tabs = [
        ...baseTabs,
        ...(userRole === "SUPER_ADMIN"
          ? [{ id: "withdraw-approvals", label: "Withdrawl Approvals", icon: "/admin/withdrawl-approvals.png" }]
          : []),
      ];
  return (
    <div className="flex gap-10  mt-5 pb-4  max-sm:overflow-x-auto ">
    {tabs.map((tab, index) => (
      <div
        onClick={() => setActiveTab(index)}
        key={index}
        className={`flex items-center gap-2 relative cursor-pointer  transition-colors duration-500 border-b-[#0C87D6] py-2 ${activeTab === index ? "border-b-2 border-b-[#0C87D6] font-semibold" : "opacity-60"}
        
        `}
      >
       <Image
       src={tab.icon}
       alt={tab.label}
       width={15}   
       height={15}   
       className={` ${activeTab === index ? "" : "filter grayscale-100 brightness-50 contrast-200"}`}
       />
        <span className={`text-sm  ${activeTab === index ? "text-[#0C87D6]" : "text-[#001625]"}`}>{tab.label}</span>
      </div>
    ))}
  </div>
  )
}

export default AdminNavigation