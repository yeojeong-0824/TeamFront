import axios from "axios";

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

export default async function postLocation(
  plannerId: string,
  locationData: LocationData
) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}planners/locations/authed/${plannerId}`,
    locationData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
}
