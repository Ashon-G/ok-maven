import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface StatProps {
  num: number;
  suffix: string;
  decimals?: number;
  subheading: string;
}

const Stat = ({ num, suffix, decimals = 0, subheading }: StatProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;
        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-8 sm:py-0">
      <p className="mb-2 text-center text-7xl font-semibold text-white sm:text-6xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-48 text-center text-white/60">{subheading}</p>
    </div>
  );
};

export const CountUpStats = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-24">
      <h2 className="mb-8 text-center text-base text-white/80 sm:text-lg md:mb-16">
        TRUSTED BY FOUNDERS WORLDWIDE WITH
        <span className="gradient-text"> PROVEN RESULTS</span>
      </h2>

      <div className="flex flex-col items-center justify-center sm:flex-row">
        <Stat
          num={95}
          suffix="%"
          subheading="Satisfaction rate among startup founders"
        />
        <div className="h-[1px] w-12 bg-white/20 sm:h-12 sm:w-[1px]" />
        <Stat
          num={12.5}
          decimals={1}
          suffix="M+"
          subheading="Revenue generated for our clients"
        />
        <div className="h-[1px] w-12 bg-white/20 sm:h-12 sm:w-[1px]" />
        <Stat
          num={500}
          suffix="+"
          subheading="Successful projects delivered"
        />
      </div>
    </div>
  );
};