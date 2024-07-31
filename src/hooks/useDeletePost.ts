'use client';

import deletePost from "@/api/deletePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const deletePostM = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onError: (error) => console.error(error),
    onSuccess: () => {
      console.log('글 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return deletePostM;
};

export default useDeletePost;