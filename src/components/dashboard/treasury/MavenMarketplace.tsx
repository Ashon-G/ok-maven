import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types/profile";
import { Input } from "@/components/ui/input";
import { Heart, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DUMMY_CATEGORIES = [
  { id: 1, title: "Logo Design", image: "https://picsum.photos/200" },
  { id: 2, title: "AI Artists", image: "https://picsum.photos/201" },
  { id: 3, title: "Logo Animation", image: "https://picsum.photos/202" },
];

const DUMMY_SERVICES = [
  {
    id: 1,
    title: "Add custom features to your React native apps",
    price: 50,
    rating: 4.8,
    reviews: 145,
    image: "https://picsum.photos/203",
    seller: {
      name: "James",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
  },
  {
    id: 2,
    title: "Make your React app blazing fast",
    price: 80,
    rating: 4.9,
    reviews: 89,
    image: "https://picsum.photos/204",
    seller: {
      name: "Sarah",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
  },
];

const ServiceCard = ({ service, size = "large" }: { service: any; size?: "small" | "large" }) => (
  <div className={cn("relative group", size === "large" ? "w-full" : "w-48 shrink-0")}>
    <div className="relative">
      <img
        src={service.image}
        alt={service.title}
        className={cn("w-full object-cover rounded-lg", size === "large" ? "h-40" : "h-32")}
      />
      <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart className="w-4 h-4" />
      </button>
    </div>
    <div className="mt-2 space-y-1">
      <div className="flex items-center gap-2">
        <img src={service.seller.avatar} alt={service.seller.name} className="w-6 h-6 rounded-full" />
        <span className="text-sm font-medium">{service.seller.name}</span>
      </div>
      <p className={cn("font-medium line-clamp-2", size === "large" ? "text-base" : "text-sm")}>
        {service.title}
      </p>
      <div className="flex items-center gap-1 text-sm">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span>{service.rating}</span>
        <span className="text-gray-500">({service.reviews})</span>
      </div>
      <p className="font-medium">From ${service.price}</p>
    </div>
  </div>
);

const CategoryCard = ({ category }: { category: any }) => (
  <div className="relative w-24 shrink-0">
    <img src={category.image} alt={category.title} className="w-24 h-24 object-cover rounded-lg" />
    <div className="absolute inset-0 bg-black/40 rounded-lg" />
    <p className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium text-center p-2">
      {category.title}
    </p>
  </div>
);

export const MavenMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: mavens } = useQuery({
    queryKey: ["mavens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "maven");

      if (error) throw error;
      return data as Profile[];
    },
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="sticky top-0 bg-background z-10 py-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Popular services</h2>
          <Button variant="link" className="text-sm">See All</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {DUMMY_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Explore beautiful work, picked for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {DUMMY_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recently viewed & more</h2>
          <Button variant="link" className="text-sm">See All</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {DUMMY_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} size="small" />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What sparks your interest?</h2>
        <div className="space-y-2">
          {["Create social media content", "Develop a brand identity", "Edit photos and images"].map((interest) => (
            <Button
              key={interest}
              variant="outline"
              className="w-full justify-between"
            >
              {interest}
              <span className="text-secondary">+ Add</span>
            </Button>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-secondary/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Share & get up to $100 off</h3>
          <p className="text-sm text-gray-600 mb-4">Give friends a 20$ discount up to $100 in Fiverr credits</p>
          <Button variant="outline" size="sm">
            Invite Friends +
          </Button>
        </div>
      </section>
    </div>
  );
};