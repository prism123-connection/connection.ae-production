import React from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  error?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder = "Type...",
  type = "text",
  value,
  onChange,
  error
}) => {
  return (
    <div className="flex flex-col overflow-hidden w-full ">
      <label className=" text-xs text-[rgba(31,88,124,1)] max-md:ml-2.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="self-center bg-white border w-full text-[rgba(102,102,102,1)] mt-1.5 p-4 rounded-xl border-black/20 border-solid"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
