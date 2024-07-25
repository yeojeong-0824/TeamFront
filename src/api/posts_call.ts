import axios from "axios";

const posts_call = async () => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}board/list`);
  console.log(response);
  return response.data;
};

export default posts_call;