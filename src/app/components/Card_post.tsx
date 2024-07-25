'use client';
import Link from "next/link";
import { Post } from "@/types/post";
import use_delete_post from "@/hooks/use_delete_post";
import use_posts from "@/hooks/use_posts";

const Card_post = () => {
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
    
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="flex flex-col gap-3 w-full mx-auto">
      {data.content.map((post: Post) => (
        <div key={post.id} className="flex flex-col gap-3 w-full mx-auto border p-5 rounded-md shadow-sm">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <p className="text-sm">{post.memberNickname}</p>
              {/* <p className="text-sm">시간</p> */}
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-sm">좋아요 {post.likeCount}</p>
              <p className="text-sm font-bold hover:text-red-500 cursor-pointer"
                onClick={() => delete_post.mutate(post.id)}>삭제
              </p>
              <Link className="text-sm font-bold hover:text-green-500 cursor-pointer"
              href={`/update/${post.id}`}>
                수정
              </Link>
            </div>
          </div>
          <Link href={`/post/${post.id}`} className="font-bold hover:text-blue-500 inline">
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Card_post;