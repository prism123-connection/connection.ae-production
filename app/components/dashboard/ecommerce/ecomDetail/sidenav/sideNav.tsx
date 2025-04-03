import React from 'react'
import { EcommerceUserProfile } from './userProfile';
import { EcommerceSideNavOptions } from './navOptions';

interface EcommerceSideNavbarProps {
  activeSetup: number;
  setActiveSetup: React.Dispatch<React.SetStateAction<number>>;
}

function EcommerceSideNavbar({ activeSetup, setActiveSetup }: EcommerceSideNavbarProps) {
    const menuItems = [
        { label: "Address" },
        { label: "Orders history" },
        { label: "Wishlist" },
      ];
  return (
    <nav
    className="bg-white self-stretch flex min-w-60 min-h-[582px] w-[300px] flex-col items-center pt-10  px-4 rounded-lg "
    aria-label="User profile navigation"
  >
    <EcommerceUserProfile
      avatarUrl="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/724700bc26d1d0bc1f077610d94895450c1a208a?placeholderIfAbsent=true"
      name="Salim"
      memberSince="Member since 2025"
    />
    <EcommerceSideNavOptions activeSetup={activeSetup} setActiveSetup={setActiveSetup}  items={menuItems} />
  </nav>
  )
}

export default EcommerceSideNavbar