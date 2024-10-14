import { findPassword } from "@/api/userApi/findPassword";
import { useMutation } from "@tanstack/react-query";

type FindPassword = {
  username: string;
  email: string;
};

export default function useFindPassword() {
  return useMutation({
    mutationFn: (findPasswordData: FindPassword)=>findPassword(findPasswordData),
  })
};