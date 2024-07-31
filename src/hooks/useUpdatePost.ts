'use client';

import updatePost from "@/api/updatePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";

const useUpdatePost = (id: number) => {
  const router = useRouter();

  const updateM = useMutation({
    mutationFn: (data: WriteUpdateType) => updatePost(data, id),
    onError: (error) => console.log(error),
    onSuccess: () => {
      router.push(`/`);
      console.log('글 수정완료');
    },
  });

  return updateM;
};

export default useUpdatePost;