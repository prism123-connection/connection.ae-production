import Image from "next/image";
import React from "react";

interface FormSectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onPrev: () => void;
}


export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  children,
  onPrev
}) => {
    const func = () => {
        alert('FormSection')
        }   
  return (
    <div
    className="w-full min-h-screen absolute top-0 left-0  flex items-center justify-center z-20 p-20 overflow-hidden backdrop-blur-[3px]  ">
    <div className="w-[814px] max-w-full bg-white  overflow-hidden  rounded-4xl z-40">
        <div className="bg-white flex  text-black justify-start gap-10 p-5 rounded-[32px_32px_0px_0px] border-[rgba(0,0,0,0.12)] border-b max-md:max-w-full  relative overflow-hidden">
          
            <Image
              src={'/logo.svg'}
              className=" object-cover inset-0"
              alt="Background pattern"
              width={80}
              height={80}
            />

            <div className=" flex flex-col items-stretch max-md:max-w-full">
              <h2 className="text-[32px] tracking-[-1.28px] max-md:max-w-full">
                {title}
              </h2>
              <p className="text-sm tracking-[-0.56px] mt-2">{subtitle}</p>
            </div>

            <button onClick={onPrev} className="absolute right-5 top-5 cursor-pointer " aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M6 6L18 18M6 18L18 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
        </div>
        {children}
    </div>
    </div>
  );
};
