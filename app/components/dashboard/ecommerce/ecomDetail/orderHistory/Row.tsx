import { FileDown } from "lucide-react";

interface Order {
    id: string;
    productName: string;
    productImage: string;
    payment: "Paid" | "COD";
    status: "Pending" | "Cancelled" | "Delivered";
    total: number;
    hasInvoice?: boolean;
  }

interface OrderTableRowProps {
  order: Order;
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "text-[rgba(33,131,63,1)]";
      case "Cancelled":
        return "text-[rgba(220,38,37,1)]";
      default:
        return "text-[rgba(32,34,36,1)]";
    }
  };

  const getPaymentBadgeColor = (payment: Order["payment"]) => {
    return payment === "Paid"
      ? "bg-[rgba(220,250,229,1)] text-[rgba(33,131,63,1)]"
      : "bg-[rgba(252,243,227,1)] text-[rgba(244,158,11,1)]";
  };

  return (
    <>
      <div className="flex w-full max-w-full items-stretch gap-5 text-[rgba(32,34,36,1)] px-10 mt-5">

        <div className="bg-blend-normal font-normal  min-w-20!">
          {order.id}
        </div>

        <div className="flex items-stretch gap-3 min-w-20! flex-1">
          <img
            src={order.productImage}
            className="aspect-[1] object-contain w-5 shrink-0 rounded-[50%]"
            alt={order.productName}
          />
          <div className="bg-blend-normal">{order.productName}</div>
        </div>

          <div
            className={` gap-1 px-3 py-1 rounded-2xl min-w-20! text-center ${getPaymentBadgeColor(
              order.payment,
            )}`}
          >
            {order.payment}
          </div>

          <div className={`bg-blend-normal my-auto ${getStatusColor(order.status)} min-w-20!`} >
            {order.status}
          </div>

          <div className="bg-blend-normal text-[rgba(32,34,36,1)] my-auto min-w-20!">
            ${order.total}
          </div>

          {order.hasInvoice && <FileDown className="h-4 w-4 cursor-pointer min-w-20" />}
        </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/770bf5f3adde599c309f415a73fdb72b9e067b2b?placeholderIfAbsent=true"
        className="object-contain w-full bg-blend-normal mt-[25px] max-md:max-w-full "
      />
    </>
  );
};