import login from "@/api/userApi/login";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  return useMutation({
    mutationFn: (loginData: {username: string, password: string})=> login(loginData),
  });
}