'use client';

import write_post from "@/api/write_post";
import { useMutation } from "@tanstack/react-query";
import { write_type } from "@/types/board";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const use_write_post = (reset: ReturnType<typeof useForm>["reset"]) => {
  const router = useRouter();

  const write_mutation = useMutation({
    mutationFn: (data: write_type) => write_post(data),
    onError: (error) => {
      reset(); // 이 부분 잘 작동되는지 테스트 필요
      console.log(`${error}: 글 작성실패`);
    },
    onSuccess: () => {
      router.push(`/`);
      console.log('글 작성완료');
    }
  });

  return write_mutation;
};

export default use_write_post;