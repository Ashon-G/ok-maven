import { motion } from "framer-motion";
import { TestimonialList } from "./testimonials/TestimonialList";
import { testimonials } from "./testimonials/testimonialData";

export const Testimonials = () => {
  return (
    <div className="bg-slate-950 py-12">
      <div className="mb-8 px-4">
        <h3 className="text-slate-50 text-4xl font-semibold text-center">
          Testimonials
        </h3>
        <p className="text-center text-slate-300 text-sm mt-2 max-w-lg mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          consequatur reprehenderit.
        </p>
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-900 to-transparent" />

        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
        </div>
        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
        </div>

        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-900 to-transparent" />
      </div>
    </div>
  );
};