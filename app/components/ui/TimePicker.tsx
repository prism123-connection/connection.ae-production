import React from "react";

interface TimePickerProps {
  onChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange }) => {
  return (
    <div className="flex items-center gap-4 text-sm text-[#BDC0CC] font-normal">
      <select
        className="justify-center items-stretch rounded border border-[color:var(--Primary-Focused,#0095E5)] shadow-[0px_0px_0px_3.2px_rgba(32,162,232,0.25)] bg-white self-stretch flex flex-col overflow-hidden whitespace-nowrap w-[42px] p-1 border-solid"
        onChange={(e) => onChange(e.target.value)}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {String(i + 1).padStart(2, "0")}
          </option>
        ))}
      </select>
      <span className="text-[#494E50] font-medium">:</span>
      <select
        className="justify-center items-stretch rounded border border-[color:var(--Line-Enable,#E5E7F0)] bg-[#F5F7FA] self-stretch flex flex-col overflow-hidden whitespace-nowrap p-1 border-solid"
        onChange={(e) => onChange(e.target.value)}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <span className="text-[#494E50] font-medium">:</span>
      <select
        className="justify-center items-stretch rounded border border-[color:var(--Line-Enable,#E5E7F0)] bg-[#F5F7FA] self-stretch flex flex-col overflow-hidden p-1 border-solid"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePicker;
