import deleteComment from "@/api/deleteComment";
import { CustomError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const useDelteMutation = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (commetId:number)=> deleteComment(commetId),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '삭제 완료',
        text: '댓글이 삭제되었습니다',
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
  });

  return mutation;
};

export default useDelteMutation;