import React from "react";

interface UserProfileProps {
  avatarUrl: string;
  name: string;
  memberSince: string;
}

export const EcommerceUserProfile: React.FC<UserProfileProps> = ({
  avatarUrl,
  name,
  memberSince,
}) => {
  return (
    <div className="flex flex-col items-center text-black">
      <img
        src={avatarUrl}
        alt={`${name}'s profile picture`}
        className="aspect-[1.04] object-contain w-[50px] rounded-[40px]"
      />
      <div className="text-xl leading-[1.6] mt-1.5">{name}</div>
      <div className="text-sm leading-none mt-1.5">{memberSince}</div>
    </div>
  );
};