import React from 'react'
  interface ActionButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "success" | "proceed";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
  }

  const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    variant = "primary",
    onClick,
    className,
    type = "button",
  }) => {
    const baseStyles =
      "flex items-center gap-3 text-sm  text-center justify-center px-10 py-3 rounded-xl border-solid  transition hover:shadow-[6px_6px_10px_rgba(0,0,0,0.2)] cursor-pointer  ";
  
    const variants = {
      primary: "bg-[#001625] text-white border-[rgba(0,22,37,0.08)]",
      secondary: "bg-white text-[rgba(0,22,37,1)] border-[#001625]/50 border-2",
      success : "bg-[#06B079] shadow-[6px_6px_10px_rgba(0,0,0,0.2)] text-white",
      proceed : "bg-[rgba(244,128,32,1)] shadow-[6px_6px_10px_rgba(0,0,0,0.2)] text-white",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

export default ActionButton