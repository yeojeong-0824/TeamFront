'use strict';

import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "@/api/searchPosts";

const useSearch = (keyword: string, currentPage: number, sortKeyword: string) => {
  const searchQuery = useQuery({
    queryKey: ["searchPosts", keyword, currentPage, sortKeyword],
    queryFn: () => searchPosts(keyword, currentPage, sortKeyword),
  });

  return searchQuery;
}

export default useSearch;