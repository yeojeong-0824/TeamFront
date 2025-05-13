import getUserPlanners from "@/api/calender/getUserPlanners";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserPlanners() {
  return useQuery({
    queryKey: ["userPlanners"],
    queryFn: getUserPlanners,
  });
}
