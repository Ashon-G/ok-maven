import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const HelpCenterHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-2xl font-bold">
            Maven<span className="text-secondary">.</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-secondary">Home</Link>
            <Link to="/login" className="hover:text-secondary">Login</Link>
            <Link to="/signup" className="hover:text-secondary">Sign Up</Link>
          </nav>
        </div>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search for answers..." 
              className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          </div>
        </div>
      </div>
    </header>
  );
};