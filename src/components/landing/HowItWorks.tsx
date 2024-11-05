export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share Your Vision",
      description: "Tell us about your product idea and what kind of student talent you need",
      image: "https://images.unsplash.com/photo-1642790595397-7047dc98fa72",
    },
    {
      number: "02",
      title: "Match with Students",
      description: "Get paired with skilled student developers and marketers who align with your goals",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c",
    },
    {
      number: "03",
      title: "Build Together",
      description: "Collaborate with your student team to bring your product vision to life",
      image: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1",
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-24">
      <div className="container">
        <h2 className="mb-16 text-center text-4xl font-bold">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-lg bg-white p-8 shadow-sm"
            >
              <span className="gradient-text absolute -top-6 right-4 text-6xl font-black opacity-10">
                {step.number}
              </span>
              <div className="mb-6 overflow-hidden rounded-lg">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-4 text-2xl font-semibold">{step.title}</h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};