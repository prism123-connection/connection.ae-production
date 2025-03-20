import React from 'react'
import { ReactNode } from "react";

interface buttonProps {
    children: ReactNode;
    classes?: string;
  }

const PrimaryButtons : React.FC<buttonProps> = ({  children, classes }) => {
  return (
  <button className={`login mt-4 px-[60px] py-[10px] bg-[#001625] flex items-center gap-1 text-white w-max text-sm rounded-[6px] transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)] ${classes}`}>
    {children}
  </button>
  )
}

export default PrimaryButtons