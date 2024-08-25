import axios from "axios";

export const searchPosts = async (keyword: string, currentPage: number, sortKeyword: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board?page=${currentPage}`, {
    params: {
      keyword,
      searchKeyword: 'title',
      sortKeyword
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};