import { accessCheck } from "@/api/token/accessCheck";
import { useQuery } from "@tanstack/react-query";

export default function useAccessCheck() {
  return useQuery({
    queryKey: ["accessCheck"],
    queryFn: accessCheck,
    staleTime: 3600000, // 1 hour
    gcTime: 3600000, // 1 hour
    retry: false,
  });
}
