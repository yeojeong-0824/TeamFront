import getComment from "@/api/getComment";
import { useQuery } from "@tanstack/react-query";

const useGetComment = (postId: number) => {
  const response =  useQuery({
    queryKey: ['comment', postId],
    queryFn: () => getComment(postId),
  });

  return response;
};

export default useGetComment;