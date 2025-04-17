import React from "react";
import { QuantityButton } from "./CartQuantityButton";

export interface CartItemProps {
  image: string;
  name: string;
  quantity: number;
  price: number;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  quantity,
  price,
  onQuantityChange,
  onRemove,
}) => {
  const subtotal = price * quantity;

  return (
    <div className="justify-between items-center border-b-[color:var(--neutral-03100,#E8ECEF)] flex w-full flex-wrap py-6 border-b border-solid max-md:max-w-full">
      <div className="self-stretch min-w-60 text-sm text-[#6C7275] leading-loose  my-auto">
        <div className="flex w-full  items-center gap-4">
          <img
            src={image}
            className="aspect-[1.92] object-contain w-30 self-stretch shrink-0 my-auto"
            alt={name}
          />
          <div className="self-stretch flex gap-4 flex-1 shrink basis-[0%] my-auto ml-10">
            <div className="flexflex-col items-stretch justify-center">
              <div className="text-[#141718]">{name}</div>
              {/* <div className="text-xs font-normal leading-loose mt-2">
                Color: {color}
              </div> */}
              <button
                onClick={onRemove}
                className="items-center flex gap-0.5 whitespace-nowrap mt-2 text-[#6C7275] hover:text-[#141718] transition-colors"
              >
                <div className="self-stretch flex items-center gap-1 my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ff3c588fcec789f2cb54dbcd7b603241e71be45?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                  />
                  <span>Remove</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex min-w-60 items-center gap-[40px_65px] text-[#121212] whitespace-nowrap text-right leading-loose justify-between w-[328px] my-auto">
        <QuantityButton quantity={quantity} onChange={onQuantityChange} />
        <div className="text-[#141718] text-xl font-normal leading-[1.1] self-stretch my-auto">
          ${price.toFixed(2)}
        </div>
        <div className="text-lg self-stretch my-auto">
          ${subtotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};