import React from "react";
import { Block } from "./Block";
import {
  FiArrowUpRight,
  FiClipboard,
  FiCoffee,
  FiDollarSign,
  FiFeather,
  FiInbox,
  FiMove,
  FiRepeat,
  FiSmile,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";

export const HighlighBlocks = () => {
  return (
    <>
      <HighlightBlock
        Icon={FiDollarSign}
        iconClassName="text-green-500"
        title="Optimize Resources"
        subtitle="Reduce operational costs while maintaining high-quality output with our vetted talent pool."
      />
      <HighlightBlock
        Icon={FiArrowUpRight}
        iconClassName="text-pink-500"
        title="Scale Efficiently"
        subtitle="Access top-tier talent on-demand to accelerate your growth without the overhead."
      />
      <HighlightBlock
        Icon={FiSmile}
        iconClassName="text-blue-500"
        title="Boost Innovation"
        subtitle="Leverage fresh perspectives and cutting-edge skills to drive your startup forward."
      />
      <HighlightBlock
        Icon={FiCoffee}
        iconClassName="text-orange-500"
        title="Fast Implementation"
        subtitle="Get your projects off the ground quickly with ready-to-deploy talent."
      />
      <HighlightBlock
        Icon={FiFeather}
        iconClassName="text-zinc-500"
        title="Tech Excellence"
        subtitle="Access developers skilled in the latest technologies and frameworks."
      />
      <HighlightBlock
        Icon={FiInbox}
        iconClassName="text-purple-500"
        title="Market Validation"
        subtitle="Perfect for accelerators and VCs looking to validate new market opportunities."
      />
      <HighlightBlock
        Icon={FiMove}
        iconClassName="text-fuchsia-500"
        title="Stay Agile"
        subtitle="Adapt quickly to market changes with flexible talent solutions."
      />
      <HighlightBlock
        Icon={FiClipboard}
        iconClassName="text-red-500"
        title="Hit Milestones"
        subtitle="Meet your development and growth targets with reliable tech talent."
      />
      <HighlightBlock
        Icon={FiRepeat}
        iconClassName="text-yellow-500"
        title="Scale Success"
        subtitle="Replicate successful strategies across your startup portfolio."
      />
    </>
  );
};

type Props = {
  Icon: IconType;
  iconClassName: string;
  title: string;
  subtitle: string;
};

const HighlightBlock = ({ iconClassName, Icon, title, subtitle }: Props) => (
  <Block className="col-span-3 space-y-1.5 md:col-span-1">
    <Icon className={twMerge("text-3xl text-indigo-600", iconClassName)} />
    <CardTitle>{title}</CardTitle>
    <CardSubtitle>{subtitle}</CardSubtitle>
  </Block>
);
