"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const testimonials = [
    {
      image: "/testimonials/testimonial-user-4.png",
      quote: "The trust and security in this platform made it easier for me to <br/> find reliable business partners",
      name: "Lisa M",
      country: "UK",
    },
    {
      image: "/testimonials/testimonial-user-5.png",
      quote: "Earning passive income through referrals has been an added <br/> advantage, allowing me to generate consistent revenue effortlessly <br/> while focusing on growing my business!",
      name: "Omar",
      country: "Egypt",
    },
    {
      image: "/testimonials/testimonial-user-6.png",
      quote: "This platform eliminated my fears of scams and unreliable partners in <br/> international trade",
      name: "Chen. W",
      country: "China",
    },
  ];
  
const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const duration = 0;
  const carouselRef = useRef(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  //   }, duration * 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    gsap.to(carouselRef.current, {
      x: `-${activeIndex * 100}%`,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      ".progress-bar",
      { width: "0%" },
      { width: "100%", duration: duration, ease: "linear" }
    );
  }, [activeIndex]);

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden ">
      {/* Carousel Wrapper */}
      <div className="w-full flex items-center justify-center  gap-5">
        <HiArrowLongLeft className="cursor-pointer" size={30} onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))} />

        {/* Slide Container */}
        <div className="relative w-full h-96 overflow-hidden">
          <div ref={carouselRef} className="flex w-full h-full transition-transform duration-500">
            {testimonials.map((testimonial, index) => (
               <div className='min-w-full flex flex-col items-center justify-center gap-5 mt-5'>
                 <span         dangerouslySetInnerHTML={{ __html: testimonial.quote }} className='font-semibold text-3xl text-[#101828] text-center'></span>
                 <Image src={testimonial.image} width={50} height={50} alt='user' className="mt-4"/>
                 <span className='text-[#101828] text-lg'>{testimonial.name}</span>
                 <span className='text-[#101828] text-lg opacity-50 -mt-5'>{testimonial.country}</span>
                 </div>
            ))}
          </div>
        </div>

        <HiArrowLongRight  className="cursor-pointer" size={30} onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)} />
      </div>

      {/* Progress Bar */}
      <div className="w-1/4 h-[2.5px] flex rounded-full gap-2 mt-10">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`h-full transition-all duration-500 rounded-full ${index === activeIndex ? "flex-[3] bg-gray-300" : "flex-1 bg-gray-300"}`}
          >
            {index === activeIndex && <div className="progress-bar h-full bg-[#1679C2] rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
