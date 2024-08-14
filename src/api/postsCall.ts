import axios from "axios";

const postsCall = async (currentPage: number) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}/board/list?page=${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default postsCall;
