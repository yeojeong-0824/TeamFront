'use client';

import userCommentsCall from "@/api/userApi/userCommentsCall";
import { useQuery } from "@tanstack/react-query";

const useUserCommentsCall = (currentPage: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["userCommentwsCall"],
    queryFn: () => userCommentsCall(currentPage),
  });

  return { data, error, isLoading, isError };
};

export default useUserCommentsCall;