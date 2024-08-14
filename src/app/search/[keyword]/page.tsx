'use client';

import { ParmasKeyword } from "@/types/search";
import { Post } from "@/types/post";
import useSearch from "@/hooks/useSearch";
import ControlBarMain from "@/app/components/ControlBarMain";
import { useState } from "react";
import CardPost from "@/app/components/CardPost";
import NavigationNumberMain from "@/app/components/NavigationNumberMain";
import Footer from "@/app/components/Footer";

const searchPage = ({ params }: { params: ParmasKeyword }) => {
  const keyword = decodeURIComponent(params.keyword);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useSearch(keyword, currentPage);

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
          <p className="text-red-500 text-2xl font-bold">
            게시글이 존재하지 않습니다.
          </p>
        </div>
      )
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 max-w-[800px] min-h-[1100px] mx-auto mt-10 relative p-2">
        <div className="flex flex-col gap-3 mt-10">
          <ControlBarMain />
          {renderNoPostsFound()}
          {data?.content.map((post: Post) => (
            <CardPost key={post.id} post={post} />
          ))}
          <NavigationNumberMain currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} searchMode={true} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default searchPage;