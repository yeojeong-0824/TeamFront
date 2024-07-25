'use client'; 

import post_call from "@/api/post_call";
import { useQuery } from "@tanstack/react-query";

const use_post = (id: number) => {
  const { data, isLoading, isError, error, isSuccess } =  useQuery({
    queryKey: ['post', id],
    queryFn: () => post_call(id),
  });

  return { data, isLoading, isError, error, isSuccess };
}

export default use_post;