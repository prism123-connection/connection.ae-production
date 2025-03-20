import React from 'react'
import { Disclosure } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/solid";

function FaqContent() {
    const faqs = [
        {
            question: "1. What is Connection Dubai Network?",
            answer: "Connection Dubai Network is a trusted business platform that connects entrepreneurs, traders, and professionals worldwide."
        },
        {
            question: "2. How much does the membership cost?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "3. Is the membership valid globally?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "4. Do I need a Dubai trade license to use the platform?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "5. Can I cancel my membership?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "6. Can I upgrade my membership?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];
    
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 ">
    {faqs.map((faq, index) => (
        <>
      <Disclosure key={index}>
        {({ open }) => (
          <div className=' transition-transform duration-1000 border-b-1 border-[#C8D5DE]/70 mb-10 pb-2'>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-left bg-white text-lg font-semibold ">
              {faq.question}
              {/* <ChevronUpIcon className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} /> */}
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