"use client"
import React, { useState } from 'react'
import { Disclosure } from "@headlessui/react";
import { HiChevronDown  } from "react-icons/hi2";

// Define FAQ item type
interface FAQItem {
  question: string;
  answer: string;
}

// Define props type for FaqContent component
interface FaqContentProps {
  faqData: FAQItem[];
}

const FaqContent: React.FC<FaqContentProps> = ({ faqData }) => {

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 ">
    {faqData.map((faq, index) => (
        <>
      <Disclosure key={index}>
        {({ open }) => (
          <div className=' transition-transform duration-1000 border-b-1 border-[#C8D5DE]/70 mb-10 pb-2'>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-left bg-white text-lg font-semibold ">
              {faq.question}
              <HiChevronDown size={20}/>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 text-[#001625] text-base">{faq.answer}</Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      </>
    ))}
  </div>
  )
}

export default FaqContent