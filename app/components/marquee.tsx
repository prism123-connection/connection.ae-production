"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { type FC, useRef } from "react";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  isReversed?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Marquee: FC<Props> = ({ isReversed = false, className, children }) => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>(null);

  useGSAP(
    () => {
      const setupInfiniteMarqueeTimeline = () => {
        gsap.set(movingContainer.current, {
          xPercent: isReversed ? -50 : 0,
        });
        timeline.current = gsap
          .timeline({
            defaults: { ease: "none", repeat: -1 },
          })
          .to(movingContainer.current, {
            xPercent: isReversed ? 0 : -50,
            duration: 35,
          })
          .set(movingContainer.current, { xPercent: 0 });
      };

      setupInfiniteMarqueeTimeline();
    },
    { dependencies: [isReversed] }
  );

  let timelineTimeScaleTween = useRef<GSAPTween>(undefined);

  const onPointerEnter = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.4,
    });
  };

  const onPointerLeave = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 1,
      duration: 0.2,
    });
  };

  return (
    <div
      className={twMerge("max-w-full select-none overflow-hidden", className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
    >
      <div ref={movingContainer} className="flex w-fit">
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
