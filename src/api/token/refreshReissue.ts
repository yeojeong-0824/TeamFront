import axios from "axios";

export default async function refreshReissue() {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}tokens/refresh`, {
    withCredentials: true,
  });
  return response;
};