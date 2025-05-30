import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./Form";
import TimePicker from "@/app/components/ui/TimePicker";
import DatePicker from "@/app/components/ui/DatePicker";

interface LiveSchedulerProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  goLiveDateParts: {
    date: string;
    hour: string;
    minute: string;
    meridiem: string;
  };
  errors: Record<string, string>;
  setGoLiveDateParts: React.Dispatch<
  React.SetStateAction<{
    date: string;
    hour: string;
    minute: string;
    meridiem: string;
  }>
>;
}

const LiveScheduler: React.FC<LiveSchedulerProps> = ({ handleChange, goLiveDateParts ,   errors, setGoLiveDateParts }) => {
  return (
    <section className="my-10 ">
      <h2 className="text-[#62676C] text-xl font-semibold mb-3">
        Select time to go live
      </h2>
      <p className="text-[rgba(0,22,37,1)] text-sm mb-[26px]">
        Please choose the time you'd like to go live. Users on the Connection
        platform will be able to join.
      </p>

      <div className="flex gap-5">
        <div className="w-3/5">
          <DatePicker
            handleChange={handleChange}
          />
        </div>
        <div className="w-2/5">
          <TimePicker setGoLiveDateParts={setGoLiveDateParts}
           handleChange={handleChange} goLiveDateParts={goLiveDateParts}
          />
        </div>
      </div>
      {errors.goLiveAt && (
          <p className="text-red-500 text-xs mt-5">{errors.goLiveAt}</p>
        )}
    </section>
  );
};

export default LiveScheduler;