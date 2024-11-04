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
          Ready to <span className="gradient-text">Transform</span> Your Startup?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/60">
          Join hundreds of founders who are building faster and smarter with Maven.
          Start your journey today.
        </p>
        <div className="flex justify-center gap-4">
          <button className="rounded-full bg-secondary px-8 py-4 font-semibold text-secondary-foreground transition-all hover:bg-secondary/90">
            Schedule a Call
          </button>
          <button className="rounded-full border border-primary-foreground/20 px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};