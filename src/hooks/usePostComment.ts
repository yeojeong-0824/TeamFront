import postComment from "@/api/postComment";
import { Comment } from "@/types/comment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const usePostComment = (id: number) => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: (commentData: Comment)=> postComment(commentData),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '댓글이 등록되었습니다',
        showConfirmButton: false,
        timer: 1000
      });
      queryClient.invalidateQueries({ queryKey: ['comment', id] });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: '댓글 등록 실패',
        text: error.message
      });
    }
  });

  return response;
}

export default usePostComment;