"use client";

import React from "react";
import WavesBackground from "./_anim_components/wave_background";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Testimonial from "@/app/sections/testimonial";
import Footer from "@/app/sections/footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col bg-white z-2 absolute min-h-screen w-full">
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <WavesBackground />
        <div className="absolute flex flex-col w-full pt-24 mt-12 items-center justify-center gap-6">
          <h1 className="text-white text-3xl font-novaSB text-center drop-shadow-lg">
            Connection Dubai Network is more than just a business
            <br />
            platform—it’s a movement.
          </h1>
          <Link href={"/auth/register"}>
            <button className="bg-black text-white py-3 text-sm px-12 rounded-lg hover:bg-gray-900 transition">
              Join now
            </button>
          </Link>
          <div className="w-1/2 bg-white bg-opacity-50 backdrop-blur-lg p-6 rounded-2xl flex items-center justify-center">
            <Image
              src="/about-us/preview.png"
              alt="Preview"
              width={5000}
              height={5000}
              className="w-auto h-auto max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
      <div className="relative min-h-screen w-full flex flex-col justify-center items-center">
        <Image
          src="/about-us/map.svg"
          alt="Background Map"
          layout="fill"
          objectFit="contain"
          className="z-0 p-8"
        />
        <div className="relative z-10 flex w-1/2 gap-16 items-center">
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-sm border-gray-300 border w-fit">
            <Image
              src="/about-us/saleem.svg"
              alt="Saleem"
              width={500}
              height={500}
              className="object-cover"
            />
            <p className="mt-2 text-sm font-novaSB text-center text-gray-900">
              Mr. Saleem Al Mansoori
            </p>
            <p className="text-xs font-novaLight text-center text-gray-600">
              Founder- Connection, Dubai
            </p>
          </div>
          <div className="flex-col text-lg">
            <div className="bg-[#F6F6F6] w-max rounded-lg p-1 px-4 mb-5">
              <span className="text-[#001625] opacity-50 text-sm">
                Meet our founder
              </span>
            </div>
            <div className="text-left font-novaLight text-[#001625]">
              Founded by Mr. Saleem Al Mansoori, a business leader with 21 years
              of expertise, we are on a mission to{" "}
              <span className="font-novaSB">
                connect people, create opportunities, and redefine global trade.
              </span>
            </div>
            <br />
            <span className="font-novaLight text-[#001625]">
              “Success is about choosing win-win, not win-loose focus on growth,
              not just survival”
            </span>
            <br />
            <br />
            <span className="font-novaSB text-[#001625]">
              -Mr. Saleem Al Mansoori
            </span>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-hidden w-full h-10 flex items-center justify-center">
        <div className="w-full border-t-2 border-dashed border-gray-200"></div>
        <motion.span
          className="absolute top-[calc(50%-2px)]"
          animate={{ x: ["-50vw", "50vw"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          <Image
            src="/about-us/arrow-right.svg"
            alt="Blue Light"
            width={10}
            height={2}
            className="w-auto"
          />
        </motion.span>
      </div>
      <div className="w-full py-16 flex text-xl font-novaLight text-[#001625] justify-center items-center">
        <div className="flex w-1/2">
          <h3 className="whitespace-nowrap flex-[1]">Our Vision</h3>
          <span className="flex-[2]">
            To empower businesses and individuals with a safe, reliable, and
            profitable global network.
          </span>
        </div>
      </div>
      <div className="relative overflow-x-hidden w-full h-10 flex items-center justify-center">
        <div className="w-full border-t-2 border-dashed border-gray-200"></div>
        <motion.span
          className="absolute top-[calc(50%-2px)]"
          animate={{ x: ["50vw", "-50vw"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          <Image
            src="/about-us/arrow-left.svg"
            alt="Blue Light"
            width={10}
            height={2}
            className="w-auto"
          />
        </motion.span>
      </div>
      <div className="w-full py-16 flex text-xl font-novaLight text-[#001625] justify-center items-center">
        <div className="flex w-1/2">
          <h3 className="whitespace-nowrap flex-[1]">Our Mission</h3>
          <span className="flex-[2]">
            To eliminate barriers and make business borderless, accessible, and
            trustworthy for everyone.
          </span>
        </div>
      </div>
      <div className="relative overflow-x-hidden w-full h-10 flex items-center justify-center">
        <div className="w-full border-t-2 border-dashed border-gray-200"></div>
        <motion.span
          className="absolute top-[calc(50%-2px)]"
          animate={{ x: ["-50vw", "50vw"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          <Image
            src="/about-us/arrow-right.svg"
            alt="Blue Light"
            width={10}
            height={2}
            className="w-auto"
          />
        </motion.span>
      </div>
      <Testimonial />
      <Footer />
    </div>
  );
};

export default AboutUs;
