"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

type NavLink = {
  name: string;
  link: string;
};

const navLinks: NavLink[] = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about-us" },
  { name: "Services", link: "/services" },
  { name: "Testimonial", link: "/testimonials" },
  { name: "FAQ", link: "/faq" },
];

export default function Navbar() {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const router = useRouter()

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos && currentScrollPos > 50) {
        setVisible(false);
      } else {
        setVisible(true); 
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white text-white py-2 shadow-lg z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex items-center justify-between py-1 min-w-full! ">
        <div onClick={()=>router.push('/')} className="logo lg:ml-4 cursor-pointer ">
          <Image
            src="/word_logo.svg"
            alt="Logo"
            width={250}
            height={250}
            className="h-full"
          />
        </div>

        <div className="nav-items flex space-x-6">
          {navLinks.map(({ name, link }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={name}
                href={link}
                className="relative group text-sm font-medium transition"
              >
                <span className={`text-black transition`}>{name}</span>
                <span
                  className={`absolute bottom-[-4px] left-0 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "bg-black w-full"
                      : "bg-black w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        <div className="auth lg:mr-4">
          {loading ? (
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          ) : user ? (
            <Link href="/dashboard">
              <button className="border border-[#F48020] text-[#F48020] px-[20px] py-[10px] text-xs rounded-[6px] hover:bg-[#F48020] hover:text-white transition">
                Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="bg-[#F48020] text-white px-[20px] py-[10px] text-xs rounded-[6px] hover:bg-[#d96e1c] transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="md:min-w-[151px] bg-[#02070C] text-white px-[20px] ml-2 py-[10px] text-xs rounded-[6px] hover:bg-[#1A2A35] transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

         {/* Mobile Hamburger Button */}
        <button className="md:hidden lg:mr-4 z-50 text-black" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-[60px] right-0 w-full bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col px-4 py-4">
          {navLinks.map(({ name, link }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={name}
                href={link}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 ${isActive ? 'font-bold' : ''}`}
              >
                <span className="text-black">{name}</span>
              </Link>
            );
          })}
          
          <div className="py-4 border-t border-gray-200 mt-4">
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
            ) : user ? (
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full border border-[#F48020] text-[#F48020] px-[20px] py-[10px] text-xs rounded-[6px] hover:bg-[#F48020] hover:text-white transition">
                  Dashboard
                </button>
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-[#F48020] text-white px-[20px] py-[10px] text-xs rounded-[6px] hover:bg-[#d96e1c] transition">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-[#02070C] text-white px-[20px] py-[10px] text-xs rounded-[6px] hover:bg-[#1A2A35] transition">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </nav>
  );
}
