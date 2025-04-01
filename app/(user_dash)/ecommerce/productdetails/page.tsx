import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import ProductContent from '@/app/components/dashboard/ecommerce/productDetail/ProductContent'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function ProductDetails() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
     <EcomHeader/>
     <ProductContent/>
    </SectionHeader>
  )
}

export default ProductDetails