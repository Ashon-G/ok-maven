import React from "react";
import { Footer } from "@/components/layout/Footer";
import { HelpCenterContent } from "@/components/help/HelpCenterContent";
import { HelpCenterHeader } from "@/components/help/HelpCenterHeader";

const HelpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HelpCenterHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <HelpCenterContent />
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;