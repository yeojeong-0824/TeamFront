import axios from "axios";

export default async function deleteLocation(id: number) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}planners/locations/authed/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
}
