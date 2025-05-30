interface UserAvatarProps {
    initials: string;
  }
  
  export const UserAvatar = ({ initials }: UserAvatarProps) => {
    return (
      <div className="relative w-[46px] h-[46px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#760F6D] to-[#DC1CCC]" />
        <div className="absolute inset-[2px] rounded-full border border-white border-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium tracking-tight">
          {initials}
        </div>
      </div>
    );
  };
  