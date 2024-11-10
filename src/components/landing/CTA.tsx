import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section
      id="contact"
      className="relative bg-cover bg-center bg-no-repeat py-24 w-full mt-24"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/90" />
      
      <div className="container relative mx-auto text-center px-4">
        <h2 className="mb-6 text-4xl font-bold text-white">
          Ready to Build Your <span className="gradient-text">Next Big Thing</span>?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/60">
          Join innovative founders who are building faster and smarter with student Mavens.
          Start your journey today.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" asChild>
            <Link to="/signup/founder">Start Building</Link>
          </Button>
          <Button variant="outline" asChild className="text-white hover:text-primary hover:bg-white">
            <Link to="/signup/maven">Join as Student</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};