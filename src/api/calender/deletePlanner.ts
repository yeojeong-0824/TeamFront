import axios from "axios";

export default async function deletePlanner(plannerId: string) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}planners/authed/${plannerId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
}
