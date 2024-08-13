'use client';
import CardPost from "./CardPost";
import { Post } from "@/types/post";
import useDeletePost from "@/hooks/useDeletePost";
import usePosts from "@/hooks/usePosts";

const CardPosts = () => {
  const deletePost = useDeletePost();
  const { data, isLoading, isError, error } = usePosts();

  if(isLoading || deletePost.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-2xl font-bold">
          Loading...
        </p>
      </div>
    );
  };
  
  const handleDelete = (id: number) => deletePost.mutate(id);

  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="flex flex-col gap-3 w-full mx-auto">
      {data?.content.map((post: Post) => (
        <CardPost key={post.id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default CardPosts;