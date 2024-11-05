import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { FiArrowDown, FiLogIn, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export const VelocityHero = () => {
  const targetRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <CenterCopy />
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap text-7xl font-black uppercase leading-[0.85] text-secondary/20 md:text-9xl md:leading-[0.85]"
        >
          Connect with student talent. Build innovative products. Launch faster than ever before.
        </motion.p>
        <ScrollArrow />
      </div>
    </section>
  );
};

const Nav = ({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (value: boolean) => void }) => {
  return (
    <div className="relative mb-1 flex w-full justify-between p-6">
      <Logo />
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden z-50 text-white"
      >
        {isMenuOpen ? (
          <FiX className="h-6 w-6" />
        ) : (
          <FiMenu className="h-6 w-6" />
        )}
      </button>
      <div className={`
        fixed inset-0 bg-primary transform transition-transform duration-300 ease-in-out md:relative md:inset-auto md:bg-transparent md:transform-none
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <Links setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="text-2xl font-bold text-white z-50">
      Maven<span className="text-secondary">.</span>
    </div>
  );
};

const Links = ({ setIsMenuOpen }: { setIsMenuOpen: (value: boolean) => void }) => {
  const handleClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-center h-full md:h-auto gap-8 md:gap-6 text-lg md:text-sm">
      <a href="#how-it-works" onClick={handleClick} className="hover:text-secondary">How it Works</a>
      <a href="#pricing" onClick={handleClick} className="hover:text-secondary">Pricing</a>
      <a href="#contact" onClick={handleClick} className="hover:text-secondary">Contact</a>
      <div className="flex flex-col md:flex-row items-center gap-4 md:ml-4">
        <Link
          to="/login"
          onClick={handleClick}
          className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/40 hover:text-secondary"
        >
          <FiLogIn className="h-4 w-4" />
          Login
        </Link>
        <Link
          to="/signup"
          onClick={handleClick}
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-secondary/90"
        >
          <FiUserPlus className="h-4 w-4" />
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

const CenterCopy = () => {
  return (
    <div className="flex items-center justify-center px-4 text-center">
      <div className="max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold sm:text-6xl md:text-7xl">
          Connect with Student Talent to{" "}
          <span className="gradient-text font-black">Build Your Next Big Thing</span>
        </h1>
        <p className="mb-8 text-lg text-white/60 md:text-xl">
          Access ambitious student developers and marketers ready to help build and launch your product. 
          Get high-quality work at student-friendly rates.
        </p>
        <a
          href="#pricing"
          className="inline-block rounded-full bg-secondary px-8 py-4 font-semibold text-white transition-all hover:bg-secondary/90"
        >
          Start Building Today
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