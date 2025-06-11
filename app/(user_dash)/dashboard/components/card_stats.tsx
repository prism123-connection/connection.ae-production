"use client";

import Loader from "@/app/components/loader";
import { fetchData } from "@/lib/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProgressArc from "./_anim_components/progress_arc";

const CardStats = ({ className }: { className: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalMembers, setTotalMembers] = useState<string | null>(null);
  const [paidMembers, setPaidMembers] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetchData("dashboard/cards/referrals");
      if (response) {
        setTotalMembers(response.totalMembers);
        setPaidMembers(response.paidReferrals);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className={`w-full ${className} bg-white rounded-lg flex flex-col justify-center items-center`}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg text-red-600 flex flex-col items-center">
        <p>Failed to load data</p>
        <button
          onClick={async () => await fetchAllData()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const totalMembersNum = totalMembers ? Number(totalMembers) : 0;
  const paidMembersNum = paidMembers ? Number(paidMembers) : 0;

  const percentage =
    totalMembersNum > 0
      ? Math.round((paidMembersNum / totalMembersNum) * 100)
      : 0;

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex gap-4 w-full flex-1">
        <div className="rounded-lg flex flex-col gap-2 bg-white p-4 flex-1">
          <p className="text-sm text-black">
            <span className="text-3xl font-novaSB opacity-70">
              {paidMembers}/{totalMembers}
            </span>
            <br />
            <span className="font-novaLight opacity-50">
              Total members joined
            </span>
          </p>
          <ProgressArc percentage={percentage} />
        </div>
        <div className="rounded-lg flex flex-col bg-white p-4 flex-1">
          <p className="text-sm text-black">
            <span className="text-3xl font-novaSB opacity-70">0</span>
            <br />
            <span className="font-novaLight opacity-50">
              Total amount - Deals
            </span>
          </p>
          <Image
            src="/dash/card_3.svg"
            alt="Box 2"
            className="self-center object-contain max-h-24"
            height={200}
            width={200}
          />
        </div>
      </div>

      <div className="flex gap-4 w-full flex-1">
        <div className="rounded-lg flex flex-col bg-white p-4 flex-1">
          <p className="text-sm text-black">
            <span className="text-3xl font-novaSB opacity-70">0</span>
            <br />
            <span className="font-novaLight opacity-50">Total sales</span>
          </p>
          <Image
            src="/dash/card_2.svg"
            alt="Box 3"
            className="self-center object-contain max-h-24"
            height={200}
            width={200}
          />
        </div>
        <div className="rounded-lg flex flex-col bg-white p-4 flex-1">
          <p className="text-sm text-black">
            <span className="text-3xl font-novaSB opacity-70">0</span>
            <br />
            <span className="font-novaLight opacity-50">
              Total views on your products
            </span>
          </p>
          <Image
            src="/dash/card_4.svg"
            alt="Box 4"
            className="self-center object-contain max-h-24"
            height={200}
            width={200}
          />
        </div>
      </div>
    </div>
  );
};

export default CardStats;
