"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ImageCarouselProgress from "../components/image_carousel";
import { BiCheckCircle, BiChevronLeft } from "react-icons/bi";
import { z } from "zod";
import { register } from "@/lib/helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { log } from "node:console";

const RegisterSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lockInput, setLockInput]=useState(false); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrors({});
    const validation = RegisterSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setLoading(true);
    const response = await register(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
      formData.referralCode
    );
    setLoading(false);

    if (!response.success) {
      toast.error("Whoops! Something went wrong.");
      console.log(errors)
    } else {
      router.push(`/auth/confirm?email=${encodeURIComponent(formData.email)}`);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rid = urlParams.get("rid");
    if (rid) {
      setFormData((prevData) => ({
        ...prevData, 
        referralCode: rid,
      }));
      setLockInput(true)
    }
  }, []); 

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-1/2 fixed top-0 left-0">
        <Link href={"/"}>
          <button className="rounded-md px-6 text-black backdrop-blur bg-opacity-30 bg-white border border-black/70 opacity-70 absolute top-8 left-8 z-10 flex items-center py-2 gap-2">
            <BiChevronLeft className="opacity-70" />{" "}
            <span className="text-sm opacity-70"> Back to Website</span>
          </button>
        </Link>
        <ImageCarouselProgress />
      </div>
      <div className="w-1/2 ml-auto flex justify-center items-center bg-white text-black overflow-y-auto">
        <div className="flex flex-col w-full mx-12 p-8">
          <div className="shadow-[0px_0px_20px_rgba(0,0,0,0.1)] self-center flex justify-center items-center bg-white rounded-3xl p-5 mb-2">
            <Image
              src={"/auth/login_logo.svg"}
              alt={"Connections_Logo"}
              width={35}
              height={35}
            />
          </div>
          <h2 className="text-4xl mb-2 self-center">Create your account</h2>
          <h3 className="text-sm mb-4 self-center">
            Welcome! We're thrilled to have you on board.
          </h3>

          <div className="flex w-full gap-4">
            <div className="flex w-full flex-col my-2">
              <p className="text-sm">First Name</p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="flex w-full flex-col my-2">
              <p className="text-sm">Last Name</p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col my-2">
            <p className="text-sm">Email address</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col my-2 relative">
            <p className="text-sm">Password</p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition pr-10"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col my-2 relative">
            <p className="text-sm">Referral Code (Optional)</p>
            <input
              disabled={lockInput ? true : false}
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter Referral code if you have one"
              className="w-full px-4 py-4 text-sm mt-1 bg-gray-100 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition pr-10"
            />
            {errors.referralCode && (
              <p className="text-red-500 text-xs">{errors.referralCode}</p>
            )}
          </div>

          <div className="flex text-sm mt-1 px-1 justify-between">
            <div
              className="flex items-center text-[#0F1152] opacity-60 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiEyeOff size={15} className="mr-2" />
              ) : (
                <HiEye size={15} className="mr-2" />
              )}
              <p>{showPassword ? "Hide password" : "Show password"}</p>
            </div>
            {/* <Link className="text-[#0C87D6]" href={"#"}>
              Forgot password?
            </Link> */}
          </div>

          <button
            className="text-sm bg-[#0C87D6] py-4 rounded-lg flex justify-center items-center gap-2 text-white my-3 w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                Register your account <BiCheckCircle className="h-full" />
              </>
            )}
          </button>
          {/* 
          <div className="flex w-full text-gray-400 items-center gap-6 px-6">
            <div className="bg-gray-300 w-full h-[1px]"></div>
            <span className="text-sm">OR</span>
            <div className="bg-gray-300 w-full h-[1px]"></div>
          </div>

          <button className="text-sm bg-[#F2F3F3] py-4 rounded-lg flex justify-center items-center gap-4 text-black my-3 w-full">
            <Image
              alt={"Google"}
              src={"/auth/google.svg"}
              height={15}
              width={15}
            />{" "}
            Sign Up with Google
          </button> */}

          <Link
            className="text-[#0C87D6] text-sm text-center underline pt-1"
            href={"/auth/login"}
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
