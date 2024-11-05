import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const CTA = () => {
  return (
    <section
      id="contact"
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/90" />
      
      <div className="container relative text-center">
        <h2 className="mb-6 text-4xl font-bold text-white">
          Ready to Build Your <span className="gradient-text">Next Big Thing</span>?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/60">
          Join innovative founders who are building faster and smarter with student Mavens.
          Start your journey today.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/signup/founder"
            className="rounded-full bg-secondary px-8 py-4 font-semibold text-secondary-foreground transition-all hover:bg-secondary/90"
          >
            Start Building
          </Link>
          <Link
            to="/signup/maven"
            className="rounded-full border border-primary-foreground/20 px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
          >
            Join as Student
          </Link>
        </div>
      </div>
    </section>
  );
};