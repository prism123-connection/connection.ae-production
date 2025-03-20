"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WavesBackground() {
  const waveRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    waveRefs.current.forEach((wave, index) => {
      if (wave) {
        gsap.to(wave, {
          duration: 5 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          x: "+=80",
          y: "+=60",
          scaleX: 1.2,
          scaleY: 1.15,
          modifiers: {
            x: (x) => `${(parseFloat(x) % 200) - 100}px`,
          },
        });
      }
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[radial-gradient(circle_at_center,#2db9fa_1%,#e0ff91_40%,#2dfabc_80%,#22f5ab_99%)]">
      {/* Waves SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1200"
        preserveAspectRatio="none"
      >
        {[...Array(4)].map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              waveRefs.current[i] = el;
            }}
            fill={`url(#wave${i + 1}Gradient)`}
            d={`M-50,${150 + i * 250} C400,${Math.random() * 300 + i * 250} 900,
              ${Math.random() * 500 + i * 250} 1400,${
              Math.random() * 300 + i * 250
            } C1800,${Math.random() * 200 + i * 250} 2200,
              ${Math.random() * 500 + i * 250} 2500,${
              Math.random() * 250 + i * 250
            } L2500,1200 L-50,1200 Z`}
            opacity={`${0.9 - i * 0.2}`}
            style={{
              mixBlendMode: "screen",
            }}
          />
        ))}
        <defs>
          <linearGradient
            id="wave1Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0055FF" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          <linearGradient
            id="wave2Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0044CC" />
            <stop offset="100%" stopColor="#FFAA00" />
          </linearGradient>
          <linearGradient
            id="wave3Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0033AA" />
            <stop offset="100%" stopColor="#FF8800" />
          </linearGradient>
          <linearGradient
            id="wave4Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#002288" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF7700" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    </div>
  );
}
