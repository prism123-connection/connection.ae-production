"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter(); 
  return (
    <div className="flex flex-col gap-16 w-full p-8 pt-16 px-24 bg-white text-black text-sm">
      <div className="flex gap-24">
        <div className="flex flex-[1] flex-col leading-relaxed text-xs ">
          <Image  onClick={()=>router.push('/')} src="/logo.png" alt="Logo" width={180} height={180} className="cursor-pointer" />
          <p>
            Redefining Success <span className="font-semibold">At Connection</span>,
            our mission is to bridge businesses with their customers through an
            intuitive, all-encompassing platform
          </p>
        </div>
        <div className="flex flex-[1] flex-wrap">
          <Link href={'/about-us'}><span className="px-4 pt-2 cursor-pointer">About Us</span></Link>
          <Link href={'/services'}><span className="px-4 pt-2 cursor-pointer">Services</span></Link>
          <Link href={'/testimonials'}><span className="px-4 pt-2 cursor-pointer">Testimonials</span></Link>
          <Link href={'/faq'}><span className="px-4 pt-2 cursor-pointer">FAQs</span></Link>
          <Link href={'/auth/login'}><span className="px-4 pt-2 cursor-pointer">Login</span></Link>
          <Link href={'/auth/register'}><span className="px-4 pt-2 cursor-pointer">Register</span></Link>
        </div>
        <div className="flex flex-[2] flex-col">
          <h2 className="text-lg">Subscribe to our newsletter</h2>
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 my-3 border border-gray-400 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
          <button className="login mt-4 px-[60px] py-[10px] bg-[#001625] text-white text-sm rounded-[6px] transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)]">
            Subscribe now
          </button>
        </div>
      </div>
      <div className="flex w-[3/4] justify-between">
        <div className="flex gap-4">
          <Link href={'/privacy'}><span className="cursor-pointer ">Privacy policy</span></Link>
          <Link href={'/terms'}><span className="cursor-pointer ">Terms & Conditions</span></Link>
          <Link href={'/licence'}><span className="cursor-pointer ">Licence</span></Link>
        </div>
        <span>© 2025 Connection</span>
      </div>
    </div>
  );
};

export default Footer;
