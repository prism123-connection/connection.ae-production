import React from "react";
import { PricingFeature } from "./PricingFeature";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  variant?: "default" | "pro";
  title: string;
  subtitle: string;
  description: string;
  price: string;
  features: string[];
  logo: React.ReactNode;
  popular?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  setLoading
}) => {
  const router = useRouter()
  const isPro = variant === "pro";
  const cardClasses = `
    flex flex-col  relative py-5 px-5 rounded-3xl 
    ${isPro ? "bg-[#06B079] text-white min-w-[350px]!" : "bg-white max-w-[340px]!"}
  `;

  const buttonClasses = `
    w-full text-lg cursor-pointer transition-all duration-[0.3s] ease-[ease] 
     py-4 rounded-xl border-[none] 
    ${
      isPro
        ? "text-[#06B079] bg-white shadow-[0px_22px_24px_0px_rgba(5,136,94,0.60)]"
        : "text-white bg-[#0C87D6]"
    }
  `;

  const handleButton = async (role: "FREE" | "PAID") => {
    setLoading(true)
    try {
      if(role === 'FREE'){

        const response = await fetch(`/api/user/user_role`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ role }),
        });
        if (response.ok) {
          toast.success( "Successfully Created");
          router.push('/dashboard')
          window.location.reload()
          return; 
        }else {
           toast.error( "Failed to create user!");
        }

      }
      if (role === 'PAID') {
        router.push('/auth/payment')
        setLoading(false)
      }

      // Add your API call or backend function here
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };
  

  return (
    <div className={cardClasses}>
      {popular && (
        <div className="absolute text-white text-sm font-normal bg-[rgba(255,255,255,0.20)] px-4 py-4 rounded-lg right-8 top-8 max-sm:px-4 max-sm:py-2 max-sm:right-4 max-sm:top-4">
          Popular
        </div>
      )}
      <div className="flex flex-col gap-[18px] mb-5">
        {/* card header  */}
        <div className="w-full  flex gap-4">
        
        <div className="bg-[#ECEBFF] p-2 rounded-2xl">
        <Image src={"/logo.svg"} alt={"logo"} width={50} height={50} />
        </div>

          <div className="pt-1  ">
            <div  className={`text-base font-semibold leading-[30px] ${isPro ? "text-[rgba(255,255,255,0.86)]" : "text-[#6F6C90]"} max-w-[307px] max-sm:text-sm max-sm:leading-6`}>
              {subtitle}
            </div>
            <div
                className={`text-xl font-bold  ${isPro ? "text-white" : "text-[#170F49]"} `}
            >
              {title}
            </div>
          </div>
        </div>
        <div
          className={`text-base leading-[30px] ${isPro ? "text-[rgba(255,255,255,0.86)]" : "text-[#6F6C90]"} max-w-[350px] `}
        >
          {description}
        </div>
      </div>
      <div
        className={`text-[54px] font-bold leading-[66px] ${isPro ? "text-white" : "text-[#170F49]"} mb-5`}
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
      <button onClick={() => handleButton(!isPro ? "FREE" : "PAID")} className={buttonClasses}>Get started</button>
    </div>
  );
};
