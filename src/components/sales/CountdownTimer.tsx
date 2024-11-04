import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const INITIAL_TIME = 2 * 60 + 33; // 2 minutes and 33 seconds in seconds

type Units = "Minute" | "Second";

const CountdownTimer = () => {
  return (
    <div className="sticky left-0 right-0 top-0 z-50 w-full bg-secondary px-2 py-1.5 text-white shadow-md">
      <div className="mx-auto flex w-fit max-w-5xl flex-wrap items-center justify-center gap-x-4 text-xs md:text-sm">
        <CountdownItem unit="Minute" text="minutes" />
        <CountdownItem unit="Second" text="seconds" />
        <span className="text-white/80">remaining at this price!</span>
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }: { unit: Units; text: string }) => {
  const { ref, time } = useTimer(unit);
  return (
    <div className="flex w-fit items-center justify-center gap-1.5">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block font-mono text-sm font-semibold md:text-base"
        >
          {time.toString().padStart(2, '0')}
        </span>
      </div>
      <span>{text}</span>
    </div>
  );
};

const useTimer = (unit: Units) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef<number | null>(null);
  const [time, setTime] = useState(unit === "Minute" ? 2 : 33);

  useEffect(() => {
    // Initialize the countdown
    if (timeRef.current === null) {
      timeRef.current = INITIAL_TIME;
    }

    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    if (timeRef.current === null || timeRef.current <= 0) return;

    timeRef.current -= 1;
    
    let newTime = 0;
    if (unit === "Minute") {
      newTime = Math.floor(timeRef.current / 60);
    } else {
      newTime = timeRef.current % 60;
    }

    if (newTime !== time) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};

// Ensure the component is exported correctly
export default CountdownTimer;