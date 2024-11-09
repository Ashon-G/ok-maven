import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  return (
    <h2 className={cn("mb-4 text-center text-3xl font-bold md:text-4xl", className)}>
      {children}
    </h2>
  );
};