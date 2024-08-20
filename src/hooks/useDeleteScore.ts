import deleteScore from "@/api/deleteScore";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { CustomError } from "@/types/error";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteScore = (id:number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteScore(id),
    onSuccess: () => {
      Swal.fire({
        title: '별점이 삭제되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
      queryClient.invalidateQueries({queryKey: ['post', id]});
      queryClient.invalidateQueries({queryKey: ['sortPosts']});
    },
    onError: (error: CustomError) => {
      if(error?.response.status === 403) {
        Swal.fire({
          title: '별점 삭제에 실패했습니다.',
          text: '로그인 후 이용해주세요',
          icon: 'error',
          confirmButtonText: '확인',
        });
        router.push('/login-ui');
      }
    }
  });

  return { mutate };
};

export default useDeleteScore;