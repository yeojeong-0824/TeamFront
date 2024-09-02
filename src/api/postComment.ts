import axios from "axios";
import { Comment } from "@/types/comment";

const postComment = async (commentData: Comment) => {
  const {id, score, comment} = commentData;

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/board/comment/authed/${id}`, {
    score,
    comment
  },{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });  
}

export default postComment;