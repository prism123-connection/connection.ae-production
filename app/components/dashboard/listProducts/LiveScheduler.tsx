import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./Form";
import TimePicker from "@/app/components/ui/TimePicker";
import DatePicker from "@/app/components/ui/DatePicker";

interface LiveSchedulerProps {
//   form: UseFormReturn<ProductFormData>;
}

const LiveScheduler: React.FC<LiveSchedulerProps> = ({  }) => {
  return (
    <section className="mb-10">
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
            // onChange={(date) => form.setValue("liveSchedule.date", date)}
            onChange={(date) => console.log(date)}
          />
        </div>
        <div className="w-2/5">
          <TimePicker
            onChange={(time) =>console.log(time)}
            // onChange={(time) => form.setValue("liveSchedule.time", time)}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveScheduler;