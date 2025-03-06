import React from "react";
import Image from "next/image";
import Link from "next/link";

const RegistrationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      <h1 className="text-2xl font-semibold mt-4">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">Your registration is complete.</p>
      <Link href="/dashboard">
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default RegistrationSuccess;
