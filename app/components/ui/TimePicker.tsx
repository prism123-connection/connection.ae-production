import React from "react";

interface TimePickerProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  goLiveDateParts: {
    date: string;
    hour: string;
    minute: string;
    meridiem: string;
  };
}

const TimePicker: React.FC<TimePickerProps> = ({ handleChange, goLiveDateParts  }) => {
  return (
    <div className="flex items-center gap-4 text-sm text-black/80 font-normal">

      <select
        className="justify-center items-stretch rounded border border-[color:var(--Primary-Focused,#0095E5)] shadow-[0px_0px_0px_3.2px_rgba(32,162,232,0.25)] bg-white self-stretch flex flex-col overflow-hidden whitespace-nowrap w-fit p-3 border-solid "
        name="hour" value={goLiveDateParts.hour} onChange={handleChange}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {String(i + 1).padStart(2, "0")}
          </option>
        ))}
      </select>

      <span className="text-[#494E50] font-medium">:</span>

      <select
        className="justify-center items-stretch rounded border border-[color:var(--Primary-Focused,#0095E5)] shadow-[0px_0px_0px_3.2px_rgba(32,162,232,0.25)] bg-white self-stretch flex flex-col overflow-hidden whitespace-nowrap w-fit p-3 border-solid"
        name="minute" value={goLiveDateParts.minute} onChange={handleChange}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>

      <span className="text-[#494E50] font-medium">:</span>

      <select
        className="justify-center items-stretch rounded border border-[color:var(--Primary-Focused,#0095E5)] shadow-[0px_0px_0px_3.2px_rgba(32,162,232,0.25)] bg-white self-stretch flex flex-col overflow-hidden whitespace-nowrap w-fit p-3 border-solid"
        name="meridiem" value={goLiveDateParts.meridiem} onChange={handleChange}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePicker;
