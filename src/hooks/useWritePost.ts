'use client';

import writePost from "@/api/writePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const useWritePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const writeM = useMutation({
    mutationFn: (data: WriteUpdateType) => writePost(data),
    onSuccess: () => {
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