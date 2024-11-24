import axios from "axios";

const checkUsername = async (username: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}members/check/username/${username}`);
  return response.data;
};

export default checkUsername;