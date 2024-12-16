import postPlanner from "@/api/calender/postPlanner";
import { useMutation } from "@tanstack/react-query";

interface PlannerData {
  title: string;
  subTitle: string;
  personnel: number;
}

export default function usePostPlanner() {
  return useMutation({
    mutationFn: (plannerData: PlannerData) => postPlanner(plannerData),
  });
}
