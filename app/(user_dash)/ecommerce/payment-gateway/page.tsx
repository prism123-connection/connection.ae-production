"use client";

import React, { Suspense, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// import Checkout from "./checkout";

const RegistrationPaymentSection = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const dealId = searchParams.get("dealId");

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

    const handleNetworkPay = async () => {
    setLoading(true);
    const res = await fetch(`/api/payment/ecommerce/ngenius/order`, {
      method: 'POST',
      // body: JSON.stringify({ amount: 1 }),
      body: JSON.stringify({ productId : productId, dealId : dealId }),
      headers: { 'Content-Type': 'application/json' },
    });

    const { paymentUrl } = await res.json();
    // const { data } = await res.json();
    console.log('paymentUrl', paymentUrl)
    window.location.href = paymentUrl; // redirect to hosted payment page
    // window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    setLoading(false); 
  };


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

        {/* <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
          }}
        >
        <Checkout loading={loading} setLoading={setLoading} />
        </PayPalScriptProvider> */}

           <button className=' bg-white border-2 group border-blue-950  px-10 py-2 cursor-pointer w-full max-h-20 rounded-md flex items-center justify-center mt-36' onClick={handleNetworkPay} disabled={loading}>
            {loading ? 'Redirecting...' :
            <img
            src="/auth/network_payment.png"
            className=" object-contain w-auto h-8 group-hover:scale-105 transition-all duration-500 "
            />
            }
          </button>
      </div>
    </div>
  );
};

function RegistrationPayment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationPaymentSection />
    </Suspense>
  );
}

export default RegistrationPayment;
