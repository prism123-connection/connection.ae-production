"use client"
import React from "react";
import Marquee from "../components/marquee";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SERVICE_ITEMS = [
  { image: "/services/estate.svg", text: "Real Estate" },
  { image: "/services/business.svg", text: "Commercial Business" },
  { image: "/services/broker.svg", text: "Brokerage" },
  { image: "/services/setup.svg", text: "Business Setup" },
  { image: "/services/metal.svg", text: "Precious Metals" },
  { image: "/services/gas.svg", text: "Oil & Gas" },
];

const Services = () => {
  const router = useRouter()
  return (
    <div id="services" className="flex flex-col w-screen">
      <div className="bg-white py-6 flex flex-col items-center pt-16">
        <Image src={"/divider.svg"} alt={"divider"} width={100} height={100} />
        <div className="text-center text-black text-2xl my-4">
          Our Services & Offerings
        </div>
        <div className="my-12">
          <Marquee>
            {SERVICE_ITEMS.map((item, index) => (
              <div
                key={index}
                className="flex flex-col self-center items-center w-max mx-16"
              >
                <Image
                  src={item.image}
                  alt={item.text}
                  width={50}
                  height={50}
                />
                <p className="text-xs text-gray-700 mt-2">{item.text}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <div className="bg-[#F1F9FF] py-6 flex flex-col items-center pt-16">
        <Image src={"/divider.svg"} alt={"divider"} width={100} height={100} />
        <div className="text-center text-black text-4xl my-4">
          Build <span className="font-bold">world class</span> business
          connections from any part of the world.
        </div>
        <div className="text-center text-[#001625] opacity-50 text-black text-sm mb-12">
          From your first sale to your millionth customer, we make global
          commerce feel local.
        </div>
        <div className="h-[130vh] w-[90%] p-4 flex justify-around gap-4">
          <div className="flex flex-col flex-[1] gap-4">
            <div className="bg-[#021135] flex-1 flex flex-col justify-center items-center rounded-[28px]">
              <Image
                src={"/service_tabs/4_icon.svg"}
                alt="SafeNSecure"
                className="h-1/2"
                height={300}
                width={150}
              />
              <h3 className="text-3xl text-white font-semibold">
                Safe & Secure Platform
              </h3>
              <span className="opacity-50 text-white text-sm text-center w-3/4 mt-2">
                We are compliant with major security protocols, all transactions
                are encrypted
              </span>
              <button
                onClick={()=>router.push('/faq?cid=4')}
                className="login mt-4 px-[40px] py-[10px] text-sm rounded-[6px] transition cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  color: "white",
                }}
              >
                Know more
              </button>
            </div>
            <div
              className="bg-[#021135] flex-1 flex flex-col rounded-[28px] bg-no-repeat p-8 bg-bottom bg-fit"
              style={{ backgroundImage: "url('/service_tabs/1.svg')" }}
            >
              <h3 className="text-3xl font-semibold text-white">
                Get your Connection Card
              </h3>
              <span className="opacity-50 text-white text-sm w-3/4 mt-2">
                We provide unique member cards to all our registered members
              </span>
              <button
              onClick={()=>router.push('/faq?cid=0')}
                className="login mt-4 w-max px-[40px] py-[10px] text-sm rounded-[6px] transition cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  color: "white",
                }}
              >
                Know more
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-[2] gap-4">
            <div
              className="flex-[2.5] flex flex-col justify-end items-start p-8 rounded-[28px] bg-cover bg-center"
              style={{ backgroundImage: "url('/service_tabs/2.svg')" }}
            >
              <h3 className="text-5xl text-white leading-snug">
                Do business from any part of
                <br />
                the world
              </h3>
              <button
              onClick={()=>router.push('/faq?cid=3')}
              className="login mt-4 mb-6 px-[40px] bg-white py-[10px] text-md rounded-[6px] text-black hover:bg-gray-200 transition cursor-pointer">
                Know more
              </button>
            </div>

            <div
              className="flex-[1] flex flex-col px-8 bg-[#021135] rounded-[28px] bg-no-repeat bg-right bg-fit"
              style={{ backgroundImage: "url('/service_tabs/3.svg')" }}
            >
              <h3 className="text-3xl mt-6 font-semibold text-white">
                Reach global markets from
                <br />
                wherever you are.
              </h3>
              <span className="opacity-50 text-white text-sm w-3/4 mt-2">
                Build your borderless business with powerful tools for
                <br />
                international shipping & multi-currency payments.
              </span>
              <button
              onClick={()=>router.push('/faq?cid=1')}
                className="login mt-4 w-max px-[40px] py-[10px] text-sm rounded-[6px] transition cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  color: "white",
                }}
              >
                Know more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[8px] bg-gradient-to-r from-[#51C2FF] via-[#A9EE86] to-[#FFA442]"></div>
    </div>
  );
};

export default Services;
