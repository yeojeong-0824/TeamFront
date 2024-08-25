import axios from "axios";

export const sortPosts = async (currentPage: number, sortKeyword: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board?page=${currentPage}`, {
    params: {
      keyword: '',
      searchKeyword: '',
      sortKeyword,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};