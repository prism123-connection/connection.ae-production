import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
} from "framer-motion";
import gsap from "gsap";

interface ProgressArcProps {
  percentage: number;
}

const ProgressArc: React.FC<ProgressArcProps> = ({ percentage }) => {
  const arcRef = useRef<SVGPathElement | null>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const percentageText = useMotionTemplate`${rounded}%`; 

  useEffect(() => {
    // animate(count, percentage, { duration: 1.5, ease: "easeOut" });
      const controls = animate(count, percentage, { duration: 1.5, ease: "easeOut" });

    const adjustedPercentage = percentage === 0 ? 1 : percentage; 

    if (arcRef.current) {
      gsap.to(arcRef.current, {
        strokeDashoffset: 288 - (adjustedPercentage / 100) * 288, 
        duration: 1.5,
        ease: "power2.out",
      });
    }
     return controls.stop;
  }, [percentage, count]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="220" height="130" viewBox="-10 -12 160 110">
        <path
          d="M5,95 A75,75 0 1,1 145,95"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          ref={arcRef}
          d="M5,95 A75,75 0 1,1 145,95"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeDasharray="288"
          strokeDashoffset="288"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </svg>
      <motion.span className="md:text-4xl text-black pt-6 pl-4 font-novaRegular absolute">
        {percentage}{"%"}
      </motion.span>
    </div>
  );
};

export default ProgressArc;
