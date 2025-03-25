import React from "react";

interface SquareCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<SquareCheckboxProps> = ({ label, checked = false, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-5 h-5 border-2 border-gray-400 rounded-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
      <span className="text-gray-900 dark:text-white">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
