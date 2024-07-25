'use client';

import update_post from "@/api/update_post";
import { useMutation } from "@tanstack/react-query";
import { write_type } from "@/types/board";
import { useRouter } from "next/navigation";

const use_update_post = (id: number) => {
  const router = useRouter();

  const update_mutation = useMutation({
    mutationFn: (data: write_type) => update_post(data, id),
    onError: (error) => console.log(error),
    onSuccess: () => {
      router.push(`/`);
      console.log('글 수정완료');
    },
  });

  return update_mutation;
};

export default use_update_post;