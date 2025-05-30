"use client"
import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

interface DatePickerProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ handleChange }) => {


    const handleDateValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    // Remove time from both dates to compare only dates
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      handleChange(e);
    } else {
     toast.error('Please select the approriate date')
    }
  };

  return (
    <div className="relative">

        <div className=" bg-amber-300 rounded-lg shadow-lg border border-[#E5E7F0]">
          <div className="calendar-content">
            <input
              type="date"
              name="date"
              onChange={handleDateValidation}
              className="w-full p-2  justify-center items-stretch border border-[color:var(--Primary-Focused,#0095E5)] shadow-[0px_0px_0px_3.2px_rgba(32,162,232,0.25)] bg-white flex min-w-60 flex-col overflow-hidden flex-1 shrink basis-[0%] px-2 py-3 rounded-lg border-solid text-black/80"
            />
          </div>
        </div>
    </div>
  );
};

export default DatePicker;

// onChange={(e) => handleDateSelect(new Date(e.target.value))}