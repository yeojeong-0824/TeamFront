'use strict';

import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "@/api/searchPosts";

const useSearch = (keyword: string, currentPage: number, sortKeyword: string) => {
  const validPage = Math.max(currentPage, 1);

  const searchQuery = useQuery({
    queryKey: ["searchPosts", keyword, validPage, sortKeyword],
    queryFn: () => searchPosts(keyword, validPage, sortKeyword),
    placeholderData: (previousData, previousQuery)=> previousData,
  });

  return searchQuery;
}

export default useSearch;