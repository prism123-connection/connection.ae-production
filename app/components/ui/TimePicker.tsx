import React, { useEffect, useRef } from "react";

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
    setGoLiveDateParts: React.Dispatch<
    React.SetStateAction<{
      date: string;
      hour: string;
      minute: string;
      meridiem: string;
    }>
  >;
}

const TimePicker: React.FC<TimePickerProps> = ({ handleChange, goLiveDateParts, setGoLiveDateParts  }) => {

  const previousDateRef = useRef<string | null>(null);

  useEffect(() => {
    if (!goLiveDateParts.date) return;

    const selectedDate = new Date(goLiveDateParts.date);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Only run if date has changed AND it's today
    const isSameAsPrevious = previousDateRef.current === goLiveDateParts.date;
    if (!isSameAsPrevious && selectedDate.getTime() === today.getTime()) {
      const now = new Date();
      now.setMinutes(0, 0, 0); // round to top of hour
      now.setHours(now.getHours() + 1); // add 1 hour

      let hour = now.getHours();
      const minute = now.getMinutes();
      const meridiem = hour >= 12 ? "PM" : "AM";

      hour = hour % 12;
      if (hour === 0) hour = 12;

      setGoLiveDateParts({
        date: goLiveDateParts.date,
        hour: String(hour).padStart(2, "0"),
        minute: String(minute).padStart(2, "0"),
        meridiem: meridiem,
      });

      previousDateRef.current = goLiveDateParts.date;
    }

    // Reset the flag if a different date is selected
    if (previousDateRef.current !== goLiveDateParts.date) {
      previousDateRef.current = null;
    }
  }, [goLiveDateParts.date]);



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
