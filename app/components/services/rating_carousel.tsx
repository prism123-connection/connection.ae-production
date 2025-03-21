"use client"
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import H1 from "../ui/H1";

const ratingData = [
  {
    name: "Ahmed K, UAE",
    title: "A total game changer!",
    review: "With Connection Dubai, I expanded my trading business <br/> internationally without needing a license. It's a  game- <br/>changer!",
  },
  {
    name: "John D, USA",
    title: "Networking That Transforms Into Real Business Deals!",
    review: "Finally, a platform where networking actually leads to <br/> business deals!",
  },
  {
    name: "Omar, Egypt",
    title: "Effortless Earnings Through Referrals!",
    review:
      "Earning passive income through referrals has been an added advantage,<br/> allowing me to generate consistent revenue effortlessly while focusing on <br/> growing my business!",
    rating: 5,
  },
];

const RatingCarousels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const duration = 5;
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % ratingData.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".progress-bar",
      { width: "0%" },
      { width: "100%", duration: duration, ease: "linear" }
    );

    gsap.to(carouselRef.current, {
      x: `-${activeIndex * 100}%`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [activeIndex]);

  return (
    <div className="relative flex flex-col items-start w-[600px]  overflow-hidden">
      {/* Carousel Wrapper */}
      <div
        ref={carouselRef}
        className="flex items-start  w-[100%] transition-transform duration-500"
        // style={{ width: `${ratingData.length * 100}%` }}
      >
        {ratingData.map((rating, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 flex flex-col justify-center items-start text-center"
            style={{ width: "100%" }}
          >
            <Image
              src={"/services/rating-stars.svg"}
              alt="rating"
              width={100}
              height={50}
              className="mb-5"
            />
            <H1 classes="font-normal text-lg!">{rating.title}</H1>

              <span
                className="text-base mt-5 text-[#001625]/60 text-left"
                dangerouslySetInnerHTML={{ __html: rating.review }}
                ></span>

            <div className="flex gap-5 items-center justify-center mt-5">
              <Image
                src={"/services/rating-person.svg"}
                alt="rating-person-image"
                width={25}
                height={25}
              />
              <H1 classes="font-bold! text-lg!">{rating.name}</H1>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className=" w-3/4 h-[2.5px] flex  rounded-full gap-2 mt-10 ">
        {ratingData.map((_, index) => (
          <div
            key={index}
            className={`h-full transition-all duration-500 rounded-full ${
              index === activeIndex ? "flex-[3] bg-gray-300" : "flex-1 bg-gray-300"
            }`}
          >
            {index === activeIndex && (
              <div className="progress-bar h-full bg-[#1679C2] rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingCarousels;
