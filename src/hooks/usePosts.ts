'use client';

import postsCall from "@/api/postsCall";
import { useQuery } from "@tanstack/react-query";

const usePosts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: postsCall,
  });

  return { data, error, isLoading, isError };
};

export default usePosts;