"use client"
import React from "react";

interface FilterButtonProps {
  label: string;
  onClick?: () => void;
}

export const WebinarFilterButton: React.FC<FilterButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-[10px] border-[0.6px] border-[#D5D5D5] hover:bg-gray-50 transition-colors"
    >
      <div className="text-sm text-[#202224]">{label}</div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M19 9L12 16L5 9"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
