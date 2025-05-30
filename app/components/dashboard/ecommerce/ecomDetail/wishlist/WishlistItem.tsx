import ActionButton from "@/app/components/ui/ActionButton";


export interface WishlistItemProps {
  image: string;
  name: string;
  quantity: number;
  price: number;
  onRemove?: () => void;
}

export const WishlistItem = ({
  image,
  name,
  quantity,
  price,
  onRemove
}: WishlistItemProps) => {
  return (
    <div className="border-b-[color:var(--neutral-03100,#E8ECEF)] flex w-full items-center gap-5 flex-wrap justify-between pr-1.5 py-6 border-b border-solid max-md:max-w-full">
      <div className="self-stretch flex items-center gap-[40px_194px]">
        <div className="self-stretch flex  min-w-96 items-center gap-2.5 my-auto">
          <img
            onClick={onRemove}
            src={'https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/604d7c4e52959a52c16905a9b315f20500c0a5fc?placeholderIfAbsent=true'}
            className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto cursor-pointer"
            alt=""
          />
          <div className="self-stretch flex items-stretch gap-4 my-auto">
            <img
              src={image}
              className="aspect-[0.83] object-contain w-20 shrink-0 my-auto"
              alt={name}
            />
            <div className="flex items-center gap-4 h-full">
              <div className="self-stretch flex flex-col items-stretch justify-center my-auto">
                <div className="text-[#141718] text-sm font-semibold leading-loose">
                  {name}
                </div>
                {/* <div className="text-[#6C7275] text-xs font-normal leading-loose mt-2">
                  Color: {productColor}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#141718] text-sm font-semibold leading-loose self-stretch my-auto ">
        {price}
      </div>
      <div className="">
      <ActionButton>{'Add to cart'}</ActionButton>
      </div>
    </div>
  );
};