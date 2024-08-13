'use client';

import deletePost from "@/api/deletePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { CustomError } from "@/types/error";
import { useRouter } from "next/navigation";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deletePostM = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onError: (error: CustomError) => {
      if(error?.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '글 수정 실패',
          text: '로그인 후 이용해주세요',
        });
        return;
      }
      Swal.fire({
        icon: 'error',
        title: '글 삭제 실패',
        text: error.message
      })
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '글 삭제 성공',
        text: '글 삭제가 완료되었습니다',
        showConfirmButton: false,
        timer: 1000
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
  });

  return deletePostM;
};

export default useDeletePost;