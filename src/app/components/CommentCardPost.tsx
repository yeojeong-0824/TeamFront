'use client';

import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";
import formatDate from "@/util/formatDate";
import { CommentData, CommentPostProps } from "@/types/userTypes/comment";
import { Rate } from "antd";

const CommentCardPost = ({ comment }: CommentPostProps ): JSX.Element => {
  console.log(comment)
  const titleCut = () => {
    let title = comment?.board.title;
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
    <div className="p-3 border-b text-gray-900">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <p>{comment?.board?.member?.nickname}</p>
          <p>{formatDate(comment?.board?.time?.createTime)}</p>
        </div>
        <div className="flex items-center gap-3 font-semibold text-xs sm:text-sm">
          <p className="flex items-center">
            <FaRegCommentDots className="mr-1 text-md" />
            0
          </p>
          <p className="flex items-center text-xs sm:text-sm">
            <IoEyeOutline className="mr-1 text-medium sm:text-lg" />
            {comment?.board?.view}
          </p>
        </div>
      </div>
      <Link href={`/post/${comment?.board?.id}`} className="font-bold text-sm md:text-medium hover:text-blue-500">
        {titleCut()}
      </Link>
      <details className="mt-2">
        <summary>내가 작성한 댓글</summary>
        <div className="bg-gray-50 rounded-md">
        {
          comment?.commentList.map((data: CommentData, index: number) => (
            <div key={data?.id} className="mt-2 pt-6 pr-6 pl-6">
              {data?.score ? (
                <Rate
                  value={data?.score}
                  disabled
                  style={{
                    fontSize: "13px",
                  }}
                />
              ) : null}
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <p>{data?.member.nickname}</p>
                <p>{formatDate(data?.time.createTime)}</p>
              </div>
              <p className="mb-4">{data?.comment}</p>
              <hr/>
            </div>
        ))}
        </div>
      </details>
    </div>
  );
};

export default CommentCardPost;
