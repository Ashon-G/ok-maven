import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiSupabase,
  SiStripe,
  SiGithub,
  SiVercel,
} from "react-icons/si";

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 px-4"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon }: { Icon: IconType }) => {
  return (
    <div className="w-20 h-20 md:w-24 md:h-24 flex justify-center items-center hover:bg-slate-200 text-black transition-colors">
      <Icon className="text-3xl md:text-4xl" />
    </div>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={SiTypescript} />
    <LogoItem Icon={SiReact} />
    <LogoItem Icon={SiTailwindcss} />
    <LogoItem Icon={SiSupabase} />
    <LogoItem Icon={SiStripe} />
    <LogoItem Icon={SiGithub} />
    <LogoItem Icon={SiVercel} />
  </>
);

const DoubleScrollingLogos = () => {
  return (
    <section className="bg-white py-8">
      <div className="flex overflow-hidden">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
    </section>
  );
};

export default DoubleScrollingLogos;