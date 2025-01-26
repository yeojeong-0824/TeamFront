import getComment from "@/api/getComment";
import { useQuery } from "@tanstack/react-query";

const useGetComment = (postId: string, page: number) => {
  const response = useQuery({
    queryKey: ["comment", postId, page],
    queryFn: () => getComment(postId, page),
  });

  return response;
};

export default useGetComment;
