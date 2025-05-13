import postLocation from "@/api/calender/postLocation";
import { useMutation } from "@tanstack/react-query";

interface LocationData {
  unixTime: number;
  travelTime: number;
  transportation: string;
  transportationNote: string;
  place: string;
  address: string;
  phoneNumber: string;
  memo: string;
}

export default function usePostLocation(plannerId: string) {
  return useMutation({
    mutationFn: (locationData: LocationData) =>
      postLocation(plannerId, locationData),
  });
}
