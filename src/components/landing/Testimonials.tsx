export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Maven helped us launch our MVP in half the time we expected. The expertise and dedication were incredible.",
      author: "Sarah Chen",
      role: "Founder, TechStart",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
    },
    {
      quote: "Working with our Maven was like having a co-founder. They understood our vision and helped us execute flawlessly.",
      author: "Michael Rodriguez",
      role: "CEO, CloudFlow",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section className="bg-primary py-24 text-white">
      <div className="container">
        <h2 className="mb-16 text-center text-4xl font-bold">
          Trusted by <span className="gradient-text">Founders</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-lg bg-white/5 p-8 backdrop-blur-sm"
            >
              <p className="mb-6 text-lg italic text-white/80">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};