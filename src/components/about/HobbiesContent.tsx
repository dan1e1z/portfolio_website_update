import { useMemo, useRef } from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const TOTAL_TIMELINE_DURATION = 2;
const IMAGE_DURATION = 0.5;
const STAGGER_INTERVAL = 0.07;
const ANIMATION_END_AT = 0.4;

const COLORS = [
  "bg-[#9C8779]", "bg-[#3E2B1A]", "bg-[#311908]", "bg-[#7D614C]",
  "bg-[#847E7C]", "bg-[#5B402B]", "bg-[#B8B5B7]", "bg-[#A8A19E]",
  "bg-[#4A4948]", "bg-[#462421]", "bg-[#4F2F2B]", "bg-[#8E5A59]",
  "bg-[#6B4943]", "bg-[#6B423A]", "bg-[#643B36]", "bg-[#453F33]",
  "bg-[#32322D]",
];

type GridPosition = { row: number; col: number };

const SQUARE_POSITIONS: Record<number, GridPosition> = {
  1: { row: 1, col: 1 }, 2: { row: 1, col: 3 }, 3: { row: 1, col: 4 },
  4: { row: 1, col: 5 }, 5: { row: 1, col: 7 }, 6: { row: 2, col: 1 },
  7: { row: 2, col: 3 }, 8: { row: 2, col: 4 }, 9: { row: 2, col: 6 },
  10: { row: 2, col: 7 }, 11: { row: 2, col: 8 }, 12: { row: 3, col: 1 },
  13: { row: 3, col: 2 }, 14: { row: 3, col: 4 }, 15: { row: 3, col: 5 },
  16: { row: 3, col: 7 }, 17: { row: 3, col: 8 },
};

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const HobbiesContent = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const randomStartHeights = useMemo(
    () => COLORS.map(() => (typeof window === "undefined" ? 1000 : randomBetween(window.innerHeight, window.innerHeight * 1.8))),
    [],
  );
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const scrubbedProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  return (
    <section ref={targetRef} id="about4" className="relative h-[350vh] w-full border-b border-b-[#EEE9CC] bg-[#1d1915]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative grid h-full w-full place-items-center">
          <div className="grid h-full w-full grid-cols-8 grid-rows-3 gap-3 p-6 md:gap-4 md:p-12">
            {COLORS.map((color, index) => (
              <AnimatedSquare key={index + 1} color={color} position={SQUARE_POSITIONS[index + 1]} index={index} progress={scrubbedProgress} fromY={randomStartHeights[index]} />
            ))}
          </div>
          <AnimatedTitle progress={scrubbedProgress} />
        </div>
      </div>
    </section>
  );
};

interface AnimatedSquareProps {
  color: string;
  position?: GridPosition;
  index: number;
  progress: MotionValue<number>;
  fromY: number;
}

function AnimatedSquare({ color, position, index, progress, fromY }: AnimatedSquareProps) {
  const rawStart = (index * STAGGER_INTERVAL) / TOTAL_TIMELINE_DURATION;
  const rawEnd = Math.min((index * STAGGER_INTERVAL + IMAGE_DURATION) / TOTAL_TIMELINE_DURATION, 1);
  const startProgress = rawStart * ANIMATION_END_AT;
  const endProgress = rawEnd * ANIMATION_END_AT;
  const y = useTransform(progress, [startProgress, endProgress], [fromY, 0], { clamp: true });

  return <motion.div className={`aspect-square h-full w-full rounded-sm ${color}`} style={{ y, gridRowStart: position?.row, gridColumnStart: position?.col }} />;
}

function AnimatedTitle({ progress }: { progress: MotionValue<number> }) {
  const rawStart = 0.8 / TOTAL_TIMELINE_DURATION;
  const rawEnd = (0.8 + 1.2) / TOTAL_TIMELINE_DURATION;
  const startProgress = rawStart * ANIMATION_END_AT;
  const endProgress = rawEnd * ANIMATION_END_AT;
  const titleY = useTransform(progress, [startProgress, startProgress + 0.15 * ANIMATION_END_AT, startProgress + 0.35 * ANIMATION_END_AT, endProgress], ["180%", "120%", "30%", "0%"], { clamp: true });
  const titleOpacity = useTransform(progress, [startProgress, startProgress + 0.2 * ANIMATION_END_AT, endProgress], [0, 0.7, 1], { clamp: true });

  return (
    <motion.div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center" style={{ y: titleY, opacity: titleOpacity }}>
      <h2 className="mb-0 mt-2 text-[clamp(2.5rem,7vw,5rem)] font-medium leading-none tracking-tight text-[#eee9cc]">Hobbies</h2>
      <p className="mt-2 text-xs uppercase tracking-widest text-[#eee9cc]/70">Captured in happy moments</p>
    </motion.div>
  );
}

export default HobbiesContent;
