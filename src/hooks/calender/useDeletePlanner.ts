import deletePlanner from "@/api/calender/deletePlanner";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePlanner() {
  return useMutation({
    mutationFn: (plannerId: string) => deletePlanner(plannerId),
  });
}
