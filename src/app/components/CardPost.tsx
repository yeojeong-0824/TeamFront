'use client';

import Link from "next/link";
import { CardPostProps } from "@/types/post";

const CardPost = ({ post, handleDelete }: CardPostProps): JSX.Element => {
  return (
    <div key={post.id} className="flex flex-col gap-3 w-full mx-auto border p-5 rounded-md shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-sm">{post.memberNickname}</p>
          {/* <p className="text-sm">시간</p> */}
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-sm">좋아요 {post.likeCount}</p>
          <p className="text-sm font-bold hover:text-red-500 cursor-pointer"
            onClick={() => handleDelete(post.id)}>삭제
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
  );
};

export default CardPost;