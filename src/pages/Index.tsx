import {
  Button,
  Card,
  ScrollArea,
} from "@/components/ui";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-[100px] items-center justify-between bg-white/80 px-10 backdrop-blur-[40px]">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl font-bold">Maven<span className="text-secondary">.</span></span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#contact" className="text-lg font-bold hover:underline">
            Contact
          </a>
          <Link to="/login" className="text-lg font-bold hover:underline">
            Login
          </Link>
          <Button
            className="bg-secondary hover:bg-secondary/90 text-white"
            asChild
          >
            <Link to="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center gap-20 px-4 pt-[180px] pb-[120px]">
        <div className="flex max-w-[863px] flex-col gap-10 text-center">
          <h1 className="text-[72px] font-bold leading-[1.1] tracking-tight">
            Connect with Student Talent to{" "}
            <span className="gradient-text">Build Your Next Big Thing</span>
          </h1>

          <div className="flex items-center justify-center gap-4">
            <Button
              className="h-[63px] w-[225px] bg-secondary hover:bg-secondary/90 text-lg"
              asChild
            >
              <Link to="/signup">
                Start Building Today
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-[1079px] overflow-hidden rounded-[42px]">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Team Collaboration"
            className="h-auto w-full"
          />

          <Card className="absolute left-8 top-[130px] h-[425px] w-[288px] overflow-hidden bg-white/80 backdrop-blur-[40px]">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12"
              alt="Developer Profile"
              className="h-full w-full object-cover"
            />
          </Card>

          <Card className="absolute right-[-36px] top-[77px] h-[282px] w-[280px] overflow-hidden bg-white/80 backdrop-blur-[50px]">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
              alt="Project Stats"
              className="h-full w-full object-cover"
            />
          </Card>
        </div>

        <ScrollArea className="w-full max-w-[863px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 flex items-center justify-center text-4xl text-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-center text-2xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-center text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Button
          className="h-[63px] w-[225px] bg-secondary hover:bg-secondary/90 text-lg"
          asChild
        >
          <Link to="/signup">
            Get Started Now
          </Link>
        </Button>

        <Footer />
      </main>
    </div>
  );
};

const features = [
  {
    title: "Student Talent",
    description: "Connect with ambitious student developers and marketers",
    icon: "👩‍💻",
  },
  {
    title: "Affordable Rates",
    description: "Get quality work at student-friendly prices",
    icon: "💰",
  },
  {
    title: "Fast Development",
    description: "Launch your projects faster than ever before",
    icon: "🚀",
  },
  {
    title: "Quality Work",
    description: "Vetted students with proven skills and passion",
    icon: "✨",
  },
];

export default Index;