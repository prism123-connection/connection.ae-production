import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import ProductContent from '@/app/components/dashboard/ecommerce/productDetail/ProductContent'
import SimilarProduct from '@/app/components/dashboard/ecommerce/productDetail/SimilarProduct'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function ProductDetails() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
     <EcomHeader/>
     <ProductContent/>
     <SimilarProduct/>
    </SectionHeader>
  )
}

export default ProductDetails