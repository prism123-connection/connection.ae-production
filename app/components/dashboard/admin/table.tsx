import React from "react";
import { ProductImage } from "./image";
import { UserAvatar } from "./userAvatar";
import ActionButton from "../../ui/ActionButton";

export const DealsTable: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-stretch text-zinc-900 pl-[25px] pr-[61px]">
        <div className="flex items-stretch gap-5 text-2xl font-semibold leading-[1.1] flex-wrap justify-between">
          <div>Approve deals</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/3e5802be501a51fe8ef74b147fa1ebe3704e191c?placeholderIfAbsent=true"
            alt="More options"
            className="aspect-[1] object-contain w-[13px] shrink-0 mt-3"
          />
        </div>
        <div className="text-sm font-normal leading-6 mt-3">
          Approve deals between buyer and seller from the table:
        </div>
      </div>
      <div className="border border-[color:var(--Stroke-Primary,#F6F5F6)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white w-full overflow-hidden font-normal mt-3 rounded-xl border-solid">
        <div className="bg-[rgba(246,245,246,1)]  w-full items-stretch gap-5 text-sm text-[rgba(0,22,37,1)] leading-none  pl-6  py-5 grid grid-cols-[5%_20%_14%_15%_20%_20%] ">
          
            <div>Sl.No.</div>
            <div>Product Name</div>
          
          
            <div>Deal Amount</div>
            <div>SKUs</div>
            <div className="flex gap-12">
            <div>Buyer</div>
            <div>Seller</div>
            </div>
          
          <div>Actions</div>
        </div>
        {/* Deal rows */}
        <div className="w-full">
          {[
            {
              id: "01",
              product: { name: "iPhone 14 Pro Max 512...", image: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ffe0cea96879cfde4727501d6bdf1eecc9720a8?placeholderIfAbsent=true" },
              amount: "$1299",
              skus: "1000",
              buyer: { name: "Khasim", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/043d6617cf21f47750487503d107b7cba0fd86e8?placeholderIfAbsent=true" },
              seller: { name: "Abdul", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ef60edb7f30387eedcdf7ad96cde5000554bef2c?placeholderIfAbsent=true" },
            },
            {
              id: "02",
              product: { name: "iPhone 14 Pro Max 512...", image: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ffe0cea96879cfde4727501d6bdf1eecc9720a8?placeholderIfAbsent=true" },
              amount: "$1299",
              skus: "1000",
              buyer: { name: "Khasim", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/043d6617cf21f47750487503d107b7cba0fd86e8?placeholderIfAbsent=true" },
              seller: { name: "Abdul", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ef60edb7f30387eedcdf7ad96cde5000554bef2c?placeholderIfAbsent=true" },
            },
            {
              id: "03",
              product: { name: "iPhone 14 Pro Max 512...", image: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ffe0cea96879cfde4727501d6bdf1eecc9720a8?placeholderIfAbsent=true" },
              amount: "$1299",
              skus: "1000",
              buyer: { name: "Khasim", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/043d6617cf21f47750487503d107b7cba0fd86e8?placeholderIfAbsent=true" },
              seller: { name: "Abdul", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ef60edb7f30387eedcdf7ad96cde5000554bef2c?placeholderIfAbsent=true" },
            },
            {
              id: "04",
              product: { name: "iPhone 14 Pro Max 512...", image: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ffe0cea96879cfde4727501d6bdf1eecc9720a8?placeholderIfAbsent=true" },
              amount: "$1299",
              skus: "1000",
              buyer: { name: "Khasim", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/043d6617cf21f47750487503d107b7cba0fd86e8?placeholderIfAbsent=true" },
              seller: { name: "Abdul", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ef60edb7f30387eedcdf7ad96cde5000554bef2c?placeholderIfAbsent=true" },
            },
            // Add more deals here
          ].map((deal) => (
            <div
              key={deal.id}
              className=" w-full items-center justify-end px-5  py-3 border-b border-[rgba(230,228,231,1)] grid grid-cols-[5%_25%_14%_14%_6%_2%_14%_20%]"
            >
              
                <div className="leading-none">{deal.id}</div>

                <div className="flex items-center gap-2 text-black tracking-[0.14px]">
                  <ProductImage
                    src={deal.product.image}
                    alt={deal.product.name}
                  />
                  <div>{deal.product.name}</div>
                </div>

                <div className="leading-none">{deal.amount}</div>

                <div className="leading-none">{deal.skus}</div>
              
              
                <UserAvatar src={deal.buyer.avatar} name={deal.buyer.name} />

                <img src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/8eafe22afe367196a22f2a41f09cc715ced8183f?placeholderIfAbsent=true" alt="Arrow" className="w-2 h-2" />

                <UserAvatar src={deal.seller.avatar} name={deal.seller.name} />
              
              <div className="flex items-center gap-5">
              <ActionButton className=" text-blue-300! font-semibold! bg-blue-300/10! px-3! py-2! border-blue-500! hover:shadow-none! ">Approve</ActionButton>
              <ActionButton className="text-[#1A1F36]! border-0 bg-transparent! px-0!  underline shrink-0! hover:shadow-none!">Know more</ActionButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};