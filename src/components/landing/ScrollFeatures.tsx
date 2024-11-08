import { Store, DollarSign, Rocket, Sparkles } from "lucide-react";

const ScrollFeatures = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Feature
            Icon={Store}
            title="Student Talent"
            description="Connect with ambitious student developers and marketers"
          />
          <Feature
            Icon={DollarSign}
            title="Affordable Rates"
            description="Get quality work at student-friendly prices"
          />
          <Feature
            Icon={Rocket}
            title="Fast Development"
            description="Launch your projects faster than ever before"
          />
          <Feature
            Icon={Sparkles}
            title="Quality Work"
            description="Vetted students with proven skills and passion"
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ Icon, title, description }: {
  Icon: React.ComponentType<any>;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 p-3 rounded-lg">
        <Icon className="w-8 h-8 text-black" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ScrollFeatures;