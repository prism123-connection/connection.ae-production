import React from "react";
import { PricingFeature } from "./PricingFeature";

interface PricingCardProps {
  variant?: "default" | "pro";
  title: string;
  subtitle: string;
  description: string;
  price: string;
  features: string[];
  logo: React.ReactNode;
  popular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  variant = "default",
  title,
  subtitle,
  description,
  price,
  features,
  logo,
  popular,
}) => {
  const isPro = variant === "pro";
  const cardClasses = `
    flex flex-col w-[394px] relative pt-10 pb-12 px-10 rounded-3xl 
    max-md:w-full max-md:max-w-[500px] max-sm:p-5 max-sm:rounded-2xl
    ${isPro ? "bg-[#06B079] text-white" : "bg-white"}
  `;

  const buttonClasses = `
    w-full text-lg cursor-pointer transition-all duration-[0.3s] ease-[ease] 
    px-[38px] py-5 rounded-xl border-[none] max-sm:px-6 max-sm:py-4
    ${
      isPro
        ? "text-[#06B079] bg-white shadow-[0px_22px_24px_0px_rgba(5,136,94,0.60)]"
        : "text-white bg-[#0C87D6]"
    }
  `;

  return (
    <div className={cardClasses}>
      {popular && (
        <div className="absolute text-white text-sm font-normal bg-[rgba(255,255,255,0.20)] px-6 py-3 rounded-[10px] right-8 top-8 max-sm:px-4 max-sm:py-2 max-sm:right-4 max-sm:top-4">
          Popular
        </div>
      )}
      <div className="flex flex-col gap-[18px] mb-8">
        <div>{logo}</div>
        <div
          className={`text-lg leading-[30px] ${isPro ? "text-[rgba(255,255,255,0.86)]" : "text-[#6F6C90]"} max-w-[307px] max-sm:text-sm max-sm:leading-6`}
        >
          {description}
        </div>
      </div>
      <div
        className={`text-[54px] font-bold leading-[66px] ${isPro ? "text-white" : "text-[#170F49]"} mb-16 max-sm:text-[42px] max-sm:leading-[52px]`}
      >
        {price}
      </div>
      <div className="mb-8">
        <div
          className={`text-lg ${isPro ? "text-white font-bold" : "text-[#170F49]"} mb-6 max-sm:text-base`}
        >
          What's included
        </div>
        <div className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <PricingFeature key={index} text={feature} variant={variant} />
          ))}
        </div>
      </div>
      <button className={buttonClasses}>Get started</button>
    </div>
  );
};
