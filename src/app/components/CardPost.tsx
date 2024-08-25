'use client';

import Link from "next/link";
import { CardPostProps } from "@/types/post";

const CardPost = ({ post }: CardPostProps): JSX.Element => {

  return (
    <div className="border p-3 rounded-md">
      <div className="flex justify-between mb-3">
        <div className="flex gap-3 items-center">
          <p className="text-sm">{post.memberNickname}</p>
          {/* <p className="text-sm">시간</p> */}
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-sm">좋아요 {post.likeCount}</p>
          <p className="text-sm">조회수 {post.view}</p> {/* 조회수가 0으로 반환됨 */}
        </div>
      </div>
      <Link href={`/post/${post.id}`} className="font-bold hover:text-blue-500 inline">
        {post.title}
      </Link>
    </div>
  );
};

export default CardPost;