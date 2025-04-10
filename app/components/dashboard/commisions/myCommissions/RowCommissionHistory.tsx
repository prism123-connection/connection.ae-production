import React from "react";
import { PremiumBadge } from "./PremiumBadge";

interface CommissionHistoryProp {
  firstName: string;
  lastName: string;
  email: string;
  conversion: boolean;
  convertedAt: string | null;
  role: string;
}

export const CommissionHistoryRow: React.FC<CommissionHistoryProp> = ({
  firstName, 
  lastName, 
  email, 
  conversion, 
  convertedAt, 
  role
}) => {
  return (
    <div className="grid grid-cols-6 gap-5 py-3 border-[0.6] border-[#979797] ">
      <div className="text-[#202224] text-base ">{1}</div>
      <div className="text-[#202224] text-base ">{firstName + lastName}</div>
      <div className="text-[#202224] text-base ">{email}</div>
      <div className="text-[#202224] text-base ">{'Referral'}</div>
      <div className="text-[#202224] text-base font-bold ">
        {'$10'}
      </div>
      <div className="text-[#202224] text-sm">    {convertedAt ? new Date(convertedAt).toLocaleString() : "N/A"}</div>
    </div>
  );
};