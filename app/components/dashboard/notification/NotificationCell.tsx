import React from "react";
import { cn } from "@/lib/utils";

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary";
  icon?: string;
}

export interface NotificationCellProps {
  avatar?: string;
  content: string | React.ReactNode;
  timestamp: string;
  isUnread?: boolean;
  actions?: NotificationAction[];
}

export const NotificationCell: React.FC<NotificationCellProps> = ({
  avatar,
  content,
  timestamp,
  isUnread = false,
  actions,
}) => {
  return (
    <div className="bg-white relative w-full">
      {isUnread && (
        <div className="absolute z-0 flex w-4 gap-2.5 pl-2 left-0 top-2">
          <div className="stroke-[1px] border bg-[#90CDF4] flex min-h-2 w-2 h-2 rounded-[50%] border-[rgba(66,153,225,1)] border-solid" />
        </div>
      )}
      <div className="z-0 flex w-full flex-col items-center text-sm font-normal leading-none py-4">
        <div className="flex w-full gap-4 text-[#1A1F36] font-semibold leading-5 px-4">
          {avatar && (
            <img
              src={avatar}
              alt="Notification avatar"
              className="aspect-[1] object-contain w-8 shrink-0 rounded-[32px]"
            />
          )}
          <div className="flex items-center flex-1 shrink basis-[0%] min-w-60 gap-2.5">
            {content}
          </div>
        </div>

        {actions && actions.length > 0 && (
          <div className="flex gap-2 text-center mt-2 pl-16 max-md:pl-5">
            <div className="flex gap-4">
              {actions.map((action, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex min-h-7",
                    action.variant === "primary"
                      ? "text-white"
                      : "text-[#3C4257]",
                  )}
                >
                  <button
                    onClick={action.onClick}
                    className={cn(
                      "justify-center items-center flex min-h-7 gap-2.5 overflow-hidden px-2 py-1 rounded-md",
                      action.variant === "primary"
                        ? "bg-[#E95744]"
                        : "bg-white border border-[#DDDEE1]",
                    )}
                  >
                    <div className="self-stretch flex items-center gap-1.5 my-auto">
                      {action.icon && (
                        <img
                          src={action.icon}
                          alt=""
                          className="aspect-[1] object-contain w-4 self-stretch my-auto"
                        />
                      )}
                      <div className="self-stretch gap-2.5 my-auto">
                        {action.label}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full text-[rgba(165,172,184,1)] mt-2 pl-16 max-md:pl-5">
          {timestamp}
        </div>
      </div>
      <div className="bg-[rgba(228,232,238,1)] z-0 flex min-h-px w-full" />
    </div>
  );
};