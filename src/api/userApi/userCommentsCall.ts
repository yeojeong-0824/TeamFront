import axios from "axios";

const userCommentsCall = async (currentPage: number) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}members/authed/comments?page=${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });

  return response.data;
};

export default userCommentsCall;