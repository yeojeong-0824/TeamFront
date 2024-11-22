import axios from "axios";

export const searchPosts = async (keyword: string, currentPage: number, sortKeyword: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}boards?page=${currentPage}`, {
    params: {
      keyword,
      searchKeyword: 'content',
      sortKeyword
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};