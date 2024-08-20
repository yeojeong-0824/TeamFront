'use client';

import writePost from "@/api/writePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { CustomError } from "@/types/error";

const useWritePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const writeM = useMutation({
    mutationFn: (data: WriteUpdateType) => writePost(data),
    onError: (error: CustomError) => {
      if(error?.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '글 작성 실패',
          text: '로그인 후 이용해주세요',
        });
        router.push(`/login-ui`);
      }
      Swal.fire({
        icon: 'error',
        title: '글 작성 실패',
        text: '다시 시도해주세요',
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: 'success',
        title: '글 작성 성공',
        text: '글 작성이 완료되었습니다',
        showConfirmButton: false,
        timer: 1000
      });
      queryClient.invalidateQueries({queryKey: ['sortPosts']});
      router.back();
    }
  });

  return writeM;
};

export default useWritePost;