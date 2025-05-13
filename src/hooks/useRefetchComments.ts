import refetchComments from "@/api/refetchComments";
import { useQuery } from "@tanstack/react-query";

export default function useRefetchComments(boardId: string) {
  return useQuery({
    queryKey: ["refetchComments", boardId],
    queryFn: () => refetchComments(boardId),
    retry: false,
  });
}
