import React from 'react'
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  classes?: string;
  onClickFunc?: () => void; // Function prop
}

const PrimaryButtons : React.FC<ButtonProps> = ({  children, classes, onClickFunc }) => {
  return (
  <button
  onClick={onClickFunc}
  className={`login mt-4 px-[60px] py-[10px] bg-[#001625] flex items-center gap-1 text-white w-max text-sm rounded-[6px] transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)] cursor-pointer  ${classes}`}>
    {children}
  </button>
  )
}

export default PrimaryButtons