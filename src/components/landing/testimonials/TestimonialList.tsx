import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialData } from "./types";

interface TestimonialListProps {
  list: TestimonialData[];
  reverse?: boolean;
  duration?: number;
}

export const TestimonialList = ({
  list,
  reverse = false,
  duration = 50,
}: TestimonialListProps) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </motion.div>
  );
};