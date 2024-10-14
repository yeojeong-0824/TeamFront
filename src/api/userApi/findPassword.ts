import axios from "axios";

type FindPassword = {
  username: string;
  email: string;
};

export const findPassword = async (findPasswordData: FindPassword) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}members/findMember/passwords`, findPasswordData);
  return response.data;
};