import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { wisp } from "@/lib/wisp";
import { useQuery } from "@tanstack/react-query";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

export const BlogPostCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const { data: blogData } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => wisp.getPosts({ limit: 7 }),
  });

  const posts = blogData?.posts || [];

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
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
            {posts.map((post) => (
              <Post
                key={post.id}
                imgUrl={post.image || "https://placehold.co/600x400"}
                author={post.author?.name || "Maven Team"}
                title={post.title}
                description={post.description || ""}
                slug={post.slug}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type PostType = {
  imgUrl: string;
  author: string;
  title: string;
  description: string;
  slug: string;
};

const Post = ({ imgUrl, author, title, description, slug }: PostType) => {
  return (
    <a
      href={`/blog/${slug}`}
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
    </a>
  );
};