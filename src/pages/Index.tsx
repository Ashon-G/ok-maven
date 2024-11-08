import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FoldingLogos } from "@/components/landing/FoldingLogos";
import { FiArrowUpRight } from "react-icons/fi";
import DoubleScrollingLogos from "@/components/landing/DoubleScrollingLogos";

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

        {/* New Content Section */}
        <section className="py-24 w-full bg-slate-50 mt-24">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                You Define the Project, <span className="gradient-text">We Handle the Rest</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Once your project goals are set, our team of experts takes over the design, management, and support, allowing you to focus on what you do best. Enjoy the exciting parts like guest lectures and engaging with mavens, while we curate the best results for you.
              </p>
              <p className="text-lg text-muted-foreground">
                Our programs are fully customizable to fit your needs—just let us know what you want, and we'll take care of the details!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="Dedicated Program Manager"
                description="An experienced manager oversees the entire project, provides maven support, and handles all administrative tasks—so you don't have to."
              />
              <FeatureCard
                title="Scale Effortlessly"
                description="Engage hundreds of mavens in a fraction of the time it takes to manage a single intern."
              />
              <FeatureCard
                title="Tailored Maven Selection"
                description="Our dedicated recruiting team finds and selects the perfect mavens based on your team's specific needs."
              />
              <FeatureCard
                title="Comprehensive Support"
                description="Mavens receive thorough training, mentorship, and ongoing support from teaching assistants."
              />
              <FeatureCard
                title="Curated Results"
                description="We sift through the work to present you with the best outputs, tailored to your project's goals."
              />
              <FeatureCard
                title="Real-Time Progress Tracking"
                description="A centralized hub gives you full visibility into project progress and maven performance, with actionable insights and data at your fingertips."
              />
            </div>

            <div className="text-center mt-12">
              <p className="text-xl font-medium text-muted-foreground mb-8">
                Let us manage the logistics so you can enjoy the impact.
              </p>
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