import filterPlanner from "@/api/filterPlanner";
import { useQuery } from "@tanstack/react-query";

const useFilterPlanner = (start: number, end: number) => {
  return useQuery({
    queryKey: ["filterPlanner", start, end],
    queryFn: () => filterPlanner(start, end),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export default useFilterPlanner;
