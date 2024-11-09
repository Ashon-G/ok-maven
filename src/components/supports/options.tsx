import { MotionConfig, motion } from "framer-motion";
import { Testimonial } from "./testimonial/Testimonial";

export const OPTIONS = [
  {
    title: "Tech Startups",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Jeff"
        name="Alex K."
        title="Co-founder & CTO"
        company="TechFlow"
        content="Maven's talent pool helped us accelerate our development cycle by 40%. Their developers brought both technical expertise and startup mindset, making them perfect for our fast-paced environment."
      />
    ),
  },
  {
    title: "VC-Backed Startups",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Sarah"
        name="Sarah L."
        title="CEO"
        company="StyleBox (Series A)"
        content="As a VC-backed startup, we needed to scale quickly while maintaining quality. Maven's talent pool helped us expand our tech team efficiently, meeting our aggressive growth targets."
      />
    ),
  },
  {
    title: "Accelerators",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Mike"
        name="Mike R."
        title="Program Director"
        company="TechStars"
        content="Maven has become our go-to solution for our portfolio companies needing technical talent. Their pre-vetted developers help our startups move faster and validate their ideas quickly."
      />
    ),
  },
  {
    title: "Incubators",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Priya"
        name="Priya M."
        title="Innovation Director"
        company="StartupHub"
        content="Maven's platform has been invaluable for our incubator. Their talent pool helps our early-stage startups build MVPs quickly and cost-effectively, accelerating their path to market."
      />
    ),
  },
  {
    title: "Small Businesses",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=David"
        name="David W."
        title="CEO"
        company="GrowthTech"
        content="Maven made enterprise-level talent accessible for our growing business. Their flexible engagement model allowed us to scale our tech capabilities without breaking the bank."
      />
    ),
  }
];