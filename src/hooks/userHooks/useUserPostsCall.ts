'use client';

import userPostsCall from "@/api/userApi/userPostsCall";
import { useQuery } from "@tanstack/react-query";

const useUserPostsCall = (currentPage: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["userPostsCall"],
    queryFn: () => userPostsCall(currentPage),
  });

  return { data, error, isLoading, isError };
};

export default useUserPostsCall;