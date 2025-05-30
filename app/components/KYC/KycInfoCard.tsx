import React from "react";
import ActionButton from "../ui/ActionButton";
import { useRouter } from "next/navigation";

const KYCInfoCard = () => {
 const router = useRouter()

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-lg">Before You Start:</h3>
          <p className="text-gray-700">
            To make your KYC submission smoother, please keep the following
            documents ready:
          </p>
        </div>

        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">📄</span>
            <span>Trade License / Commercial Registration (CR)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🪪</span>
            <span>
              Passport or National ID copies of all Directors/Partners/
              Shareholders
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📋</span>
            <span>Board Resolution (if applicable)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🏠</span>
            <span>Proof of Address (e.g., utility bill, lease agreement)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🏦</span>
            <span>Bank Account Details (IBAN, SWIFT, Bank Name & Address)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🌐</span>
            <span>Company Website (if available)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📎</span>
            <span>Any other supporting documents relevant to your entity</span>
          </li>
        </ul>

        <p className="text-gray-700">
          Having these documents ready will help you complete the form quickly
          and without interruption.
        </p>

        <ActionButton 
          onClick={()=>router.push('/kyc')} 
          className=" bg-blue-500 hover:bg-blue-600 text-white py-2 mt-4">
          Update KYC
        </ActionButton>
      </div>
    </div>
  );
};

export default KYCInfoCard;
