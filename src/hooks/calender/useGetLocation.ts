import getLocation from "@/api/calender/getLocation";
import { useQuery } from "@tanstack/react-query";

export default function useGetLocation(
  locationId: number | null,
  enabled = true
) {
  return useQuery({
    queryKey: ["getLocation", locationId],
    queryFn: () => getLocation(locationId),
    enabled,
  });
}
