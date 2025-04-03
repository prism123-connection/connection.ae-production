"use client"
import React, { useState } from "react";
import { format } from "date-fns";

interface DatePickerProps {
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <div
        className="flex w-full gap-2 text-[#BDC0CC] cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div className="justify-center items-stretch border border-[color:var(--Primary-Focused,#0095E5)] shadow-[0px_0px_0px_3.2px_rgba(32,162,232,0.25)] bg-white flex min-w-60 flex-col overflow-hidden flex-1 shrink basis-[0%] px-2 py-3 rounded-lg border-solid">
          <div className="flex w-full items-center gap-1">
            <div className="flex-1">{format(selectedDate, "MM/dd/yyyy")}</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/4a7a10867301c19523fcbef8cedf6a0bb4a0324e?placeholderIfAbsent=true"
              className="w-4 h-4"
              alt=""
            />
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="absolute top-full left-0 z-50 mt-2 bg-white rounded-lg shadow-lg border border-[#E5E7F0] p-4">
          <div className="calendar-content">
            {/* Calendar implementation would go here */}
            {/* For brevity, using a simple date input */}
            <input
              type="date"
              className="w-full p-2 border rounded"
              onChange={(e) => handleDateSelect(new Date(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;