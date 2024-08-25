import axios from "axios";

const deleteScore = (boardId: number) => {
  const response = axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/board/score/authed/${boardId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response;
};

export default deleteScore;