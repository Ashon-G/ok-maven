import { TestimonialData } from "./types";

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative">
      <img 
        src={testimonial.img} 
        alt={testimonial.name} 
        className="w-full h-44 object-cover" 
      />
      <div className="bg-slate-900 text-slate-50 p-4">
        <span className="block font-semibold text-lg mb-1">{testimonial.name}</span>
        <span className="block mb-3 text-sm font-medium">{testimonial.title}</span>
        <span className="block text-sm text-slate-300">{testimonial.info}</span>
      </div>
      <span className="text-7xl absolute top-2 right-2 text-slate-700">"</span>
    </div>
  );
};