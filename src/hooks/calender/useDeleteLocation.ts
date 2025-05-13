import deleteLocation from "@/api/calender/deleteLocation";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteLocation() {
  return useMutation({
    mutationFn: (id: number) => deleteLocation(id),
  });
}
