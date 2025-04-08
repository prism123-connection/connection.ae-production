import Image from 'next/image';
import React from 'react'
interface CommissionNavigationProps {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
}

const SellerOverviewHeader: React.FC<CommissionNavigationProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "overview", label: "Overview", icon: "/dash/sellers-overview/overview.svg", active: true },
        { id: "orders", label: "Orders", icon: "/dash/sellers-overview/orders.svg" },
        { id: "products", label: "My Products", icon: "/dash/sellers-overview/products.svg" },
        { id: "liveStream", label: "Live Stream", icon: "/dash/sellers-overview/live.svg" },
        { id: "customers", label: "Customers", icon: "/dash/sellers-overview/customer.svg" },
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

export default SellerOverviewHeader