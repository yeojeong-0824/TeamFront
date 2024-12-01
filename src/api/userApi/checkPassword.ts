import axios from "axios";

type CheckPassword = {
  password: string;
};

export const checkPassword = async (password: CheckPassword) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}members/authed/checkPassword`, password);
  return response.data;
};

