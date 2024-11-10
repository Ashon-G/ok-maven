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
        title="Budget-Friendly"
        subtitle="Access talented student developers at rates that work for startups, reducing development costs without compromising quality."
      />
      <HighlightBlock
        Icon={FiArrowUpRight}
        iconClassName="text-pink-500"
        title="Fast Growth"
        subtitle="Scale your development team quickly with pre-vetted student talent who bring fresh perspectives and latest tech skills."
      />
      <HighlightBlock
        Icon={FiSmile}
        iconClassName="text-blue-500"
        title="Quality Assured"
        subtitle="Work with thoroughly vetted student developers who demonstrate both technical excellence and strong communication skills."
      />
      <HighlightBlock
        Icon={FiCoffee}
        iconClassName="text-orange-500"
        title="Quick Start"
        subtitle="Get your projects up and running within days, not months, with our streamlined onboarding process for student developers."
      />
      <HighlightBlock
        Icon={FiFeather}
        iconClassName="text-zinc-500"
        title="Flexible Terms"
        subtitle="Choose from part-time to full-time student developers based on your project needs and budget constraints."
      />
      <HighlightBlock
        Icon={FiInbox}
        iconClassName="text-purple-500"
        title="Project Tools"
        subtitle="Access built-in tools for seamless project tracking, milestone management, and collaboration with student developers."
      />
      <HighlightBlock
        Icon={FiMove}
        iconClassName="text-fuchsia-500"
        title="Tech Skills"
        subtitle="Connect with student developers skilled in modern technologies, from web and mobile development to AI/ML projects."
      />
      <HighlightBlock
        Icon={FiClipboard}
        iconClassName="text-red-500"
        title="Full Support"
        subtitle="Get dedicated support to ensure smooth collaboration with student developers and quick resolution of any issues."
      />
      <HighlightBlock
        Icon={FiRepeat}
        iconClassName="text-yellow-500"
        title="Agile Process"
        subtitle="Implement agile methodologies with student developers for rapid iterations and continuous project improvement."
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