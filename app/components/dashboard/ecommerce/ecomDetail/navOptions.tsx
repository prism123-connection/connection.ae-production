import React from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface MenuListProps {
  items: MenuItem[];
}

export const EcommerceSideNavOptions: React.FC<MenuListProps> = ({ items }) => {
  return (
    <div className="w-full text-base text-[#6C7275] leading-loose mt-10">
      {items.map((item, index) => (
        <div
          key={item.label}
          onClick={item.onClick}
          className={cn(
            "w-full py-2 border-b cursor-pointer transition-colors",
            index === 3
              ? "text-[#141718] font-semibold border-[rgba(20,23,24,0.12)]"
              : "border-b-[color:var(--Transparent,rgba(255,255,255,0.00))] mt-3 border-solid hover:text-[#141718]",
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
