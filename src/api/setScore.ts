import axios from "axios";

const postSetScore = (score: number, boardId: number) => {
  const response = axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/score/authed/${boardId}`,
    { score },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response;
};

export default postSetScore;