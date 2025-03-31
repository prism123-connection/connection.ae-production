import React from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder = "Type...",
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col  ">
      <label className=" text-xs text-[rgba(31,88,124,1)] max-md:ml-2.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="self-center bg-white border w-full mx-28 text-[rgba(102,102,102,1)] mt-1.5 p-4 rounded-xl border-black/20 border-solid"
      />
    </div>
  );
};
