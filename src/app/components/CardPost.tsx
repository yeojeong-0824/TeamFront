"use client";

import Link from "next/link";
import { CardPostProps } from "@/types/post";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";
import formatDate from "@/util/formatDate";
import Image from "next/image";
import blurImage from "@/util/blurImage";

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
  };

  return (
    <div className="p-1 border-b text-gray-900">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <p>{post?.member?.nickname}</p>
          <p>{formatDate(post?.time?.createTime)}</p>
        </div>

        <div className="flex items-center gap-3 font-semibold text-xs sm:text-sm">
          <p className="flex items-center">
            <FaRegCommentDots className="mr-1 text-md" />
            {!post.commentCount ? 0 : post.commentCount}
          </p>
          <p className="flex items-center text-xs sm:text-sm">
            <IoEyeOutline className="mr-1 text-medium sm:text-lg" />
            {post.view}
          </p>
        </div>
      </div>
      <div className="flex gap-3 mb-3">
        {post?.image && (
          <Link href={`/post/${post.id}`}>
            <Image
              alt="thumnail-image"
              src={
                `${process.env.NEXT_PUBLIC_API_URL}files/${post?.image}` as string
              }
              width={50}
              height={50}
              placeholder="blur"
              blurDataURL={blurImage}
              className="rounded-md"
              style={{ height: "50px" }}
            />
          </Link>
        )}
        <Link
          href={`/post/${post.id}`}
          className="font-bold text-sm md:text-medium hover:text-blue-500"
        >
          {titleCut()}
        </Link>
      </div>
    </div>
  );
};

export default CardPost;
