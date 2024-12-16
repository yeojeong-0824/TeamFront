import postLocation from "@/api/calender/postLocation";
import { useMutation } from "@tanstack/react-query";

interface LocationData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
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
