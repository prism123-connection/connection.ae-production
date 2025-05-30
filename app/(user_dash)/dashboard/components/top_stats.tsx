"use client";

import { useUser } from "@/context/UserContext";
import { fetchData } from "@/lib/helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TopStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [earnings, setEarnings] = useState<string | null>("-");
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [referralBonus, setReferralBonus] = useState<string | null>(null);
  const [totalMembers, setTotalMembers] = useState<string | null>(null);
  const { user } = useUser();

  const fetchAllData = async () => {
    setLoading(true);
    setError(false);

    try {
      const [walletData, referralData] = await Promise.all([
        fetchData("dashboard/stats/wallet"),
        fetchData("dashboard/stats/referral"),
      ]);

      if (walletData) setWalletBalance(walletData.amount);
      if (referralData) {
        setReferralBonus(referralData.referralBonus);
        setTotalMembers(referralData.totalMembers);
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
      <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
        <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
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

  return (
    <div className="w-full bg-white rounded-lg flex p-4 px-8 items-end">
      <div className="flex flex-col flex-[6] pr-16">
        <div className="flex gap-4 p-4 m-2">
          <Image src={"/dash/avatar.png"} height={50} width={50} alt={"avatar"} className="scale-120" />
          <div className="flex flex-col text-black text-sm font-novaLight">
            Welcome back
            <br />
            <span className="text-xl font-novaSB">
              {user?.firstName + " " + user?.lastName}!
            </span>
          </div>
        </div>
        <div className="flex gap-6 w-full">
          <div className="h-28 rounded-lg relative p-4 bg-[#EAFCE8] text-[#256A1D] w-full flex flex-col justify-end">
            <Image
              src={"/dash/top_1.svg"}
              alt={"dash_icon"}
              height={28}
              width={28}
              className="absolute top-4 right-4"
            />
            <h2 className="text-sm font-novaLight">Total earnings</h2>
            <p className="font-novaSB text-xl">{referralBonus}  $</p>
            {/* <p className="font-novaSB text-xl">0 $</p> */}
          </div>
          <div className="h-28 rounded-lg relative p-4 bg-[#E8F6FC] text-[#256A1D] w-full flex flex-col justify-end">
            <Image
              src={"/dash/top_2.svg"}
              alt={"dash_icon"}
              height={28}
              width={28}
              className="absolute top-4 right-4"
            />
            <h2 className="text-sm font-novaLight">Wallet balance</h2>
            <p className="font-novaSB text-xl">{referralBonus} $</p>
            {/* <p className="font-novaSB text-xl">{walletBalance} $</p> */}
          </div>
          <div className="h-28 rounded-lg relative p-4 bg-[#F1EDFF] text-[#463191] w-full flex flex-col justify-end">
            <Image
              src={"/dash/top_3.svg"}
              alt={"dash_icon"}
              height={28}
              width={28}
              className="absolute top-4 right-4"
            />
            <h2 className="text-sm font-novaLight">Referral Bonus</h2>
            <p className="font-novaSB text-xl">{referralBonus} $</p>
          </div>
          <div className="h-28 rounded-lg relative p-4 bg-[#FFFDED] text-[#945E17] w-full flex flex-col justify-end">
            <Image
              src={"/dash/top_4.svg"}
              alt={"dash_icon"}
              height={28}
              width={28}
              className="absolute top-4 right-4"
            />
            <h2 className="text-sm font-novaLight">Total members</h2>
            <p className="font-novaSB text-xl">{totalMembers}</p>
          </div>
        </div>
      </div>
      <Image
        src={"/logo.svg"}
        height={150}
        width={150}
        className="h-full  p-4"
        alt={"avatar"}
      />
    </div>
  );
};

export default TopStatistics;
