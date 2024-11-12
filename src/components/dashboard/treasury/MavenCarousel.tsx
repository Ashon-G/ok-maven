import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Profile } from "@/integrations/supabase/types/profile";
import { MavenCard } from "./MavenCard";

interface MavenCarouselProps {
  title: string;
  mavens: Profile[];
}

export const MavenCarousel = ({ title, mavens }: MavenCarouselProps) => {
  if (mavens.length === 0) return null;

  return (
    <div className="py-6">
      <h2 className="mb-6 text-xl font-semibold">{title}</h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {mavens.map((maven) => (
              <CarouselItem key={maven.id} className="pl-4 basis-auto">
                <MavenCard maven={maven} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </Carousel>
      </div>
    </div>
  );
};