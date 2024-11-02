import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";
import { FiArrowDown } from "react-icons/fi";

export const VelocityHero = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const skewXRaw = useTransform(scrollVelocity, [-1, 1], ["45deg", "-45deg"]);
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <section ref={targetRef} className="h-[500vh] bg-primary text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden">
        <Nav />
        <CenterCopy />
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap text-7xl font-black uppercase leading-[0.85] text-secondary/20 md:text-9xl md:leading-[0.85]"
        >
          Build your startup faster with expert Mavens. Access world-class talent
          for a fraction of the cost. Launch, grow, and succeed with proven
          expertise by your side.
        </motion.p>
        <ScrollArrow />
      </div>
    </section>
  );
};

const Nav = () => {
  return (
    <div className="relative mb-1 flex w-full justify-between p-6">
      <p className="hidden text-xs text-white/40 md:block">
        Maven
        <br />
        Marketplace
      </p>
      <Logo />
      <Links />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="absolute right-4 top-1/2 h-fit -translate-y-1/2 translate-x-0 text-2xl font-bold text-white md:right-1/2 md:translate-x-1/2">
      Maven<span className="text-secondary">.</span>
    </div>
  );
};

const Links = () => {
  return (
    <nav className="flex gap-6 text-sm">
      <a href="#how-it-works" className="hover:text-secondary">How it Works</a>
      <a href="#pricing" className="hover:text-secondary">Pricing</a>
      <a href="#contact" className="hover:text-secondary">Contact</a>
    </nav>
  );
};

const CenterCopy = () => {
  return (
    <div className="flex items-center justify-center px-4 text-center">
      <div className="max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold sm:text-6xl md:text-7xl">
          Your Startup's Secret Weapon:{" "}
          <span className="gradient-text font-black">Expert Mavens</span>
        </h1>
        <p className="mb-8 text-lg text-white/60 md:text-xl">
          Access world-class talent to build and market your startup for just
          $500/month. No contracts, just results.
        </p>
        <a
          href="#pricing"
          className="inline-block rounded-full bg-secondary px-8 py-4 font-semibold text-white transition-all hover:bg-secondary/90"
        >
          Get Started Today
        </a>
      </div>
    </div>
  );
};

const ScrollArrow = () => {
  return (
    <>
      <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-xs text-white/40 lg:block">
        <span style={{ writingMode: "vertical-lr" }}>SCROLL</span>
        <FiArrowDown className="mx-auto mt-2" />
      </div>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs text-white/40 lg:block">
        <span style={{ writingMode: "vertical-lr" }}>SCROLL</span>
        <FiArrowDown className="mx-auto mt-2" />
      </div>
    </>
  );
};