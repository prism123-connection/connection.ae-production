import React from "react";
import { CartItem, CartItemProps } from "./CartItem";


interface CartTableProps {
  items: CartItemProps[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export const CartTable: React.FC<CartTableProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="w-full font-semibold max-md:max-w-full">
      <div className="justify-between border-b-[color:var(--neutral-04100,#6C7275)] flex w-full gap-[40px_100px] text-base text-[#121212] whitespace-nowrap leading-loose flex-wrap pb-5 border-b border-solid max-md:max-w-full">
        <div>Product</div>
        <div className="flex min-w-60 items-center gap-[40px_72px] justify-between w-[322px]">
          <div className="self-stretch my-auto">Quantity</div>
          <div className="self-stretch my-auto">Price</div>
          <div className="self-stretch my-auto">Subtotal</div>
        </div>
      </div>
      {items.map((item, index) => (
        <CartItem
          key={index}
          {...item}
          onQuantityChange={(quantity) => onUpdateQuantity(index, quantity)}
          onRemove={() => onRemoveItem(index)}
        />
      ))}
    </div>
  );
};
