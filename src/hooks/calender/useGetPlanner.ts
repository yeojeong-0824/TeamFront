import getPlanner from "@/api/calender/getPlanner";
import { useQuery } from "@tanstack/react-query";

export default function useGetPlanner(plannerId: string) {
  return useQuery({
    queryKey: ["planner", plannerId],
    queryFn: () => getPlanner(plannerId),
  });
}
