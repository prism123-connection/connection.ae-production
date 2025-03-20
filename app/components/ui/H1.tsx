import React from 'react'
import { ReactNode } from "react";

interface headingProps {
    children: ReactNode;
    classes?: string;
  }

  const H1 : React.FC<headingProps> = ({  children }) => {
  return (
    <h1 className="text-5xl font-semibold leading-relaxed ">
    {children}
      </h1>
  )
}

export default H1