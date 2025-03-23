"use client"
import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import React, { useState, useMemo, useEffect } from 'react'
import clsx from "clsx"; 
import FaqContent from '@/app/sections/FaqContent';

interface FAQItem {
  question: string;
  answer: string;
}

// Store all FAQ categories in an array
const faqCategories: FAQItem[][] = [
  [ // Membership
    { question: "1. What is Connection Dubai Network?", answer: "Connection Dubai Network is a trusted business platform that connects entrepreneurs, traders, and professionals worldwide." },
    { question: "2. How much does the membership cost?", answer: "The membership costs $100 per year." },
    { question: "3. Is the membership valid globally?", answer: "Yes, the membership provides global business access." },
    { question: "4. Do I need a Dubai trade license to use the platform?", answer: "No, our membership allows you to do business without needing a license." },
    { question: "5. How long does the membership last?", answer: "The membership is valid for one year from the date of registration." },
    { question: "6. Can I cancel my membership?", answer: "Yes, but refunds are not provided after membership activation." },
    { question: "7. Can I upgrade my membership?", answer: "Yes, you can upgrade to a higher membership plan if available." }
  ],
  [ // Business Setup
    { question: "1. How does Connection Dubai help me start a business?", answer: "We provide networking, verified business contacts, and market insights to help you establish and grow your business." },
    { question: "2. Can I list my business on the platform?", answer: "Yes, members can showcase their businesses and services to a global audience." },
    { question: "3. Do I need an office to start a business through Connection Dubai?", answer: "No, you can operate remotely and still access all the platform’s benefits." },
    { question: "4. What industries can I explore on the platform?", answer: "Connection Dubai supports various industries, including trade, real estate, e-commerce, and freelancing." },
    { question: "5. Can I find investors through Connection Dubai?", answer: "Yes, our platform connects businesses with potential investors." },
    { question: "6. What is the process of setting up an online store on the platform?", answer: "Once you register, you can list your products or services for potential buyers." }
  ],
  [ // Referrals & Passive Income
    { question: "1. How do I earn through referrals?", answer: "Share your referral link, and you earn a commission for every successful signup." },
    { question: "2. How do I track my referral earnings?", answer: "Your referral dashboard will display earnings and successful invites." },
    { question: "3. Is there a limit to how many people I can refer?", answer: "No, there is no limit to the number of referrals." },
    { question: "4. How do I withdraw my referral earnings?", answer: "Earnings can be withdrawn through bank transfer or digital payment platforms." },
    { question: "5. Can I refer businesses as well?", answer: "Yes, both individuals and businesses can join through referrals." }
  ],
  [ // Networking & Business Growth
    { question: "1. What kind of networking opportunities are available?", answer: "Connection Dubai hosts online and offline networking events, forums, and business matchmaking." },
    { question: "2. Are there mentorship programs?", answer: "Yes, we offer mentorship and training sessions with business experts." },
    { question: "3. Can I collaborate with other members?", answer: "Absolutely! Members can create business partnerships and joint ventures." },
    { question: "4. Are there exclusive networking events?", answer: "Yes, premium members gain access to invite-only business networking events." },
    { question: "5. How do I join business webinars?", answer: "Webinars are listed on your dashboard, and you can register through the platform." },
    { question: "6. Can I create my own networking event?", answer: "Yes, members can propose and host business-related events." }
  ],
  [ // Security & Verification
    { question: "1. How do you verify businesses and members?", answer: "We conduct a strict verification process, including identity and business validation." },
    { question: "2. Is my data safe on the platform?", answer: "Yes, we use advanced encryption to protect your personal and business data." },
    { question: "3. What happens if I encounter a fraudulent user?", answer: "Report the user to our support team, and necessary action will be taken." },
    { question: "4. How do I protect myself from scams?", answer: "Engage only with verified members and conduct due diligence before making deals." },
    { question: "5. Are payments secure on the platform?", answer: "Yes, we offer secure payment processing and escrow services." },
    { question: "6. How does quality assurance work?", answer: "Businesses are reviewed based on customer feedback and ratings." }
  ],
  [ // Platform Usage & Features
    { question: "1. How do I contact customer support?", answer: "You can reach out via email, live chat, or phone support." },
    { question: "2. Are there mobile apps for Connection Dubai?", answer: "Yes, our mobile app is available for Android and iOS." },
    { question: "3. Can employees also benefit from this network?", answer: "Yes, employees can use the platform to explore additional income opportunities." },
    { question: "4. What is the process for onboarding new members?", answer: "After registration, new members receive a detailed guide and support to maximize platform benefits." },
    { question: "5. What makes Connection Dubai Network different from other platforms?", answer: "We provide a secure, verified, and result-driven platform where businesses grow and succeed." }
  ]
];

function FAQ() {
  const [activeId, setActiveId] = useState<number>(0);
  const [loadingState, setLoadingState] = useState<boolean>(true)

  // Optimize with useMemo to prevent unnecessary calculations
  const faqContent = useMemo(() => faqCategories[activeId], [activeId]);

  const btnClass = "mt-4 px-8 py-2 bg-[#F7FAFC] flex items-center gap-1 text-[#001625] w-max text-base rounded-4xl transition outline-2 outline-[#001625]/10 cursor-pointer";
  const activeBtnClass = "mt-4 px-8 py-2 bg-[#001625] flex items-center gap-1 text-white w-max text-base rounded-4xl transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)] outline-4 outline-white/30 cursor-pointer";

  const primaryButtons = ["Membership", "Business Setup", "Referrals & Passive Income"];
  const secondaryButtons = ["Networking & Business Growth", "Security & Verification", "Platform Usage & Additional Features"];

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const cid = urlParams.get("cid");
      if (cid) {
        const parsedCid = parseInt(cid, 10);
        if (!isNaN(parsedCid)) {
          setActiveId(parsedCid);
          setLoadingState(false)
        }
      }
      setLoadingState(false)
    }, []);

  return (
    <div>
      <SectionHeader classes="my-30">
        <H1> Frequently Asked Questions </H1>
        <span className='text-base mt-10 text-center'>
          These are the most frequently asked questions. If you have any specific queries, feel free to contact our customer-friendly support.
        </span>

        {
          !loadingState && 
          <>
          <div className='flex gap-5 mt-10'>
          {primaryButtons.map((btn, index) => (
            <button key={index} onClick={() => setActiveId(index)} className={clsx(activeId === index ? activeBtnClass : btnClass)}>
              {btn}
            </button>
          ))}
        </div>

        <div className='flex gap-5 mb-20'>
          {secondaryButtons.map((btn, index) => (
            <button key={index + 3} onClick={() => setActiveId(index + 3)} className={clsx(activeId === index + 3 ? activeBtnClass : btnClass)}>
              {btn}
            </button>
          ))}
        </div>

        <FaqContent key={activeId} faqData={faqContent} />
        </>
        }

    
      </SectionHeader>
    </div>
  );
}

export default FAQ;
