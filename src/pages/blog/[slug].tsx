import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { wisp } from "@/lib/wisp";
import { LoadingAnimation } from "@/components/ui/loading-animation";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      return wisp.getPost(slug);
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (!post?.post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Post not found</p>
      </div>
    );
  }

  const { title, publishedAt, createdAt, content, tags } = post.post;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="prose lg:prose-xl mx-auto px-4">
        <h1>{title}</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <div className="mt-10 text-sm text-gray-500">
          {tags.map((tag) => (
            <span key={tag.id} className="mr-2">
              #{tag.name}
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          {new Date(publishedAt || createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;