'use strict';

import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "@/api/searchPosts";

const useSearch = (keyword: string, currentPage: number) => {
  const searchQuery = useQuery({
    queryKey: ["searchPosts", keyword, currentPage],
    queryFn: () => searchPosts(keyword, "title", currentPage) as Promise<any>,
  });

  return searchQuery;
}

export default useSearch;