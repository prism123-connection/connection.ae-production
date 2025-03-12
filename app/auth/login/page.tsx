"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ImageCarouselProgress from "../components/image_carousel";
import { RiFingerprint2Line } from "react-icons/ri";
import { BiChevronLeft } from "react-icons/bi";
import { z } from "zod";
import { login } from "@/lib/helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrors({});
    const validation = LoginSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setLoading(true);
    const response = await login(formData.email, formData.password);
    if (!response.success) {
      toast.error(response.error);
      setLoading(false);
      return;
    }

    setUser(response.data.user);
    router.push("/");
    window.location.reload()
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-1/2 fixed top-0 left-0">
        <Link href={"/"}>
          <button className="rounded-md px-6 text-black backdrop-blur bg-opacity-30 bg-white border border-black/70 opacity-70 absolute top-8 left-8 z-10 flex items-center py-2 gap-2">
            <BiChevronLeft className="opacity-70" />
            <span className="text-sm opacity-70"> Back to Website</span>
          </button>
        </Link>
        <ImageCarouselProgress />
      </div>
      <div className="w-1/2 ml-auto flex justify-center items-center bg-white text-black overflow-y-auto">
        <div className="flex flex-col w-full mx-12 p-8">
          <div className="shadow-[0px_0px_20px_rgba(0,0,0,0.1)] self-center flex justify-center items-center bg-white rounded-3xl p-5 mb-12">
            <Image
              src={"/auth/login_logo.svg"}
              alt={"Connections_Logo"}
              width={35}
              height={35}
            />
          </div>
          <h2 className="text-4xl mb-4">Login to your account</h2>
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
              <p className="text-xs text-red-500">{errors.email}</p>
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
              <p className="text-xs text-red-500">{errors.password}</p>
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
            <Link className="text-[#0C87D6]" href={"#"}>
              Forgot password?
            </Link>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm bg-[#06B079] py-4 rounded-lg flex justify-center items-center gap-2 text-white mt-4 w-full"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                Login to your account <RiFingerprint2Line className="h-full" />
              </>
            )}
          </button>
          <Link
            className="text-[#0C87D6] text-sm text-center underline pt-4"
            href={"/auth/register"}
          >
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
