'use client';

import updatePost from "@/api/updatePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const useUpdatePost = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateM = useMutation({
    mutationFn: (data: WriteUpdateType) => updatePost(data, id),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '글 수정 성공',
        text: '글 수정이 완료되었습니다',
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries({queryKey: ['sortPosts']});
      router.push(`/post/${id}`);
    },
  });

  return updateM;
};

export default useUpdatePost;