import React from "react";

interface SelectProps {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({ 
  name, 
  value, 
  onValueChange, 
  options, 
  placeholder, 
  className = "" 
}) => {
  return (
    <div className="w-full ">
      <label htmlFor={name} className="block mb-2 text-md font-medium text-[#1F587C]">
        {name}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onValueChange(e.target.value)} // Fix: Added onChange handler
        className={`bg-gray-50 text-[#333]/50 text-sm rounded-lg w-full p-2.5 focus:ring-2 focus:ring-[#1F587C] outline-none ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-[#333]">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
