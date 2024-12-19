import axios from "axios";

export default async function getLocation(locationId: number | null) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}planners/locations/authed/${locationId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
}
