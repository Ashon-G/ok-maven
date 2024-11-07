import { CheckCircle } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Student Talent Pool",
      description: "Access pre-vetted, ambitious students from top universities with fresh perspectives and cutting-edge skills",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    },
    {
      title: "Affordable Rates",
      description: "Get high-quality development and marketing work at student-friendly prices that work for your startup budget",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Flexible Payment Terms",
      description: "We offer Net 30-90 payment terms for businesses, making it easier to manage your cash flow while scaling your startup",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    },
    {
      title: "Full-Stack Support",
      description: "From product development to growth marketing, our student Mavens cover all aspects of building and launching",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      title: "Quick Execution",
      description: "Students bring energy and dedication to ship features fast, helping you validate and iterate quickly",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Why Choose <span className="gradient-text">Maven</span>?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-secondary"
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CheckCircle className="mb-4 h-8 w-8 text-secondary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};