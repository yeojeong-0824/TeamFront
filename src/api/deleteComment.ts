import axios from "axios";

const deleteComment = async (commentId: number) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/board/comment/authed/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );

  return response.data;
};

export default deleteComment;