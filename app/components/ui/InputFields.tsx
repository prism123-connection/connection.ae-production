import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | number;
  type?: "text" | "number" | "select";
  options?: Option[];
}

const InputField = forwardRef<HTMLInputElement | HTMLSelectElement, InputFieldProps>(
  ({ label, error, type = "text", options, className, ...props }, ref) => {
    const inputClasses = cn(
      "border w-full min-h-[46px] px-4 py-[11px] rounded-[10px]",
      error ? "border-[rgba(215,40,40,1)]" : "border-[rgba(197,197,197,1)]",
      className,
    );

    return (
      <div className="w-full mb-8">
        {label && (
          <label className="text-[#62676C] font-semibold block mb-[5px]">
            {label}
          </label>
        )}

        {type === "select" ? (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            className={inputClasses}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input ref={ref as React.Ref<HTMLInputElement>} type={type} className={inputClasses} {...props} />
        )}

        {error && (
          <div className="flex items-center gap-1 text-[13px] text-[rgba(215,40,40,1)] mt-2 ">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/d6b555135b6d37bfec1d8b83163f9252c565e2ca?placeholderIfAbsent=true"
              className="w-5 h-5"
              alt=""
            />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
