"use client";

import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HorizontalNavbar = () => {
  const { user, loading } = useUser();

  const handleCopy = () => {
    if (user?.referralId) {
      navigator.clipboard.writeText(user.referralId);
      toast.info("Referral ID copied!");
    }
  };

  return (
    <div className="w-full bg-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">Brand</h1>
      {
        loading && (
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
          <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
        </div>
        )
      }
      {!loading && user?.referralId && (
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Referral ID: {user.referralId}</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default HorizontalNavbar;
