import { cn } from "@/lib/utils";
import React from "react";

interface SectionSubheadingProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionSubheading = ({ children, className }: SectionSubheadingProps) => {
  return (
    <p className={cn("mb-8 text-center text-lg text-muted-foreground", className)}>
      {children}
    </p>
  );
};