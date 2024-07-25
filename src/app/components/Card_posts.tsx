'use client';
import Card_post from "./Card_post";
import { Post } from "@/types/post";
import use_delete_post from "@/hooks/use_delete_post";
import use_posts from "@/hooks/use_posts";

const Card_posts = () => {
  const delete_post = use_delete_post();
  const { data, isLoading, isError, error } = use_posts();

  if(isLoading || delete_post.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-2xl font-bold">
          Loading...
        </p>
      </div>
    );
  };
  
  const handle_delete = (id: number) => delete_post.mutate(id);

  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="flex flex-col gap-3 w-full mx-auto">
      {data.content.map((post: Post) => (
        <Card_post key={post.id} post={post} handle_delete={handle_delete} />
      ))}
    </div>
  );
}

export default Card_posts;