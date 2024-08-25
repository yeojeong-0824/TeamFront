'use client';

import setScore from "@/api/setScore";
import { useMutation } from "@tanstack/react-query";
import { CustomError } from "@/types/error";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useSetScore = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (score: number)=>setScore(score, id),
    onSuccess: () => {
      Swal.fire({
        title: '별점이 등록되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
      queryClient.invalidateQueries({queryKey: ['post', id]});
      queryClient.invalidateQueries({queryKey: ['sortPosts']});
    },
    onError: (error: CustomError) => {
      if(error?.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '로그인 필요',
          text: '로그인이 필요한 서비스입니다'
        });
        router.push('/login-ui');
      }
      if(error?.response.status === 409) {
        Swal.fire({
          title: '별점 등록에 실패했습니다.',
          text: '이미 별점을 등록하셨습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    }
  });

  return { mutate };
}

export default useSetScore;