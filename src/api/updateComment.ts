import axios from "axios";
import { UpdateComment } from "@/types/comment";

const updateComment = async (commentData: UpdateComment) => {
  const { commentId, score, comment } = commentData;

  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}board/comment/authed${commentId}`, { 
    score, comment
   }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });

  return response.data;
};

export default updateComment;