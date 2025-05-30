"use client";

import { fetchData } from "@/lib/helper";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BiRefresh } from "react-icons/bi";
import Loader from "@/app/components/loader";
import { FaUserXmark } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";

type DownlineAffiliate = {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  conversion: boolean;
  convertedAt: string | null;
  role: string;
};

const Downline = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downlineAffiliates, setDownlineAffiliates] = useState<DownlineAffiliate[]>([]);

  const fetchDownlineAffiliates = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetchData("downline");

      if (response && response.success && response.referrals) {
        setDownlineAffiliates(response.referrals);
      } else {
        setDownlineAffiliates([]);
      }
    } catch (err) {
      console.error("Error fetching affiliates:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  console.log("Downline Affiliates: ", downlineAffiliates);

  useEffect(() => {
    fetchDownlineAffiliates();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#E2ECF2] flex flex-col gap-4 min-h-screen w-full pl-16 p-6">
        <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-center justify-center">
          <p className="mt-4 text-gray-600 mb-2">Loading Downline</p>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" flex flex-col gap-4 min-h-screen w-full pl-16 p-6">
        <div className="w-full bg-white rounded-lg p-8 flex flex-col items-center">
          <p className="text-red-600 mb-4">Failed to load downline data</p>
          <button
            onClick={fetchDownlineAffiliates}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <BiRefresh />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-4 min-h-screen w-full ">
      {/* <div className="w-screen h-screen fixed top-0 left-0 bg-black/10"/> */}
      <div className="w-full bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-800">
            Downline
          </h2>
          <button
            onClick={fetchDownlineAffiliates}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md flex items-center gap-1 text-sm px-3 py-2 hover:bg-blue-200 transition-colors"
          >
            <BiRefresh className="text-md" />
            Refresh
          </button>
        </div>

        {downlineAffiliates.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>You don't have any downline members yet.</p>
            <p className="mt-2">
              Share your referral link to start earning bonuses!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Account Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Level
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Conversion Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {downlineAffiliates.map((dAffiliate, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {dAffiliate.firstName} {dAffiliate.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {dAffiliate.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                          (dAffiliate.role === "PAID_USER" || dAffiliate.role === "ADMIN" )
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        { (dAffiliate.role === "PAID_USER" || dAffiliate.role === "ADMIN" ) ? (
                          <>
                            <FiUserCheck size={14} className="mr-1" />
                            Premium
                          </>
                        ) : (
                          <>
                            <FaUserXmark size={14} className="mr-1" />
                            Demo
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {dAffiliate.level}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(['PAID_USER', 'ADMIN'].includes(dAffiliate.role) && dAffiliate.convertedAt)
                        ? format(
                            new Date(dAffiliate.convertedAt),
                            "MMM dd, yyyy"
                          )
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downline;
