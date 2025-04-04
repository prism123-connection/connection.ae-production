"use client";

import Image from "next/image";
import Link from "next/link"; 
import React, { Suspense, useEffect, useState } from "react";
import ImageCarouselProgress from "../components/image_carousel";
import { BiChevronLeft } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { verify } from "@/lib/helper";
import { User, useUser } from "@/context/UserContext";

const VerificationPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const { setUser } = useUser();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      console.log("Sent token: ", token);
      setLoading(true);
      verify(token)
        .then((res) => {
          if (!res.success) {
            setError(true);
          }
          setUser(res.data?.user as User);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
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
            <h2 className="text-4xl mb-2 self-center">
              Verifying your account
            </h2>
            <h3 className="text-sm mb-4 self-center">
              Please wait for a while
            </h3>
            <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
            <h2 className="text-4xl mb-2 self-center">
              Whoops! Something went wrong.
            </h2>
            <h3 className="text-sm mb-4 self-center">
              This token is invalid or expired. Please try again.
            </h3>
            <span className="text-sm text-center mt-6">
              Need some help? Shoot us a text at support@connection.com, we're
              here to help!
            </span>
            <a
              className="text-sm bg-[#edf8ff] py-2 rounded-lg flex justify-center items-center gap-2 text-[#0C87D6] my-2 w-max self-center px-8"
              href="mailto:support@connection.com"
            >
              Write to us
            </a>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-4xl mb-2 self-center">
            Verification successful!
          </h2>
          <h3 className="text-sm mb-4 self-center text-center w-3/4">
            Thank you for registering with Connection. Please proceed to setup
            your account details.
          </h3>
          <Link href={"/auth/setup"} className="self-center">
            <button className="rounded-md px-6 text-black bg-[#06B079] z-10 flex items-center py-3 px-6 gap-2">
              <span className="text-sm text-white px-6"> Setup Account</span>
            </button>
          </Link>
          <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const VerificationPageWithSuspense = () => {
  return (
    <Suspense>
      <VerificationPage />
    </Suspense>
  );
};

export default VerificationPageWithSuspense;
