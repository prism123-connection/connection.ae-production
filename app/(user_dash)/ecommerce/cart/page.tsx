import CartSection from '@/app/components/dashboard/ecommerce/cart/CartSection'
import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function EcommerceCart() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
    <EcomHeader/>
    <CartSection/>
    </SectionHeader> 
  )
}

export default EcommerceCart