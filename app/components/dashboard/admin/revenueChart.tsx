import React from "react";

export const RevenueChart: React.FC = () => {
  return (
    <div className="border  border-[color:var(--gray-200,#E4E4E7)] bg-white w-full mx-auto px-[25px] py-[15px] rounded-2xl border-solid h-full flex flex-col justify-between ">
      <div className="flex w-full  items-stretch gap-5 flex-wrap justify-between">
        <div className="text-zinc-900 text-2xl font-semibold leading-none mt-2.5">
          Revenue report
        </div>
        <div className="justify-center items-center border bg-white flex gap-2.5 text-sm text-[rgba(0,22,37,1)] font-normal text-right leading-none px-4 py-2 rounded-lg border-solid border-[#DEDEDE]">
          <div className="self-stretch my-auto">6 Months</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/1d7cb1b51ea9d88fcc379bec4621549b6a104fb4?placeholderIfAbsent=true"
            alt="Dropdown"
            className="aspect-[2] object-contain w-2 stroke-[1px] stroke-zinc-900 self-stretch shrink-0 my-auto"
          />
        </div>
      </div>

      <div className="flex flex-col bg-white ">
      <div className="flex flex-col relative min-h-[189px] ">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/b78927cf39391340cb0ebbc19fabcfcb4ea1a3d4?placeholderIfAbsent=true"
          alt="Revenue chart"
          className="absolute h-full w-full object-cover inset-0"
        />
        <div className="relative border-zinc-100 border bg-zinc-100 shrink-0 h-px -mb-8 border-solid" />
      </div>
      <div className="border-zinc-100 border bg-zinc-100 w-full shrink-0 h-px border-solid" />
      <div className="flex items-stretch gap-5 text-[13px] text-zinc-600 font-medium whitespace-nowrap leading-loose flex-wrap justify-between mt-[18px]">
        {["Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => (
          <div key={month} className="text-center">
            {month}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
