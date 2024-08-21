'use strict';

import { useQuery } from "@tanstack/react-query";
import { sortPosts } from "@/api/sortPosts";

const useSortPosts = (currentPage: number, sortKeyword: string) => {
  const sortPostsQuery = useQuery({
    queryKey: ["sortPosts", currentPage, sortKeyword],
    queryFn: () => sortPosts(currentPage, sortKeyword),
    staleTime: 1800000, // 30분 동안 캐싱
    gcTime: 1800000, // 30분 동안 캐싱
    placeholderData: (previousData, previousQuery)=> previousData,
  });

  return sortPostsQuery;
}

export default useSortPosts;