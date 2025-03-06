import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const ImageCarouselProgress = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "/auth/carousel/1.svg",
    "/auth/carousel/2.svg",
    "/auth/carousel/3.svg",
  ];
  const duration = 3;
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
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
    <div className="w-full h-screen flex flex-col justify-end items-center bg-gray-900 overflow-hidden">
      <div ref={carouselRef} className="flex w-full h-full">
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <Image
              src={src}
              alt="Carousel Image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
      </div>
      <div className="absolute w-1/4 h-[2.5px] flex mb-8 overflow-hidden rounded-full gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-full transition-all duration-500 rounded-full ${
              index === activeIndex
                ? "flex-[3] bg-gray-300"
                : "flex-1 bg-gray-300"
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

export default ImageCarouselProgress;
