import React from "react";

interface QuantityButtonProps {
  quantity: number;
  onChange?: (quantity: number) => void;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  onChange,
}) => {
  return (
    <div className="justify-center items-stretch rounded border border-[color:var(--neutral-04100,#6C7275)] self-stretch flex min-h-8 flex-col text-xs text-center w-20 my-auto px-2 py-1.5 border-solid">
      <div className="flex flex-col relative aspect-[3.2] w-16 px-2">
        <input
          type="number"
          value={quantity}
          onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
          className="absolute h-full w-full inset-0 text-center bg-transparent"
          min="1"
        />
      </div>
    </div>
  );
};