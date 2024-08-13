'use client';
import CardPost from "./CardPost";
import { Post } from "@/types/post";
import usePosts from "@/hooks/usePosts";

const CardPosts = () => {
  const { data, isLoading, isError, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
        <p className="text-blue-500 text-2xl font-bold">
          Loading...
        </p>
      </div>
    );
  };

  if (isError) {
    return (
      <div className="flex justify-center mt-32">
        <p className="text-red-500 text-2xl font-bold">
          Error: {error?.message}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full mx-auto">
      {data?.content.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
    </div>
  );
}

export default CardPosts;