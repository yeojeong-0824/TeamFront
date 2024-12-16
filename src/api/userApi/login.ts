import axios from "axios";

export default async function login(loginData: {
  username: string;
  password: string;
}) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}login`,
    loginData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response;
}
