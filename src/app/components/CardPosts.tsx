'use client';

import CardPost from "./CardPost";
import { Post } from "@/types/post";
import NavigationNumberMain from "./NavigationNumberMain";
import { useEffect, useState } from "react";
import ControlBarMain from "./ControlBarMain";
import useSortPosts from "@/hooks/useSortPosts";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./Loading";
import ErrorShow from "./Error";

import { useRouter, useSearchParams } from "next/navigation";

const CardPosts = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams(); 

  const initialPage = parseInt(searchParams.get('page') || '1', 10); 
  const initialSortOption = searchParams.get('sort') || 'latest';

  const [currentPage, setCurrentPage] = useState<number>(initialPage); 
  const [sortOption, setSortOption] = useState<string>(initialSortOption); 

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError, error } = useSortPosts(currentPage, sortOption);
  const totalPages = data?.totalPages;

  useEffect(() => {
    router.push(`?page=${currentPage}&sort=${sortOption}`);
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage, sortOption] });
  }, [currentPage, sortOption, queryClient, router]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage, sortOption] });
  }, [currentPage, sortOption, queryClient]);

  const renderNoPostsFound = () => {
    if (data?.content.length === 0) {
      return (
        <div className="flex justify-center mt-32">
          <p className="text-red-500 text-2xl font-bold">
            게시글이 존재하지 않습니다.
          </p>
        </div>
      )
    };
  };

  return (
    <div className="flex flex-col gap-3 mt-10">
      <ControlBarMain sortOption={sortOption}
        setSortOption={setSortOption}
        setCurrentPage={setCurrentPage} />
      {renderNoPostsFound()}
      {isLoading || isFetching ? <LoadingSpinner size={15} mt={40} /> : null}
      {isError && <ErrorShow error={error?.message}/>}
      {data?.content.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
      <NavigationNumberMain currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} />
    </div>
  );
}

export default CardPosts;