export const WishlistHeader = () => {
    return (
      <div className="justify-between items-center border-b-[color:var(--neutral-03100,#E8ECEF)] flex w-full gap-[40px_100px] text-sm text-[#6C7275] font-normal whitespace-nowrap leading-loose flex-wrap pl-8 pb-2 border-b border-solid max-md:pl-5">
        <div className="self-stretch min-w-80 my-auto">Product</div>
        <div className="self-stretch my-auto">Price</div>
        <div className="self-stretch w-[137px] my-auto">Action</div>
      </div>
    );
  };