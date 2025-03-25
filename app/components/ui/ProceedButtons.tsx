import React from 'react'
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  classes?: string;
  disabled?: boolean;
  onClickFunc?: () => void; // Function prop
}

const ProceedButtons : React.FC<ButtonProps> = ({  children, classes, onClickFunc, disabled=false }) => {
  return (
  <button
  disabled={disabled}
  onClick={onClickFunc}
  className={`login mt-4 px-[60px] py-[10px] bg-[#06B079] flex items-center gap-1 text-white w-max text-sm rounded-xl transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)] cursor-pointer  ${classes}`}>
    {children}
  </button>
  )
}

export default ProceedButtons