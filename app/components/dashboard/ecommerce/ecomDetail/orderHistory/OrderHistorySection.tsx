import React, { useState } from 'react'
import { OrderFilters } from './Filter';
import { OrderTable } from './Table';

interface Order {
    id: string;
    productName: string;
    productImage: string;
    payment: "Paid" | "COD";
    status: "Pending" | "Cancelled" | "Delivered";
    total: number;
    hasInvoice?: boolean;
  }

type OrderFilter = "Date" | "Payment" | "Status" | "A-Z";

  const MOCK_ORDERS: Order[] = [
    {
      id: "#12526",
      productName: "Sport shoes",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/a0c48696aa5334d04e83b854518a336363e06e40?placeholderIfAbsent=true",
      payment: "Paid",
      status: "Pending",
      total: 545,
      hasInvoice: true,
    },
    {
      id: "#12528",
      productName: "Cassio Watch",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/d0fde7bbadbc906cff03991025c4a270a4d699c4?placeholderIfAbsent=true",
      payment: "Paid",
      status: "Cancelled",
      total: 1450,
      hasInvoice: true,
    },
    {
      id: "#12529",
      productName: "Headphone",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/929278ef43a9c7cc32ce6a3bafdac28557ecf8f2?placeholderIfAbsent=true",
      payment: "Paid",
      status: "Cancelled",
      total: 1200,
      hasInvoice: true,
    },
    {
      id: "#12532",
      productName: "COCO Perfume",
      productImage:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/60f5704a71b413465f203ed7912a98d8029f2c90?placeholderIfAbsent=true",
      payment: "COD",
      status: "Pending",
      total: 720,
      hasInvoice: true,
    },
  ];

function OrderHistorySection() {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    const handleFilterChange = (filter: OrderFilter, value: string) => {
        let sortedOrders = [...orders];
    
        switch (filter) {
          case "Date":
            // In a real app, we would sort by date
            break;
          case "Payment":
            sortedOrders.sort((a, b) =>
              value === "asc"
                ? a.payment.localeCompare(b.payment)
                : b.payment.localeCompare(a.payment),
            );
            break;
          case "Status":
            sortedOrders.sort((a, b) =>
              value === "asc"
                ? a.status.localeCompare(b.status)
                : b.status.localeCompare(a.status),
            );
            break;
          case "A-Z":
            sortedOrders.sort((a, b) =>
              value === "asc"
                ? a.productName.localeCompare(b.productName)
                : b.productName.localeCompare(a.productName),
            );
            break;
        }
    
        setOrders(sortedOrders);
      };

      
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center text-sm font-semibold justify-center w-full pt-10">
    <div className="flex w-[912px] max-w-full flex-col">
      <div className="text-black text-xl leading-[1.6] max-md:ml-2">
        Order History
      </div>
      <OrderFilters onFilterChange={handleFilterChange} />
      <OrderTable orders={orders} />
    </div>
  </div>
  )
}

export default OrderHistorySection