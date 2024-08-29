'use client';

import Link from "next/link";
import { CardPostProps } from "@/types/post";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";

const CardPost = ({ post }: CardPostProps): JSX.Element => {
  const titleCut = () => {
    let title = post?.title;
    const maxLength = 50;
    if(title.length > maxLength) {
      let truncated = title.slice(0, maxLength);
      const lastSpace = truncated.lastIndexOf(" ");
      truncated = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
      title = `${truncated}...`;
    }
    return title;
  }

  return (
    <div className="border-b-1.5 p-3 text-gray-900">
      <div className="flex justify-between mb-3">
        <div className="flex gap-3 items-center">
          <p className="text-sm">user1{post.memberNickname}</p>
          <p className="text-sm">7시간전</p>
        </div>
        <div className="flex gap-3 items-center font-semibold">
          <p className="text-sm">
            <FaRegCommentDots className="inline text-md mr-[1.5px] mb-[2px]"/>
              {/* {post.comment} */}0
          </p>
          <p className="text-sm">
            <IoEyeOutline className="inline text-lg mr-[1.5px] mb-[1.5px]" /> 
            {post.view}
          </p>
          {/* <p className="text-sm">별 2개(별 아이콘으로)</p> */}
        </div>
      </div>
      <Link href={`/post/${post.id}`} 
      className="font-bold hover:text-blue-500 inline">
        {titleCut()}
      </Link>
    </div>
  );
};

export default CardPost;