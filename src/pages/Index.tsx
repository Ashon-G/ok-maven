import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-[100px] items-center justify-between bg-white/80 px-10 backdrop-blur-[40px]">
        <div className="flex items-center gap-2.5">
          <img
            src="/maven-logo.svg"
            alt="Maven Logo"
            className="h-9 w-9 rounded-xl"
          />
          <span className="text-2xl font-bold">Maven</span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#contact" className="text-lg font-bold hover:underline">
            Contact
          </a>
          <Link to="/login" className="text-lg font-bold hover:underline">
            Login
          </Link>
          <Button
            className="bg-black/3 hover:bg-black/5"
            variant="ghost"
            asChild
          >
            <Link to="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center gap-20 px-4 pt-[180px] pb-[120px]">
        <div className="flex max-w-[863px] flex-col gap-10">
          <h1 className="text-[80px] font-bold leading-[96px] tracking-tight">
           Use Maven To Build & Market{" "}
            <span className="gradient-text">Your Next Big Thing</span>
          </h1>

          <div className="flex items-center gap-4">
            <Button
              className="h-[63px] w-[225px] bg-[#1f1f1f] text-lg hover:bg-black"
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
            src="/images/screen.png"
            alt="Team Collaboration"
            className="h-auto w-full"
          />

          <div className="absolute right-7 top-5 h-12 w-[220px] overflow-hidden rounded-full backdrop-blur-[10px]">
            <div className="bg-black/20 h-full w-full" />
          </div>

          <div className="absolute left-5 top-5 h-12 w-12 overflow-hidden rounded-full backdrop-blur-[10px]">
            <div className="bg-black/20 h-full w-full" />
          </div>

          <Card className="absolute left-8 top-[130px] h-[425px] w-[288px] overflow-hidden bg-[rgba(51,51,51,0.8)] backdrop-blur-[40px]">
            <img
              src="/images/tasks.avif"
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
                <div className="h-20 w-20 flex items-center justify-center text-4xl">
                  {feature.icon}
                </div>
                <h3 className="text-center text-2xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-center text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Button
          className="h-[63px] w-[225px] bg-[#1f1f1f] text-lg hover:bg-black"
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
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
      <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
    </svg>,
  },
  {
    title: "Affordable Rates",
    description: "Get quality work at student-friendly prices",
    icon: "💰",
  },
  {
    title: "Fast Development",
    description: "Launch your projects faster than ever before",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
      <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
    </svg>,
  },
  {
    title: "Quality Work",
    description: "Vetted students with proven skills and passion",
    icon: "✨",
  },
];

export default Index;