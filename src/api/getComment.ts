import axios from "axios";

const getComment = async (id: number) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/comment/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
    }
  });
  return response.data;
}

export default getComment;