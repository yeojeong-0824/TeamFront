'use client';
import Link from 'next/link';

const Board_main_post_card = ({ post_data }) => {
  const { user_name, post_id, time_ago, like_count, comment_count, title } = post_data;

  return (
    <div className="flex flex-col gap-3 w-full mx-auto border p-5 rounded-md shadow-sm">

      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="font-semibold">{user_name}</p>
          <p className="text-sm">{time_ago}</p>
        </div>

        <div className="flex gap-3 items-center">
          <p className="text-sm">좋아요 {like_count}</p>
          <p className="text-sm">댓글 {comment_count}</p>
        </div>
      </div>

      <Link href={`/post/${post_id}`}><h3 className="font-bold">{title}</h3></Link>

    </div>
  )
}

export default Board_main_post_card;