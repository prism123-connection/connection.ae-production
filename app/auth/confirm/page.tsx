"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, Suspense } from "react";
import ImageCarouselProgress from "../components/image_carousel";
import { BiChevronLeft } from "react-icons/bi";
import { resendConfirmationMail } from "@/lib/helper";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast.error("No email found, please register again.");
      return;
    }

    setLoading(true);
    const response = await resendConfirmationMail(email);
    setLoading(false);

    if (response.success) {
      toast.success("Confirmation mail sent!");
    } else {
      toast.error("Failed to resend confirmation mail.");
    }
  };

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
            Great! Please check your inbox
          </h2>
          <h3 className="text-sm w-full mb-4 self-center text-center">
            We've sent a confirmation link to your email. To complete the
            sign-in process, please click the confirm button in your inbox. If
            you don't see it in the inbox, be sure to check your spam folder as
            well.
          </h3>

          <div className="bg-gray-100 p-6 m-2 flex flex-col rounded-lg">
            <span className="text-sm text-center">
              Didn't receive the confirmation mail?
            </span>
            <button
              className="text-sm bg-[#0C87D6] py-4 rounded-lg flex justify-center items-center gap-2 text-white my-3 w-max self-center px-16"
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>Re-send Confirmation Link</>
              )}
            </button>
          </div>
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
};

const ConfirmationPageWithSuspense = () => {
  return (
    <Suspense>
      <ConfirmationPage />
    </Suspense>
  );
};

export default ConfirmationPageWithSuspense;
