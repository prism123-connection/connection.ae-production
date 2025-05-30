"use client";

import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch orders here in the future
  }, []);

  return (
    <div className="bg-white rounded-lg flex-1 p-4 flex flex-col">
      <h2 className="text-2xl text-black font-novaRegular opacity-70">
        Recent Orders Completed
      </h2>

      <div className="flex items-center p-2 text-black rounded-md mt-4 text-sm">
        <span className="flex-1 truncate">Product</span>
        <span className="w-36 text-center">Price</span>
        <span className="flex-1 truncate">Customer</span>
        <span className="w-24 text-center">Status</span>
      </div>

      <div className="flex flex-col gap-2 flex-1 mt-2">
        {orders.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-500 text-sm">
            No orders made yet.
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex items-center p-2 py-3 bg-gray-100 text-black rounded-md justify-between min-w-0"
            >
              <span className="flex-1 text-sm font-medium truncate min-w-0">
                {order.product}
              </span>
              <span className="w-36 text-center">{order.price}</span>
              <span className="flex-1 text-sm truncate min-w-0">
                {order.customer}
              </span>
              <span
                className={`w-24 text-xs px-3 py-1 text-center font-medium ${
                  order.status === "Completed"
                    ? "bg-[#EAFFEB] text-[#175C0E]"
                    : "bg-[#FFF6D4] text-[#946c00]"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))
        )}
      </div>

      <button className="mt-4 w-full bg-[#EAFCE8] text-[#256A1D] py-2 rounded-md">
        View All Orders
      </button>
    </div>
  );
};

export default Orders;
