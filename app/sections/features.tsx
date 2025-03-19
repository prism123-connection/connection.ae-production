"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const featuresData = [
  {
    title: "Live Video Calling",
    description:
      "Engage in real-time conversations to foster connections and collaborations.",
    image: "/features/1.svg",
  },
  {
    title: "Referral Rewards",
    description: "Invite friends and earn rewards for expanding your network.",
    image: "/features/2.svg",
  },
  {
    title: "E-Commerce Integration",
    description:
      "Access a built-in marketplace to buy and sell services and products directly.",
    image: "/features/3.svg",
  },
  {
    title: "Secure User Wallets",
    description:
      "Manage your transactions safely with our integrated wallet system.",
    image: "/features/4.svg",
  },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    featureRefs.current.forEach((feature, index) => {
      if (feature) {
        gsap.to(feature, {
          scale: index === activeFeature ? 1.05 : 1,
          boxShadow:
            index === activeFeature ? "16px 16px 15px rgba(0,0,0,0.8)" : "none",
          duration: 0.3,
        });
      }
    });
  }, [activeFeature]);

  return (
    <div
      id="features"
      className="relative bg-[#021032] flex flex-col overflow-hidden min-h-screen h-screen w-screen"
    >
      <div className="py-6 flex-1 flex flex-col items-center pt-20">
        <Image src={"/divider.svg"} alt="divider" width={100} height={100} />
        <div className="text-center text-white text-4xl my-4 z-10">
          All the tools you need to run your business smoothly, in one place.
        </div>
        <div className="text-center text-[#001625] opacity-50 text-white w-1/2 text-sm mb-24">
          From product listings to customer support, every aspect of your
          business flows seamlessly together – letting you focus on what matters
          most: growing your brand and delighting your customers.
        </div>
        <div className="flex flex-grow w-[90%] px-0 gap-8 items-start justify-around h-0">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`w-full h-[90%] min-h-[290px]! p-1 text-white backdrop-blur rounded-[24px] cursor-pointer transition-all duration-300 ${
                index === activeFeature
                  ? "bg-blue-500/90 shadow-[16px_16px_15px_rgba(0,0,0,0.8)]"
                  : "bg-slate-500/20"
              }`}
              ref={(el) => {
                featureRefs.current[index] = el;
              }}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div
                className={`w-full h-full min-h-[280px]! rounded-[24px] backdrop-blur flex flex-col p-6 ${
                  index === activeFeature
                    ? "bg-[#2248E2]"
                    : "bg-gradient-to-br from-slate-500/70 to-slate-900/50"
                }`}
              >
                <div className="py-8">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={50}
                    height={50}
                  />
                </div>
                <h2 className="text-4xl mt-2">{feature.title}</h2>
                <span className="mt-2">{feature.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-1/2 -translate-y-1/2 left-[10vw] w-[40vw] h-[20vw] bg-[#51C2FF] blur-3xl opacity-50 rounded-full"></div>
      <div className="absolute top-0 -translate-y-1/2 right-0 w-[50vw] h-[20vw] bg-[#293BFF] blur-3xl opacity-40 rounded-full"></div>
    </div>
  );
};

export default Features;
