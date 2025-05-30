"use client"
import React, { useEffect, useState } from "react";
import { CommissionHistoryRow } from "./RowCommissionHistory";
import { fetchData } from "@/lib/helper";
import Loader from "@/app/components/loader";

type Affiliate = {
  firstName: string;
  lastName: string;
  email: string;
  conversion: boolean;
  convertedAt: string | null;
  role: string;
};

export const CommissionHistoryTable: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);

     const fetchAffiliates = async () => {
        setLoading(true);
        setError(false);
    
        try {
          const response = await fetchData("direct-affiliates");
    
          if (response && response.success && response.referrals) {
            setAffiliates(response.referrals);
          } else {
            setAffiliates([]);
          }
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchAffiliates();
      }, []);
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
      {
        loading && (
          <div className="bg-[#E2ECF2] flex flex-col gap-4 min-h-screen w-full pl-16 p-6">
          <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-center justify-center">
            <p className="mt-4 text-gray-600 mb-2">Loading Direct Members</p>
            <Loader />
          </div>
        </div>
        )
      }

      <div className="p-4">
        {affiliates.map((payout, index) => {
     if (['PAID_USER', 'ADMIN'].includes(payout.role)) {
            return <CommissionHistoryRow key={index} {...payout} />
          }
        }
        )}
      </div>
    </div>
  );
};


// const CommissionHistory = [
//   {
//     slNo: "01",
//     name: "Arshad",
//     email: "arshad@gmail.com",
//     commissionType : "Referral",
//     referralEarned: "$10",
//     dateAdded: "Feb 23, 2025",
//   },
//   {
//     slNo: "02",
//     name: "saif",
//     email: "saif@gmail.com",
//     commissionType : "Deal",
//     referralEarned: "$2000",
//     dateAdded: "Feb 23, 2025",
//   },
//   {
//     slNo: "03",
//     name: "daiyaan",
//     email: "daiyaan@gmail.com",
//     commissionType : "Referral",
//     referralEarned: "$10",
//     dateAdded: "Feb 23, 2025",
//   },
//   {
//     slNo: "04",
//     name: "saif",
//     email: "saif@gmail.com",
//     commissionType : "Deal",
//     referralEarned: "$3000",
//     dateAdded: "Feb 23, 2025",
//   },
//   {
//     slNo: "05",
//     name: "daiyaan",
//     email: "daiyaan@gmail.com",
//     commissionType : "Referral",
//     referralEarned: "$10",
//     dateAdded: "Feb 23, 2025",
//   },
// ];