import React from 'react';
import { VerifiedBadge } from '../dashboard/live-webinars/VerifiedBadge';

interface CommonAvatarProps {
    firstName?: string;
    lastName?: string;
}

const CommonAvatar: React.FC<CommonAvatarProps> = ({ firstName, lastName }) => {
    return (
        <div className="flex items-center gap-5 text-base mt-5">
            <div className="bg-gradient-to-r from-[#760F6D] to-[#DC1CCC] p-3 rounded-full text-white w-12 h-12 flex items-center justify-center border-4 border-white/70">
                {firstName?.charAt(0).toUpperCase()}
                {lastName?.charAt(0).toUpperCase()}
            </div>
            <div className="self-stretch flex flex-col items-stretch justify-center">
                <div className="flex items-center gap-5 text-black justify-center">
                    <div className="self-stretch my-auto">{firstName} {lastName}</div>
                    <svg
              width="18"
              height="18"
              viewBox="3 -1 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            className='w-10 h-10 p-0 '
            >
              <path
                d="M12 2C8.694 2 6 4.694 6 8C6 11.306 8.694 14 12 14C15.306 14 18 11.306 18 8C18 4.694 15.306 2 12 2ZM14.868 6.62L11.466 10.022C11.382 10.106 11.268 10.154 11.148 10.154C11.028 10.154 10.914 10.106 10.83 10.022L9.132 8.324C8.958 8.15 8.958 7.862 9.132 7.688C9.306 7.514 9.594 7.514 9.768 7.688L11.148 9.068L14.232 5.984C14.406 5.81 14.694 5.81 14.868 5.984C15.042 6.158 15.042 6.44 14.868 6.62Z"
                fill="#54A93F"
              />
            </svg>
                </div>
                <div className="text-black/50 text-sm mt-1">{''}</div>
            </div>
        </div>


    );
};

export default CommonAvatar;
