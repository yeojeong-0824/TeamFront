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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sortPosts"] });
      router.back();
    },
  });

  return deletePostM;
};

export default useDeletePost;