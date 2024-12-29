"use client";

import updatePost from "@/api/updatePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const useUpdatePost = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateM = useMutation({
    mutationFn: (data: WriteUpdateType) => updatePost(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sortPosts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id.toString()] });
      router.push(`/post/${id}`);
    },
  });

  return updateM;
};

export default useUpdatePost;
