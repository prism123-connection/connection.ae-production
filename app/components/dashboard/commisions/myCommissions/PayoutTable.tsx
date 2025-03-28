import React from "react";
import { PayoutRow } from "./PayoutRow";

const payoutData = [
  {
    slNo: "01",
    name: "Arshad",
    email: "arshad@gmail.com",
    referralEarned: "$10",
    joinedDate: "Feb 23, 2025",
  },
  {
    slNo: "02",
    name: "saif",
    email: "saif@gmail.com",
    referralEarned: "$10",
    joinedDate: "Feb 23, 2025",
  },
  {
    slNo: "03",
    name: "daiyaan",
    email: "daiyaan@gmail.com",
    referralEarned: "$10",
    joinedDate: "Feb 23, 2025",
  },
  {
    slNo: "04",
    name: "saif",
    email: "saif@gmail.com",
    referralEarned: "$10",
    joinedDate: "Feb 23, 2025",
  },
  {
    slNo: "05",
    name: "daiyaan",
    email: "daiyaan@gmail.com",
    referralEarned: "$10",
    joinedDate: "Feb 23, 2025",
  },
];

export const PayoutTable: React.FC = () => {
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
            Account type
          </div>
          <div className="text-[#202224] text-base font-semibold ">
            Referral earned
          </div>
          <div className="text-[#202224] text-base font-semibold ">
            Joined date
          </div>
        </div>
      </div>
      <div className="p-4">
        {payoutData.map((payout) => (
          <PayoutRow key={payout.slNo} {...payout} />
        ))}
      </div>
    </div>
  );
};
