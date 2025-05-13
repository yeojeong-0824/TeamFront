import editLocation from "@/api/calender/editLocation";
import { useMutation } from "@tanstack/react-query";

interface LocationInfo {
  id?: number;
  travelTime: number;
  place: string;
  address: string;
  memo: string;
  transportation: string;
  transportationNote: string;
  phoneNumber: string;
}

export default function useEditLocation(plannerId: number) {
  return useMutation({
    mutationFn: (locationData: LocationInfo) =>
      editLocation(plannerId, locationData),
  });
}
