import getUserInfo from "@/api/userApi/getUserInfo";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserInfo() {
  return useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });
}
