import deleteImage from "@/api/deleteImage";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteImage() {
  return useMutation({
    mutationFn: (url: string) => deleteImage(url),
  });
}
