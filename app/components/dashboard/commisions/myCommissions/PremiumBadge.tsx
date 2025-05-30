import React from "react";

export const PremiumBadge: React.FC = () => {
  return (
    <div className="w-[96px] h-[25px]">
      <svg
        width="97"
        height="26"
        viewBox="0 0 97 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="96" height="25" rx="12.5" fill="#DCFAE5" />
        <path
          d="M12.5 14.0769L20.1364 6L18.5 11.9231H24.5L16.8636 20L18.5 14.0769H12.5Z"
          stroke="#21833F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          fill="#21833F"
          style={{ whiteSpace: "pre" }}
          fontFamily="Proxima Nova"
          fontSize="14"
          letterSpacing="0px"
        >
          <tspan x="28.5" y="17.354">
            Premium
          </tspan>
        </text>
      </svg>
    </div>
  );
};