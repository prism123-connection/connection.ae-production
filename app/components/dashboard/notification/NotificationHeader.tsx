import React from "react";

interface NotificationHeaderProps {
  onMarkAllRead: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  onMarkAllRead,
}) => {
  return (
    <div className="bg-white flex w-full items-center text-sm text-[#1A1F36] font-normal leading-none px-4 py-3 border-[rgba(228,228,228,1)] border-b">
      <button
        onClick={onMarkAllRead}
        className="self-stretch flex my-auto hover:text-[#E95744] transition-colors"
      >
        <div className="flex items-center gap-1">
          <div className="self-stretch my-auto">Mark all as read</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/fefd06ddaab56f4387a5071df735e312cbf261ac?placeholderIfAbsent=true"
            alt="Mark as read icon"
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
          />
        </div>
      </button>
    </div>
  );
};
