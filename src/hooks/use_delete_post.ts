'use client';

import post_delete from "@/api/delete_post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const use_delete_post = () => {
  const queryClient = useQueryClient();

  const delete_post = useMutation({
    mutationFn: (id: number) => post_delete(id),
    onError: (error) => console.log(error),
    onSuccess: () => {
      console.log('글 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return delete_post;
};

export default use_delete_post;