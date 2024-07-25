'use client';

import posts_call from "@/api/posts_call";
import { useQuery } from "@tanstack/react-query";

const use_posts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: posts_call,
  });

  return { data, error, isLoading, isError };
};

export default use_posts;