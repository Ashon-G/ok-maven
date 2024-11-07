import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FoldingLogos } from "@/components/landing/FoldingLogos";
import { FiArrowUpRight } from "react-icons/fi";
import DoubleScrollingLogos from "@/components/landing/DoubleScrollingLogos";
import { CheckCircle } from "lucide-react";

const TiltChipLink = () => {
  return (
    <div className="rounded-full bg-zinc-600">
      <a
        href="#"
        rel="nofollow"
        className="flex items-center rounded-full border border-zinc-900 bg-white p-0.5 text-xs"
      >
        <span className="rounded-full bg-[#FF6154] px-2 py-0.5 font-medium text-white">
          HEY!
        </span>
        <span className="mx-2">We're live on Product Hunt!</span>
        <FiArrowUpRight className="mr-2" />
      </a>
    </div>
  );
};

const features = [
  {
    title: "Student Talent",
    description: "Connect with ambitious student developers and marketers",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
  {
    title: "Affordable Rates",
    description: "Get quality work at student-friendly prices",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "Fast Development",
    description: "Launch your projects faster than ever before",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    title: "Quality Work",
    description: "Vetted students with proven skills and passion",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    title: "Flexible Payment Terms",
    description: "We offer Net 30-90 payment terms for businesses, making it easier to manage your cash flow",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/maven-logo.svg" alt="Maven Logo" className="h-6 w-6" />
          <span className="font-bold">Maven</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm hover:underline">Login</Link>
          <Button variant="ghost" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-center px-4 pt-24">
        <DoubleScrollingLogos />
        
        <div className="mt-12 max-w-2xl text-center">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">
            Use Maven To Build & Market{" "}
            <span className="gradient-text">Your Next Big Thing</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/signup">Start Building Today</Link>
            </Button>
            <TiltChipLink />
          </div>
        </div>

        <div className="relative mt-12 w-full max-w-xl">
          <img
            src="/images/screen.png"
            alt="Team Collaboration"
            className="w-full rounded-lg"
          />

          <Card className="absolute left-4 top-12 h-24 w-20 overflow-hidden bg-black/80 backdrop-blur-md md:h-32 md:w-24">
            <img
              src="/images/chat.svg"
              alt="Developer Profile"
              className="h-full w-full object-cover"
            />
          </Card>

          <Card className="absolute right-4 top-8 h-20 w-20 bg-white/80 backdrop-blur-md md:h-24 md:w-24">
            <img
              src="/images/board column.svg"
              alt="Project Stats"
              className="h-full w-full object-cover"
            />
          </Card>
        </div>

        <section className="w-full bg-white py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">
              Why Choose <span className="gradient-text">Maven</span>?
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex h-full flex-col rounded-lg border border-gray-200 p-6 transition-all hover:border-secondary"
                >
                  <div className="mb-4 h-48 overflow-hidden rounded-lg">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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

        <div className="my-12 w-full">
          <FoldingLogos />
        </div>

        <Button className="mb-12 bg-primary hover:bg-primary/90" asChild>
          <Link to="/signup">Get Started Now</Link>
        </Button>
      </main>
    </div>
  );
};

export default Index;
