'use client';

import postsCall from "@/api/postsCall";
import { useQuery } from "@tanstack/react-query";

const usePosts = (currentPage: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn:()=> postsCall(currentPage),
    staleTime: 3600000, // 1 hour
    gcTime: 3600000,
  });

  return { data, error, isLoading, isError };
};

export default usePosts;