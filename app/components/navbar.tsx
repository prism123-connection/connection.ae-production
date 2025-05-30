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
      </div>
    </nav>
  );
}
