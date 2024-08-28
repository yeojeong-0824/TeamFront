import axios from "axios";

const postsCall = async () => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}/board/list`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  console.log(response);
  return response.data;
};

export default postsCall;