import updateComment from "@/api/updateComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateComment } from "@/types/comment";

const useUpdateComment = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (commentData: UpdateComment) => updateComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["refetchComments", id] });
    },
  });

  return mutation;
};

export default useUpdateComment;
