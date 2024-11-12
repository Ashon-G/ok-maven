import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MavenCard } from "./MavenCard";
import { Profile } from "@/integrations/supabase/types/profile";

interface MavenCarouselProps {
  title: string;
  mavens: Profile[];
}

export const MavenCarousel = ({ title, mavens }: MavenCarouselProps) => {
  if (mavens.length === 0) return null;

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {mavens.map((maven) => (
            <CarouselItem key={maven.id} className="basis-auto">
              <MavenCard maven={maven} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};