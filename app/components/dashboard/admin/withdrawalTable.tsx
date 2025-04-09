import React from "react";
import ActionButton from "../../ui/ActionButton";
import { UserAvatar } from "./userAvatar";

export const WithdrawalsTable: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-stretch">
      <div className="flex items-stretch gap-5 text-2xl text-zinc-900 font-semibold leading-[1.1] flex-wrap justify-between">
        <div>Approve withdrawals</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/3e5802be501a51fe8ef74b147fa1ebe3704e191c?placeholderIfAbsent=true"
          alt="More options"
          className="aspect-[1] object-contain w-[13px] shrink-0 mt-3"
        />
      </div>
      <div className="text-[rgba(0,22,37,1)] text-sm font-normal leading-6 mt-3">
        Approve wallet withdrawals between buyer and seller from the table:
      </div>
      <div className="border border-[color:var(--gray-200,#E4E4E7)] bg-white flex w-full flex-col items-center mt-3.5 pb-3 rounded-xl border-solid">
        <div className="border border-[color:var(--gray-200,#E4E4E7)] bg-[#F6F5F6] self-stretch  w-full gap-5 text-sm text-[rgba(0,22,37,1)] font-normal whitespace-nowrap leading-none flex-wrap justify-between pl-5 pr-20 pt-[17px] pb-2.5 rounded-[12px_12px_0px_0px] border-solid
        grid grid-cols-4
        ">
          <div>User</div>
          <div>Request</div>
            <div>Amount</div>
            <div>Action</div>
        </div>
        {/* Withdrawal rows */}
        <div className="w-full px-5">
          {[
            { name: "Sasha Nikki", amount: "1000$", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7128aa6dbbca2bdcdeff5ab1edf2b0824fc9115a?placeholderIfAbsent=true" },
            { name: "Mehreen", amount: "1000$", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/2ee0b19cf66efa990737045733a1b2098b25378c?placeholderIfAbsent=true" },
            { name: "Sara", amount: "1000$", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/9c28cf90bb2c929031b4c4ee927e736d1393da3d?placeholderIfAbsent=true" },
            { name: "Anjali", amount: "1000$", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/79334d931f6ecb9c2ead11c415fbcb38ca0d0a05?placeholderIfAbsent=true" },
            { name: "Penny", amount: "1000$", avatar: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/f3937706994ea67843b43327a3dc6bff2fdb065f?placeholderIfAbsent=true" },
          ].map((withdrawal, index) => (
            <div
              key={index}
              className="grid grid-cols-[25%_25%_20%_30%] py-4 border-b border-gray-100 items-center justify-start w-full "
            >
              <UserAvatar src={withdrawal.avatar} name={withdrawal.name} />
              <div className="text-[#1A1F36] text-sm">Wallet withdrawal</div>
              <div className="text-[#1A1F36] text-sm">{withdrawal.amount}</div>
            <div className="flex gap-5 relative items-center ">
                <ActionButton className=" text-blue-300! font-semibold! bg-blue-300/10! px-3! py-2! max-h-[32px] border-blue-500! hover:shadow-none!">Approve</ActionButton>
                <ActionButton className="text-[#1A1F36]! border-0 bg-transparent! px-0!  underline shrink-0! hover:shadow-none!">Know more</ActionButton>
                </div> 
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
