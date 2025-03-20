"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
// import ImageCarouselProgress from "../components/image_carousel";
import { RiFingerprint2Line } from "react-icons/ri";
import { BiChevronLeft } from "react-icons/bi";
import { z } from "zod";
import { login } from "@/lib/helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { PricingContainer } from "../../components/PricingContainer";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const PricingPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();


  return (
    <div className="min-h-screen w-full flex">
      <div className="w-1/2 fixed top-0 left-0">
        <Link href={"/"}>
          <button className="rounded-md px-6 text-black backdrop-blur bg-opacity-30 bg-white border border-black/70 opacity-70 absolute top-8 left-8 z-10 flex items-center py-2 gap-2">
            <BiChevronLeft className="opacity-70" />
            <span className="text-sm opacity-70"> Back to Website</span>
          </button>
        </Link>
      </div>

      <div className="w-full ml-auto flex justify-center items-center -white text-black overflow-y-auto bg-white flex-col
      ">
       {/* Add next component here */}
 
        <PricingContainer/>
      </div>
    </div>
  );
};

export default PricingPage;
