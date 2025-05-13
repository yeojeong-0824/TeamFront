import axios from "axios";

const getComment = async (id: string, page: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}boards/comments/${id}?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export default getComment;
