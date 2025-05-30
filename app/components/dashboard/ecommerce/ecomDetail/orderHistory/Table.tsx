import { OrderTableRow } from "./Row";

interface Order {
    id: string;
    productName: string;
    productImage: string;
    payment: "Paid" | "COD";
    status: "Pending" | "Cancelled" | "Delivered";
    total: number;
    hasInvoice?: boolean;
  }

interface OrderTableProps {
  orders: Order[];
}

export const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="bg-white self-stretch w-full mt-4 pb-20 rounded-lg">
      <div className="bg-[rgba(252,253,253,1)] border flex w-full items-stretch gap-5 text-[rgba(32,34,36,1)] flex-wrap justify-between px-10 py-4 rounded-[14px_14px_0px_0px] border-[rgba(213,213,213,1)] border-solid">
        <div className="flex gap-5 w-full  ">
          <div className="bg-blend-normal font-normal min-w-20 ">Id</div>
          <div className="bg-blend-normal flex-1  min-w-20 ">Product name</div>
          <div className="bg-blend-normal min-w-20 text-center ">Payment</div>
          <div className="bg-blend-normal min-w-20 ">Status</div>
          <div className="bg-blend-normal min-w-20 ">Total</div>
          <div className="bg-blend-normal min-w-20 ">Invoice</div>
        </div>
 
      </div>
      {orders.map((order) => (
        <OrderTableRow key={order.id} order={order} />
      ))}
    </div>
  );
};
