import axios from "axios";

export default async function getUserInfo() {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}members/authed`, {
    withCredentials: true,
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  },
);
  return response.data;
};