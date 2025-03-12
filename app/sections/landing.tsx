import React from "react";
import Marquee from "../components/marquee";
import Image from "next/image";
import { GlobeDemo } from "./globe-demo";

const MARQUEE_ITEMS = [
  {
    image: "/marquee_1/trophy.svg",
    mainText: "Earn rewards",
    subText: "Refer your knowns and earn exciting rewards",
  },
  {
    image: "/marquee_1/verify.svg",
    mainText: "Verified members only",
    subText: "We verify every user that enters our platform",
  },
  {
    image: "/marquee_1/support.svg",
    mainText: "24/7 Dedicated Support",
    subText: "We will help you with all your queries",
  },
  {
    image: "/marquee_1/ship.svg",
    mainText: "Product Listings",
    subText: "Unlimited Products",
  },
];

const Landing = () => {
  return (
    <div id="home" className="w-full h-screen animated-bg overflow-hidden">
      <div className="flex flex-col z-2 h-full w-full justify-center items-center pb-6">
        <div className="h-full w-[85%] flex pt-16 justify-between items-center text-white">
          <div className="w-full h-full flex flex-col justify-center">
          <Image src={"/logo.svg"} alt={"logo"} width={50} height={50} />
            <h1 className="text-5xl pt-4 leading-relaxed">
              Build <span className="font-bold">world class</span> business
              <br />
              connections from any part
              <br />
              of the world.
            </h1>
          </div>
          <div className="h-full w-full">
            <GlobeDemo />
          </div>
        </div>
        <Marquee>
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-max gap-4 mx-6 px-6 py-3 rounded-lg text-white"
            >
              <Image src={item.image} alt="Icon" width={32} height={32} />
              <div>
                <p className="text-sm">{item.mainText}</p>
                <p className="text-xs opacity-50">{item.subText}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      <Image
        src={"/land_circ.svg"}
        alt="Icon"
        className="w-1/2 aspect-square absolute top-2/2 left-0 -translate-y-1/2 rotate-animation"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Landing;
