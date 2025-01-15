import axios from "axios";

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

export default async function editLocation(
  plannerId: number,
  locationData: LocationInfo
) {
  const response = await axios.put(
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
