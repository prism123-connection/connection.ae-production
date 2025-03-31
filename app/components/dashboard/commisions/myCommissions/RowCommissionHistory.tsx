import React from "react";
import { PremiumBadge } from "./PremiumBadge";

interface CommissionHistoryProp {
  slNo: string;
  name: string;
  email: string;
  commissionType: string;
  referralEarned: string;
  dateAdded: string;
}

export const CommissionHistoryRow: React.FC<CommissionHistoryProp> = ({
  slNo,
  name,
  email,
  commissionType,
  referralEarned,
  dateAdded,
}) => {
  return (
    <div className="grid grid-cols-6 gap-5 py-3 border-[0.6] border-[#979797] ">
      <div className="text-[#202224] text-base ">{slNo}</div>
      <div className="text-[#202224] text-base ">{name}</div>
      <div className="text-[#202224] text-base ">{email}</div>
      <div className="text-[#202224] text-base ">{commissionType}</div>
      <div className="text-[#202224] text-base font-bold ">
        {referralEarned}
      </div>
      <div className="text-[#202224] text-sm">{dateAdded}</div>
    </div>
  );
};