"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { fetchData } from "@/lib/helper";
import { format } from "date-fns";

type User = {
  firstName: string;
  lastName: string;
  createdAt: string;
};

const Registrations = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetchData("dashboard/registrations");
      if (response && response.success && response.data) {
        setUsers(response.data.slice(0, 5));
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg flex-[0.5] p-4 flex flex-col min-h-128">
        <h2 className="text-2xl text-black">New Members Registered</h2>
        <div className="flex-grow flex flex-col justify-center items-center self-center">
          <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg flex-[0.5] p-4 flex flex-col">
        <h2 className="text-2xl text-black">New Members Registered</h2>
        <div className="text-center mt-4 text-red-600">
          Failed to load registrations
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg flex-[0.5] p-4 flex flex-col">
      <h2 className="text-2xl text-black font-novaRegular opacity-70">New Members - Registered</h2>

      <div className="flex items-center p-2 text-black rounded-md mt-4 text-sm">
        <span className="flex-1">Name</span>
        <span className="w-32 text-center">Date of Joining</span>
      </div>

      <div className="flex flex-col gap-2 flex-1 mt-2">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center text-black justify-between p-2 py-3 bg-gray-100 rounded-md"
          >
            <div className="flex items-center gap-2 flex-1">
              <FaUserCircle className="text-gray-600 text-2xl" />
              <span className="text-sm font-medium truncate">
                {user.firstName + " " + user.lastName}
              </span>
            </div>
            <span className="w-32 text-sm text-center">
              {format(new Date(user.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full bg-[#F1EDFF] text-[#463191] py-2 rounded-md">
        See All Referred Users
      </button>
    </div>
  );
};

export default Registrations;
