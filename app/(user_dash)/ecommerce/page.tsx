import EcommerceCategories from '@/app/components/dashboard/ecommerce/main/Categories'
import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import EcommerceProductsSection from '@/app/components/dashboard/ecommerce/main/Products'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function ECommerce() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
        <EcomHeader/>
        <EcommerceCategories/>
        <EcommerceProductsSection/>
    </SectionHeader>  )
}

export default ECommerce