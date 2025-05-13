import axios from "axios";

const refetchComments = async (boardId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}boards/commentsUpdate/${boardId}`
  );

  return response.data;
};

export default refetchComments;
