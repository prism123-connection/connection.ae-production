import React from "react";
import { CommissionHistoryRow } from "./RowCommissionHistory";

const CommissionHistory = [
  {
    slNo: "01",
    name: "Arshad",
    email: "arshad@gmail.com",
    commissionType : "Referral",
    referralEarned: "$10",
    dateAdded: "Feb 23, 2025",
  },
  {
    slNo: "02",
    name: "saif",
    email: "saif@gmail.com",
    commissionType : "Deal",
    referralEarned: "$2000",
    dateAdded: "Feb 23, 2025",
  },
  {
    slNo: "03",
    name: "daiyaan",
    email: "daiyaan@gmail.com",
    commissionType : "Referral",
    referralEarned: "$10",
    dateAdded: "Feb 23, 2025",
  },
  {
    slNo: "04",
    name: "saif",
    email: "saif@gmail.com",
    commissionType : "Deal",
    referralEarned: "$3000",
    dateAdded: "Feb 23, 2025",
  },
  {
    slNo: "05",
    name: "daiyaan",
    email: "daiyaan@gmail.com",
    commissionType : "Referral",
    referralEarned: "$10",
    dateAdded: "Feb 23, 2025",
  },
];

export const CommissionHistoryTable: React.FC = () => {
  return (
    <div className="w-full bg-white overflow-hidden rounded-lg border-[0.6px] border-[#D5D5D5]">
      <div className="bg-[#FCFDFD] p-4 border-[0.6px] border-[#D5D5D5]">
        <div className="grid grid-cols-6 gap-5  ">
          <div className="text-[#202224] text-base ">Sl.no</div>
          <div className="text-[#202224] text-base font-semibold opacity-90">
            Name
          </div>
          <div className="text-[#202224] text-base font-semibold ">
            email
          </div>
          <div className="text-[#202224] text-base font-semibold ">
            Commission Type
          </div>
          <div className="text-[#202224] text-base font-semibold ">
            Commission earned
          </div>
          <div className="text-[#202224] text-base font-semibold ">
            Date Added
          </div>
        </div>
      </div>
      <div className="p-4">
        {CommissionHistory.map((payout) => (
          <CommissionHistoryRow key={payout.slNo} {...payout} />
        ))}
      </div>
    </div>
  );
};
