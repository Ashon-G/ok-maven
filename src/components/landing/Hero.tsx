import { Link } from "react-router-dom";

export const VelocityHero = () => {
  return (
    <section className="min-h-screen bg-primary text-white flex items-center justify-center">
      <div className="container px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold sm:text-6xl md:text-7xl">
          Your Startup's Secret Weapon:{" "}
          <span className="gradient-text font-black">Expert Mavens</span>
        </h1>
        <p className="mb-8 text-lg text-white/60 md:text-xl max-w-2xl mx-auto">
          Access world-class talent to build and market your startup for just
          $500/month. No contracts, just results.
        </p>
        <Link
          to="/signup"
          className="inline-block rounded-full bg-secondary px-8 py-4 font-semibold text-white transition-all hover:bg-secondary/90"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
};