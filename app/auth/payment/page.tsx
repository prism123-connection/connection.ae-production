"use client";

import React, { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";
import Checkout from "./checkout";

const RegistrationPayment = () => {
  const [loading, setLoading] = useState(false);

        if (loading) {
          return (
            <div className=" w-full flex bg-[#51C2FF]/10 relative justify-center items-center min-h-screen overflow-hidden!">
              <div className="w-1/3 overflow-hidden aspect-square absolute fast-rotate-animation">
                <Image
                  src="/logo.svg"
                  alt="Account Setup"
                  width={500}
                  height={500}
                  className="w-full h-full p-6 object-contain rounded-md"
                />
              </div>
            </div>
          );
        }
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col max-w-lg w-full">
        <Image
          src={"/logo.svg"}
          height={50}
          width={50}
          alt={"Connection Logo"}
          className="self-center py-4"
        />
        <p className="text-lg mb-6">
          You're almost there! Please proceed to payment to complete your
          registration.
        </p>

        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
          }}
        >
        <Checkout loading={loading} setLoading={setLoading} />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default RegistrationPayment;
