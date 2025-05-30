import React from 'react'
import { ReactNode } from "react";

interface SectionHeaderProps {
    children: ReactNode;
    classes?: string;
  }
  
  const SectionHeader: React.FC<SectionHeaderProps> = ({  children, classes = ""  }) => {
    return (
        <section className={`w-full flex items-center justify-center text-darkBlue flex-col ${classes}`}>
        {children}
      </section>
    );
  };

export default SectionHeader