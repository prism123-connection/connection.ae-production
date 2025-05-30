"use client"
import { AddressForm } from '@/app/components/dashboard/ecommerce/ecomDetail/address/AddressForm'
import UserAddressManager from '@/app/components/dashboard/ecommerce/ecomDetail/address/AddressManager'
import AllAdressess from '@/app/components/dashboard/ecommerce/ecomDetail/address/AllAdressess'
import OrderHistorySection from '@/app/components/dashboard/ecommerce/ecomDetail/orderHistory/OrderHistorySection'
import EcommerceSideNavbar from '@/app/components/dashboard/ecommerce/ecomDetail/sidenav/sideNav'
import { WishlistContainer } from '@/app/components/dashboard/ecommerce/ecomDetail/wishlist/WishlistContainer'
import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'

function EcommerceDetails() {
  const handleSubmit = () =>{

  }
  const handleClose = () =>{

  }
  const [activeSetup, setActiveSetup] = useState(0); 
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
    <EcomHeader/>
    <div className='flex w-full  items-start justify-start gap-5'>
        <EcommerceSideNavbar activeSetup={activeSetup} setActiveSetup={setActiveSetup}/>
        {activeSetup === 0 && <AllAdressess/> }
        {activeSetup === 1 && <OrderHistorySection/> }
        {activeSetup === 2 && <WishlistContainer/> }
    </div>
    </SectionHeader>  
  )
}

export default EcommerceDetails