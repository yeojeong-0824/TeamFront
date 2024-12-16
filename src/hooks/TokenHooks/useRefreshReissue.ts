import refreshReissue from "@/api/token/refreshReissue";
import { useMutation } from "@tanstack/react-query";

export default function useRefreshReissue() {
  return useMutation({
    mutationFn: refreshReissue,
    retry: false,
  });
}
