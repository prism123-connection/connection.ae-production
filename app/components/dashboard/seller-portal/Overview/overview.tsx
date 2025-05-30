import React from 'react'
import SectionHeader from '../../../SectionHeader'
import SellerMetricCard from './MetricCard'
import { Package, Tag, DollarSign, ShoppingCart } from "lucide-react";
import OrderSummary from './OrderSummary';
import SalesAnalysis from './SalesAnalysis';
import SellingProduct from './SellingProduct';

function SellerPortal() {
  return (
    <SectionHeader classes=' w-full! items-start justify-start gap-5! '>
    <h1 className="text-2xl font-semibold mb-5">Seller Portal</h1>

    <div className="grid grid-cols-3 gap-10 mb-5 w-full ">
        <SellerMetricCard 
          icon={<ShoppingCart className="h-8 w-8 text-blue-500" />}
          title="Total Orders"
          value="400"
          trend={10}
          trendLabel="vs last month"
          trendDirection="up"
        />
        
        <SellerMetricCard 
          icon={<DollarSign className="h-8 w-8 text-blue-500" />}
          title="Total Sale"
          value="$42.1K"
          trend={5}
          trendLabel="vs last month"
          trendDirection="down"
        />
        
        <SellerMetricCard 
          icon={<Tag className="h-8 w-8 text-[#612568]" />}
          title="Total Products"
          value="452"
          trend={23}
          trendLabel="vs last month"
          trendDirection="up"
        />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5 w-full">
        <OrderSummary/>
        <div className="lg:col-span-2">
          <SalesAnalysis/>
        </div>
      </div>
      <SellingProduct/>
    </SectionHeader>
  )
}

export default SellerPortal