'use client';

import writePost from "@/api/writePost";
import { useMutation } from "@tanstack/react-query";
import { WriteUpdateType } from "@/types/board";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const useWritePost = (reset: ReturnType<typeof useForm>["reset"]) => {
  const router = useRouter();

  const writeM = useMutation({
    mutationFn: (data: WriteUpdateType) => writePost(data),
    onError: (error) => {
      reset(); // 이 부분 잘 작동되는지 테스트 필요
      console.log(`${error}: 글 작성실패`);
    },
    onSuccess: () => {
      router.push(`/`);
      console.log('글 작성완료');
    }
  });

  return writeM;
};

export default useWritePost;