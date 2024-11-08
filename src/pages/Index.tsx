import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FoldingLogos } from "@/components/landing/FoldingLogos";
import { FiArrowUpRight } from "react-icons/fi";
import DoubleScrollingLogos from "@/components/landing/DoubleScrollingLogos";
import { Store, DollarSign, Rocket, Sparkles } from "lucide-react";

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

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

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

        {/* Features Section */}
        <section className="py-24 w-full bg-slate-50 mt-24">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                You Define the Project, <span className="gradient-text">We Handle the Rest</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Once your project goals are set, our team of experts takes over the design, management, and support, allowing you to focus on what you do best.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Store className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Student Talent</h3>
                <p className="text-muted-foreground">Connect with ambitious student developers and marketers</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <DollarSign className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Affordable Rates</h3>
                <p className="text-muted-foreground">Get quality work at student-friendly prices</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Rocket className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Development</h3>
                <p className="text-muted-foreground">Launch your projects faster than ever before</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Sparkles className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Work</h3>
                <p className="text-muted-foreground">Vetted students with proven skills and passion</p>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-secondary hover:bg-secondary/90" size="lg" asChild>
                <Link to="/signup">Get Started Now</Link>
              </Button>
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
