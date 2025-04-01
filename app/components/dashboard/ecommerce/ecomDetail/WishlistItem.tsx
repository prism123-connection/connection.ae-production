import ActionButton from "@/app/components/ui/ActionButton";


interface WishlistItemProps {
  checkboxImage: string;
  productImage: string;
  productName: string;
  productColor: string;
  price: string;
  actionLabel: string;
}

export const WishlistItem = ({
  checkboxImage,
  productImage,
  productName,
  productColor,
  price,
  actionLabel,
}: WishlistItemProps) => {
  return (
    <div className="border-b-[color:var(--neutral-03100,#E8ECEF)] flex w-full items-center gap-5 flex-wrap justify-between pr-1.5 py-6 border-b border-solid max-md:max-w-full">
      <div className="self-stretch flex items-center gap-[40px_194px]">
        <div className="self-stretch flex  min-w-96 items-center gap-2.5 my-auto">
          <img
            src={checkboxImage}
            className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
            alt=""
          />
          <div className="self-stretch flex items-stretch gap-4 my-auto">
            <img
              src={productImage}
              className="aspect-[0.83] object-contain w-20 shrink-0 my-auto"
              alt={productName}
            />
            <div className="flex items-center gap-4 h-full">
              <div className="self-stretch flex flex-col items-stretch justify-center my-auto">
                <div className="text-[#141718] text-sm font-semibold leading-loose">
                  {productName}
                </div>
                <div className="text-[#6C7275] text-xs font-normal leading-loose mt-2">
                  Color: {productColor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#141718] text-sm font-semibold leading-loose self-stretch my-auto ">
        {price}
      </div>
      <div className="">
      <ActionButton>{actionLabel}</ActionButton>
      </div>
    </div>
  );
};