import React from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface MenuListProps {
  items: MenuItem[];
  activeSetup: number;
  setActiveSetup: React.Dispatch<React.SetStateAction<number>>;
}

export const EcommerceSideNavOptions: React.FC<MenuListProps> = ({ items , activeSetup, setActiveSetup }) => {
  return (
    <div className="w-full text-base text-[#6C7275] leading-loose mt-10">
       <div
          
          className="w-full py-2 border-b cursor-pointer transition-colors text-[#141718] font-semibold border-[rgba(20,23,24,0.12)] text-lg" >
          Account Setup
        </div>
      {items.map((item, index) => (
        <div
          key={item.label}
          onClick={()=>setActiveSetup(index)}
          className={cn(
            "w-full py-2  cursor-pointer transition-colors",
            activeSetup === index
              ? "text-[#141718] font-semibold "
              : " hover:text-[#141718]",
          )}
          role="button"
          tabIndex={0}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
