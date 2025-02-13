import axios from "axios";

export default async function deleteImage(url: string) {
  const response = axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}boards/authed/images/${url}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
