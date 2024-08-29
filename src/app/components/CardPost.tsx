'use client';

import Link from "next/link";
import { CardPostProps } from "@/types/post";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";

const CardPost = ({ post }: CardPostProps): JSX.Element => {
  const titleCut = () => {
    let title = post?.title;
    const maxLength = 50;
    if (title.length > maxLength) {
      let truncated = title.slice(0, maxLength);
      const lastSpace = truncated.lastIndexOf(" ");
      truncated = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
      title = `${truncated}...`;
    }
    return title;
  }

  return (
    <div className="border-b p-3 text-gray-900">

      <div className="flex justify-between mb-3">

        <div className="flex gap-3 items-center">
          <p className="text-sm">user1{post.memberNickname}</p>
          <p className="text-sm">7시간 전</p>
        </div>

        <div className="flex gap-3 items-center font-semibold">
          <p className="text-sm flex items-center">
            <FaRegCommentDots className="text-md mr-1" />
            0
          </p>
          <p className="text-sm flex items-center">
            <IoEyeOutline className="text-lg mr-1" />
            {post.view}
          </p>
        </div>

      </div>

      <Link href={`/post/${post.id}`} className="font-bold hover:text-blue-500">
        {titleCut()}
      </Link>

    </div>
  );
};

export default CardPost;