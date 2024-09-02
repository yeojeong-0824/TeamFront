'use strict';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { sortPosts } from "@/api/sortPosts";

const useSortPosts = (currentPage: number, sortKeyword: string) => {
  const validPage = Math.max(currentPage, 1);

  const sortPostsQuery = useQuery({
    queryKey: ["sortPosts", validPage, sortKeyword],
    queryFn: () => sortPosts(validPage, sortKeyword),
    staleTime: 1800000, // 30분 동안 캐싱
    gcTime: 1800000, // 30분 동안 캐싱
    placeholderData: keepPreviousData,
  });

  return sortPostsQuery;
}

export default useSortPosts;