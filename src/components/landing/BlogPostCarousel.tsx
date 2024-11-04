import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

type PostType = {
  id: number;
  imgUrl: string;
  author: string;
  title: string;
  description: string;
};

const posts: PostType[] = [
  {
    id: 1,
    imgUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    author: "John Anderson",
    title: "Building the Future of Tech Education",
    description: "How Maven is revolutionizing the way students learn and grow in tech.",
  },
  {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    author: "Kyle Parsons",
    title: "The Power of Student-Founder Collaboration",
    description: "Real stories of successful partnerships between students and startups.",
  },
  {
    id: 3,
    imgUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    author: "Andrea Bates",
    title: "From Student to Startup Success",
    description: "How Maven helped me transition from academia to entrepreneurship.",
  },
  {
    id: 4,
    imgUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    author: "Jess Drum",
    title: "The Maven Experience",
    description: "What it's like to work with student Mavens on your startup.",
  },
  {
    id: 5,
    imgUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    author: "Phil White",
    title: "Innovation Through Fresh Perspectives",
    description: "How student Mavens bring new ideas to established companies.",
  },
  {
    id: 6,
    imgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    author: "Karen Peabody",
    title: "The Future of Work",
    description: "Why the Maven model is the future of talent acquisition.",
  },
  {
    id: 7,
    imgUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    author: "Dante Gordon",
    title: "Tech Education Reimagined",
    description: "A new approach to learning and earning in tech.",
  },
];

const Post = ({ imgUrl, author, title, description }: PostType) => {
  return (
    <div
      className="relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
      }}
    >
      <img
        src={imgUrl}
        className="mb-3 h-[200px] w-full rounded-lg object-cover"
        alt={`Blog post about ${title}`}
      />
      <span className="rounded-md border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase text-neutral-500">
        {author}
      </span>
      <p className="mt-1.5 text-lg font-medium">{title}</p>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
};

export const BlogPostCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="bg-gray-50 py-24" ref={ref}>
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-4xl font-bold">
              Latest from the <span className="gradient-text">Blog</span>
            </h2>

            <div className="flex items-center gap-2">
              <button
                className={`rounded-lg border border-gray-200 bg-white p-1.5 text-2xl transition-all hover:border-secondary ${
                  CAN_SHIFT_LEFT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                <FiArrowLeft />
              </button>
              <button
                className={`rounded-lg border border-gray-200 bg-white p-1.5 text-2xl transition-all hover:border-secondary ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="flex"
          >
            {posts.map((post) => {
              return <Post key={post.id} {...post} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};