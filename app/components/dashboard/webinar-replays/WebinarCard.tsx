import React from "react";

interface WebinarCardProps {
  image: string;
  title: string;
  host: string;
  hostImage: string;
  date: string;
  duration: string;
  verified?: boolean;
}

export const WebinarCard: React.FC<WebinarCardProps> = ({
  image,
  title,
  host,
  hostImage,
  date,
  duration,
  verified = true,
}) => {
  return (
    <article className="flex border bg-white shadow-[1px_1px_2px_0px_rgba(0,0,0,0.16)] overflow-hidden rounded-xl border-[#DDD] max-sm:flex-col">
      <img
        src={image}
        alt={title}
        className="w-[225px] h-[178px] object-cover max-sm:w-full"
      />
      <div className="flex flex-col flex-1 gap-3 p-6">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <div className="flex items-center gap-3">
          <img
            src={hostImage}
            alt={host}
            className="w-[32px] h-[32px] rounded-full"
          />
          <div className="text-sm">{host}</div>
          {verified && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M12 2C8.694 2 6 4.694 6 8C6 11.306 8.694 14 12 14C15.306 14 18 11.306 18 8C18 4.694 15.306 2 12 2ZM14.868 6.62L11.466 10.022C11.382 10.106 11.268 10.154 11.148 10.154C11.028 10.154 10.914 10.106 10.83 10.022L9.132 8.324C8.958 8.15 8.958 7.862 9.132 7.688C9.306 7.514 9.594 7.514 9.768 7.688L11.148 9.068L14.232 5.984C14.406 5.81 14.694 5.81 14.868 5.984C15.042 6.158 15.042 6.44 14.868 6.62Z"
                fill="#54A93F"
              />
            </svg>
          )}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 text-sm opacity-50">
            <div>{date}</div>
            <div className="w-px h-[21px] bg-[#D5D5D5]" />
            <div>{duration}</div>
          </div>
          <button className="flex items-center gap-2 bg-[#F48020] text-white text-sm px-4 py-2 rounded-[10px] border-[0.6px] border-[rgba(255,255,255,0.37)] hover:bg-[#E37010] transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-40"
            >
              <path
                d="M8 5.5C8 4.94772 8.59847 4.58579 9.08794 4.85973L16.6193 9.10661C17.1185 9.38532 17.1185 10.1147 16.6193 10.3934L9.08794 14.6403C8.59847 14.9142 8 14.5523 8 14V5.5Z"
                fill="white"
              />
            </svg>
            <span>Watch replay</span>
          </button>
        </div>
      </div>
    </article>
  );
};