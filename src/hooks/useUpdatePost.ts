'use client';

import updatePost from "@/api/updatePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { CustomError } from "@/types/error";

const useUpdatePost = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateM = useMutation({
    mutationFn: (data: WriteUpdateType) => updatePost(data, id),
    onError: (error: CustomError) => {
      if(error?.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '글 수정 실패',
          text: '로그인 후 이용해주세요',
        });
        router.push(`/login-ui`);
      }
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '글 수정 성공',
        text: '글 수정이 완료되었습니다',
      });
      queryClient.invalidateQueries({queryKey: ['posts']});
      queryClient.invalidateQueries({queryKey: ['post', id]});
      router.push(`/post/${id}`);
    },
  });

  return updateM;
};

export default useUpdatePost;