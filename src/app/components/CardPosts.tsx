'use client';
import CardPost from "./CardPost";
import { Post } from "@/types/post";
import usePosts from "@/hooks/usePosts";
import NavigationNumberMain from "./NavigationNumberMain";
import { useState } from "react";
import ControlBarMain from "./ControlBarMain";

const CardPosts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error } = usePosts(currentPage);

  const totalPages = data?.totalPages;

  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
        <p className="text-blue-500 text-2xl font-bold">
          Loading...
        </p>
      </div>
    );
  };

  if (isError) {
    return (
      <div className="flex justify-center mt-32">
        <p className="text-red-500 text-2xl font-bold">
          Error: {error?.message}
        </p>
      </div>
    );
  };

  const renderNoPostsFound = () => {
    if (data?.content.length === 0) {
      return (
        <div className="flex justify-center mt-32">
          <p className="text-blue-500 text-2xl font-bold">
            게시글이 존재하지 않습니다.
          </p>
        </div>
      )
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-10">
      <ControlBarMain />
      {renderNoPostsFound()}
      {data?.content.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
        <NavigationNumberMain currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} searchMode={false} />
    </div>
  );
}

export default CardPosts;
