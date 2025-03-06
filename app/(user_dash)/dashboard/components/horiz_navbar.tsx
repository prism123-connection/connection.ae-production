"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

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
