'use client';
import posts_call from "@/api/posts_call";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Link from "next/link";
import { Post } from "@/types/post";
import post_delete from "@/api/delete_post";

const Card_post = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: posts_call,
  });

  const delete_post = useMutation({
    mutationFn: (id: number) => post_delete(id),
    onError: (error) => console.log(error),
    onSuccess: () => {
      console.log('글 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  useEffect(() => {
    if (delete_post.isError) {
      console.log(delete_post.error + '글 삭제 실패');
    }
  }, [delete_post.isError]);

  if (isLoading || delete_post.isPending) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-blue-500 text-2xl font-bold">
        Loading...
      </p>
    </div>
    );
  if (isError) return <p>Error: {error.message}</p>;

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