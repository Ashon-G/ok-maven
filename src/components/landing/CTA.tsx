export const CTA = () => {
  return (
    <section id="contact" className="bg-primary py-24 text-primary-foreground">
      <div className="container text-center">
        <h2 className="mb-6 text-4xl font-bold">
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