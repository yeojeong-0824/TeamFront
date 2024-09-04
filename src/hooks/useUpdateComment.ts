import updateComment from "@/api/updateComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateComment } from "@/types/comment";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { CustomError } from "@/types/error";

const useUpdateComment = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (commentData: UpdateComment)=> updateComment(commentData),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '댓글 수정 성공',
        showConfirmButton: false,
        timer: 1000
      });
      queryClient.invalidateQueries({queryKey: ['comment', id]});
      queryClient.invalidateQueries({queryKey: ['post', id]});
    },
    onError: (error: CustomError) => {
      if(error?.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '로그인 필요',
          text: '로그인이 필요한 서비스입니다'
        });
        router.push(`/login-ui`);
        return;
      }
      Swal.fire({
        icon: 'error',
        title: '글 삭제 실패',
        text: error.message
      })
    }
  })

  return mutation;
};

export default useUpdateComment;