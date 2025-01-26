import postComment from "@/api/postComment";
import { Comment } from "@/types/comment";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const usePostComment = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (commentData: Comment) => postComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["refetchComments", id] });
    },
  });

  return mutation;
};

export default usePostComment;
