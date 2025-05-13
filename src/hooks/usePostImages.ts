import postImages from "@/api/postImages";
import { useMutation } from "@tanstack/react-query";

export default function usePostImages() {
  return useMutation({
    mutationFn: postImages,
  });
}
