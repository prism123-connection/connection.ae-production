import ActionButton from "@/app/components/ui/ActionButton";
import React from "react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";


interface AddressCardProps {
  title: string;
  name: string;
  address: string;
  country: string;
  phone: string;
  email: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  title,
  name,
  address,
  country,
  phone,
  email,
  onEdit,
  onDelete,
}) => {
  return (

    <>
    <div className="border flex w-[408px] max-w-full flex-col text-sm leading-loose pt-6 pb-[13px] px-[23px] rounded-xl border-[rgba(207,207,207,1)] border-solid max-md:px-5">
      <h3 className="text-black text-base font-semibold leading-none">
        {title}
      </h3>
      <div className="text-black mt-3">{name}</div>
      <address className="text-black leading-[22px] w-[261px] mt-1 not-italic">
        {address}
        <br />
        {country}
        <br />
        {phone}
      </address>

      <div className=" flex w-full items-center justify-center gap-5 mt-5 ">
      <div className="text-black">{email}</div>
        <ActionButton onClick={onEdit} variant="secondary" className="text-blue-500! px-5! border-0!">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/4edff493573ab0f98350f5722f048ec92213dfd1?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
          alt=""
        />
        <span className="self-stretch my-auto">Edit</span>
        </ActionButton>
        <ActionButton onClick={onDelete} variant="secondary" className="text-red-500! px-5! border-0!">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/92d5f47b278f7bb9da0bd1b541c0fb02876834af?placeholderIfAbsent=true"
          className="aspect-[0.8] object-contain w-4 self-stretch shrink-0 my-auto"
          alt=""
        />
        <span className="self-stretch my-auto">Delete</span>
        </ActionButton>
      </div>
      
    </div>

    </>
  );
};
