import axios from "axios";

export default async function removeRefreshToken() {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}tokens/refresh`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
