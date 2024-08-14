import axios from "axios";

export const searchPosts = async (keyword: string, searchKeyword: string, currentPage: number) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board?page=${currentPage}`, {
    params: {
      keyword,
      searchKeyword,
      sortKeyword: ''
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};