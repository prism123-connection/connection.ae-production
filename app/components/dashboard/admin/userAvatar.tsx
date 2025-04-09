import React from "react";

interface UserAvatarProps {
  src: string;
  name: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, name }) => {
  return (
    <div className="flex items-center gap-1">
      <img
        src={src}
        alt={name}
        className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto rounded-[50%]"
      />
      <div className="self-stretch my-auto text-sm underline">{name}</div>
    </div>
  );
};
