import EcommerceSideNavbar from '@/app/components/dashboard/ecommerce/ecomDetail/sideNav'
import { WishlistContainer } from '@/app/components/dashboard/ecommerce/ecomDetail/WishlistContainer'
import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function EcommerceDetails() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
    <EcomHeader/>
    <div className='flex w-full  items-start justify-start'>
        <EcommerceSideNavbar/>
        <WishlistContainer/>
    </div>
    </SectionHeader>  
  )
}

export default EcommerceDetails