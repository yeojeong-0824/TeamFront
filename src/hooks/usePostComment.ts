import postComment from "@/api/postComment";
import { Comment } from "@/types/comment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const usePostComment = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (commentData: Comment)=> postComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', id] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    }
  });

  return mutation;
}

export default usePostComment;