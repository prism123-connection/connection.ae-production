import React from "react";

interface SpecialInputsProps {
  label?: string; 
  name: string;
  classes?: string;
  placeholder?: string;
  value?: string; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  disabled?: boolean;
  type?: string;
}

const SpecialInputs: React.FC<SpecialInputsProps> = ({ 
  label = "", 
  name, 
  classes = "", 
  placeholder = "", 
  value = "", 
  onChange, 
  type = "text",
  disabled = false 
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2 text-md font-medium text-[#1F587C]  ">
        {label}
      </label>
      <input
        onChange={onChange}
        disabled={disabled}
        type={type}
        name={name}
        id={name}
        value={value}
        className={`bg-gray-50  text-[#333] text-sm rounded-lg focus:ring-2 focus:ring-[#1F587C] outline-none
            block w-full p-2.5 ${classes}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default SpecialInputs;
