'use client'; 

import postCall from "@/api/postCall";
import { useQuery } from "@tanstack/react-query";

const usePost = (id: number) => {
  const { data, isLoading, isError, error, isSuccess } =  useQuery({
    queryKey: ['post', id],
    queryFn: () => postCall(id),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, error, isSuccess };
}

export default usePost;