import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

const Testimonial = () => {
  return (
    <div className="bg-[#E2ECF2] min-h-screen flex justify-center items-center">
      <div className="w-[90%] flex justify-around items-center">
        <div className="flex flex-col flex-[1] text-black">
          <h1 className="text-4xl font-semibold leading-relaxed">
            Are you ready to start your business journey with connection?
          </h1>
          <h3 className="text-sm leading-relaxed my-4">
            Discover new customers worldwide and earn rewards when you refer a
            new
            <br />
            user. Book a free demo today to see how it works!
          </h3>
          <Link href={"/auth/register"}>
            <button className="login mt-4 px-[60px] py-[10px] bg-[#001625] flex items-center gap-1 text-white w-max text-sm rounded-[6px] transition shadow-[6px_6px_10px_rgba(0,0,0,0.2)]">
              Get started <HiArrowLongRight size={20}/>
            </button>
          </Link>
        </div>
        <div className="flex-[1] flex justify-center items-center relative">
          <Image
            src={"/testimonial.svg"}
            alt={"testimonial_image"}
            height={100}
            width={100}
            className="w-[80%] bg-center"
          />
          <div className="absolute z-10 -bottom-5 left-10 w-20 h-20 bg-white/20 backdrop-blur-md"></div>
          <div className="absolute -top-4 right-10 w-20 h-20 bg-white/30 backdrop-blur-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
