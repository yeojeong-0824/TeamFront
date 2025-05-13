import removeRefreshToken from "@/api/token/removeRefreshToken";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveRefreshToken() {
  return useMutation({
    mutationFn: removeRefreshToken,
  });
}
