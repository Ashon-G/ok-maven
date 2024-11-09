import { MotionConfig, motion } from "framer-motion";
import { Testimonial } from "./testimonial/Testimonial";

export const OPTIONS = [
  {
    title: "SaaS Startups",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Jeff"
        name="Alex K."
        title="Founder"
        company="TechFlow"
        content="Working with student developers through Maven has been incredible. They brought fresh perspectives and the latest tech skills to our project. We launched our MVP 40% faster than expected."
      />
    ),
  },
  {
    title: "E-commerce",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Sarah"
        name="Sarah L."
        title="CEO"
        company="StyleBox"
        content="The student marketing team we found through Maven transformed our social media presence. Their understanding of trends and target audience helped us increase engagement by 300%."
      />
    ),
  },
  {
    title: "Mobile Apps",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Mike"
        name="Mike R."
        title="Co-founder"
        company="FitTrack"
        content="Maven's student developers were instrumental in building our mobile app. Their knowledge of React Native and modern development practices exceeded our expectations."
      />
    ),
  },
  {
    title: "AI Startups",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=Priya"
        name="Priya M."
        title="CTO"
        company="AIFlow"
        content="The student talent we found through Maven had an impressive grasp of AI/ML concepts. They helped us implement key features while keeping development costs manageable."
      />
    ),
  },
  {
    title: "Marketplaces",
    Content: () => (
      <Testimonial
        imgSrc="https://api.dicebear.com/8.x/notionists/svg?seed=David"
        name="David W."
        title="Founder"
        company="LocalMarket"
        content="Maven's student marketers understood exactly how to reach our Gen-Z audience. Their creative campaigns and growth strategies helped us double our user base in 3 months."
      />
    ),
  }
];