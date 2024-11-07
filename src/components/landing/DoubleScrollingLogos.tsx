import { motion } from "framer-motion";
import {
  SiNike,
  Si3M,
  SiAbstract,
  SiAdobe,
  SiAirtable,
  SiAmazon,
  SiBox,
  SiBytedance,
  SiChase,
  SiCloudbees,
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";
import { IconType } from "react-icons";

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
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
    <LogoItem Icon={SiNike} />
    <LogoItem Icon={Si3M} />
    <LogoItem Icon={SiAbstract} />
    <LogoItem Icon={SiAdobe} />
    <LogoItem Icon={SiAirtable} />
    <LogoItem Icon={SiAmazon} />
    <LogoItem Icon={SiBox} />
    <LogoItem Icon={SiBytedance} />
    <LogoItem Icon={SiChase} />
    <LogoItem Icon={SiCloudbees} />
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={SiBmw} />
    <LogoItem Icon={SiBurton} />
    <LogoItem Icon={SiBuildkite} />
    <LogoItem Icon={SiCouchbase} />
    <LogoItem Icon={SiDailymotion} />
    <LogoItem Icon={SiDeliveroo} />
    <LogoItem Icon={SiEpicgames} />
    <LogoItem Icon={SiGenius} />
    <LogoItem Icon={SiGodaddy} />
    <LogoItem Icon={SiHeroku} />
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
      <div className="flex overflow-hidden mt-8">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>
    </section>
  );
};

export default DoubleScrollingLogos;