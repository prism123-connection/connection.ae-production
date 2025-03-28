import React from "react";
import { PremiumBadge } from "./PremiumBadge";

interface PayoutRowProps {
  slNo: string;
  name: string;
  email: string;
  referralEarned: string;
  joinedDate: string;
}

export const PayoutRow: React.FC<PayoutRowProps> = ({
  slNo,
  name,
  email,
  referralEarned,
  joinedDate,
}) => {
  return (
    <div className="grid grid-cols-6 gap-5 py-3 border-[0.6] border-[#979797] ">
      <div className="text-[#202224] text-base ">{slNo}</div>
      <div className="text-[#202224] text-base ">{name}</div>
      <div className="text-[#202224] text-base ">{email}</div>
      <div>
        <PremiumBadge />
      </div>
      <div className="text-[#202224] text-base font-bold ">
        {referralEarned}
      </div>
      <div className="text-[#202224] text-sm">{joinedDate}</div>
    </div>
  );
};