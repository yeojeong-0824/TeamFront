import findusername from "@/api/userApi/findusername";
import { useMutation } from "@tanstack/react-query";

export default function useFindUsername() {
  return useMutation({
    mutationFn: (email: string) => findusername(email),
  });
};