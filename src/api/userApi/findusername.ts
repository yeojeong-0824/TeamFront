import axios from "axios";

export default async function findusername(email: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}members/findMember/usernames/${email}`);
  return response.data;
};