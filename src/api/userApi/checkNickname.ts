import axios from "axios";

const checkNickname = async (nickname: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}members/check/nickname/${nickname}`);
  return response.data;
};

export default checkNickname;

